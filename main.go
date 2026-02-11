package main

import (
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"
)

type RateLimiter struct {
	limits map[string]*struct {
		count int
		start time.Time
	}
	mu     sync.Mutex
	limit  int
	window time.Duration
}

func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	return &RateLimiter{
		limits: make(map[string]struct{ count int; start time.Time }),
		limit:  limit,
		window: window,
	}
}

func (rl *RateLimiter) Allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	entry, exists := rl.limits[ip]

	if !exists {
		rl.limits[ip] = struct{ count int; start time.Time }{
			count: 1,
			start: now,
		}
		return true
	}

	if now.Sub(entry.start) > rl.window {
		// Reset the count
		rl.limits[ip] = struct{ count int; start time.Time }{
			count: 1,
			start: now,
		}
		return true
	}

	if entry.count < rl.limit {
		rl.limits[ip].count++
		return true
	}

	return false
}

func rateLimitMiddleware(rl *RateLimiter) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := strings.Split(r.RemoteAddr, ":")[0]
			if !rl.Allow(ip) {
				http.Error(w, "Too many requests", http.StatusTooManyRequests)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func main() {
	rl := NewRateLimiter(5, 10*time.Second)

	http.Handle("/", rateLimitMiddleware(rl)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, world!")
	})))

	fmt.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}