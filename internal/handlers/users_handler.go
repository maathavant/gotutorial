package internal

import (
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
)

// User represents a user resource
type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// UsersHandler handles /users endpoint
func UsersHandler(w http.ResponseWriter, r *http.Request) {
	// Mock user data
	users := []User{
		{ID: "1", Name: "John Doe"},
		{ID: "2", Name: "Jane Smith"},
	}

	// Set content type
	w.Header().Set("Content-Type", "application/json")

	// Write response
	json.NewEncoder(w).Encode(users)
}