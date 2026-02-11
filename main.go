package main

import (
	"fmt"
	"net/http"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewDevelopment()
	defer logger.Sync()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		logger.Info("Received request")
		fmt.Fprintf(w, "Hello, World!")
	})

	fmt.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		logger.Fatal("Server failed", zap.Error(err))
	}
}