package middleware

import (
	"net/http"
)

func Auth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Implement authentication logic (e.g., JWT, API keys)
		next(w, r)
	}
}