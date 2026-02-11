package main

import (
	"fmt"
	"net/http"
	"time"
)

// Health check handler
func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"status\":\"OK\", \"timestamp\":\"%s\"}", time.Now().Format(time.RFC3339))
}