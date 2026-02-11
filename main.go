package main

import (
	"log"
	"net/http"
	"os"

	"go-web-server/handlers"
	"go-web-server/middleware"
	"go-web-server/config"
)

func main() {
	// Load environment variables
	config.Load()

	// Initialize database
	db := config.InitDB()
	defer db.Close()

	// Define routes
	http.HandleFunc("/health", handlers.HealthCheck)
	http.HandleFunc("/users", middleware.Auth(middleware.Logging(handlers.UserHandler(db))))

	// Start server
	port := os.Getenv("PORT")
	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}