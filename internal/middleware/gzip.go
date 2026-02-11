package internal

import (
	"compress/gzip"
	"net/http"
	"strings"
)

// Gzip middleware
func Gzip(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Check if client accepts gzip
		if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
			// Create gzip writer
			gw, _ := gzip.NewWriterLevel(w, gzip.BestSpeed)
			defer gw.Close()

			// Set headers
			w.Header().Set("Content-Encoding", "gzip")

			// Write through gzip
			next.ServeHTTP(gw, r)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}