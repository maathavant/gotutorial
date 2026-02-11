package main

import (
	"fmt"
	"net/http"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	logger.Info("Starting server on :8080")
	http.ListenAndServe(":8080", nil)
}