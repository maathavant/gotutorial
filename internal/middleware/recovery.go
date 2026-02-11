package internal

import (
	"fmt"
	"log"
	"net/http"
	"runtime"
)

// Recovery middleware to handle panics
func Recovery(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				// Log the panic
				log.Printf("Panic: %v\n", err)
				log.Printf("Stack trace: %s\n", getStack())

				// Return 500 error
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		}()

		next.ServeHTTP(w, r)
	})
}

// getStack returns the stack trace as a string
func getStack() string {
	var buf [4096]byte
	n := runtime.Stack(buf[:], false)
	return string(buf[:n])
}