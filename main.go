package main

import (
	"fmt"
	"net/http"
	"net/url"
)

func main() {
	// Create a new reverse proxy
	proxy := http.NewServeMux()
	
	// Define the target server (replace with your desired URL)
	target, _ := url.Parse("http://example.com")
	
	// Create the reverse proxy handler
	proxy.Handle("/", http.StripPrefix("/", http.ProxyHandler(target)))
	
	fmt.Println("Starting proxy server on :8080")
	if err := http.ListenAndServe(":8080", proxy); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}