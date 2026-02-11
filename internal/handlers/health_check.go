package internal

import (
	"net/http"
)

// HealthCheckHandler handles /health endpoint
func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}