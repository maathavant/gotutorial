package main

import (
	"fmt"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/user/gotutorial/internal/handlers"
	"github.com/user/gotutorial/internal/middleware"
	"github.com/user/gotutorial/internal/config"
)

func main() {
	// Load configuration
	cfg := config.LoadConfig()

	// Create a new router
	router := mux.NewRouter()

	// Apply middleware
	router.Use(middleware.Logger)
	router.Use(middleware.CORS)
	router.Use(middleware.Recovery)
	router.Use(middleware.Auth)
	router.Use(middleware.Gzip)
	router.Use(middleware.Timeout)
	router.Use(middleware.Secure)

	// Define routes
	router.HandleFunc("/", handlers.HomeHandler)
	router.HandleFunc("/users", handlers.UsersHandler).Methods("GET")
	router.HandleFunc("/health", handlers.HealthCheckHandler).Methods("GET")

	// Start server
	fmt.Printf("Server is running on port %s...\n", cfg.Port)
	http.ListenAndServe(":"+cfg.Port, router)
}