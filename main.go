package main

import (
	"fmt"
	"net/http"
	"net/url"
	"log"
)

func main() {
	// Define the target URL we want to proxy to
	targetURL := "http://example.com"

	// Create a new reverse proxy handler
	proxy := http.NewSingleHostReverseProxy(
		&url.URL{
			Scheme: "http",
			Host:   "example.com",
		},
	)

	// Create a new HTTP server
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Log the request
		log.Printf("Received request: %s %s", r.Method, r.URL.Path)

		// Forward the request to the target URL
		proxy.ServeHTTP(w, r)
	})

	// Start the server on port 8080
	fmt.Println("Starting proxy server on :8080")
	if err := http.ListenAndServe(":8080", nil);
		err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}