package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// Middleware function for logging
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		log.Printf("%s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
		log.Printf("Completed in %v", time.Since(start))
	})n
}

// Handler for root endpoint
func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Go Web Server!")
}

// Handler for JSON response
func jsonHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"message\":\"This is a JSON response\"}")
}

// Handler for error testing
func errorHandler(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "This is a custom error message", http.StatusInternalServerError)
}

// Handler for static files
func staticFilesHandler() http.Handler {
	return http.StripPrefix("/static/", http.FileServer(http.Dir("static")))
}

func main() {
	// Register handlers
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/json", jsonHandler)
	http.HandleFunc("/error", errorHandler)
	http.Handle("/static/", staticFilesHandler())
	http.HandleFunc("/health", healthHandler)

	// Create server with middleware
	server := &http.Server{
		Addr:    ":8080",
		Handler: loggingMiddleware(http.DefaultServeMux),
	}

	log.Println("Starting server on :8080")
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal("ListenAndServe: ", err)
	}
}