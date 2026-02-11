package internal

import (
	"context"
	"net/http"
	"time"
)

// Timeout middleware
func Timeout(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Create context with timeout
		ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
		defer cancel()

		// Create new request with context
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}