package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func UserHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			// Fetch users from DB
			rows, err := db.Query("SELECT id, name FROM users")
			if err != nil {
				http.Error(w, "Internal server error", http.StatusInternalServerError)
				return
			}
			defer rows.Close()

			var users []User
			for rows.Next() {
				var u User
				if err := rows.Scan(&u.ID, &u.Name); err != nil {
					http.Error(w, "Internal server error", http.StatusInternalServerError)
					return
				}
				users = append(users, u)
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(users)

		case "POST":
			// Create user
			var u User
			if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
				http.Error(w, "Invalid request body", http.StatusBadRequest)
				return
			}

			// Insert into DB
			_, err := db.Exec("INSERT INTO users (name) VALUES (?)", u.Name)
			if err != nil {
				http.Error(w, "Internal server error", http.StatusInternalServerError)
				return
			}

			w.WriteHeader(http.StatusCreated)
		}
	}
}