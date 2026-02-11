package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Define route handlers
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/about", aboutHandler)
	http.HandleFunc("/contact", contactHandler)
	http.HandleFunc("/api/data", apiDataHandler)
	http.HandleFunc("/health", healthCheckHandler)

	// Serve static files
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Custom 404 handler
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.NotFound(w, r)
	})

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

// Home page handlerunc homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Home Page!")
}

// About page handlerunc aboutHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "About Us")
}

// Contact form handlerunc contactHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		// Handle form submission
		r.ParseForm()
		name := r.FormValue("name")
		email := r.FormValue("email")
		fmt.Fprintf(w, "Thank you, %s! We'll contact you at %s.", name, email)
	} else {
		// Serve contact form HTML
		http.ServeFile(w, r, "templates/contact.html")
	}
}

// API endpoint handlerunc apiDataHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"message\": \"Hello from API\"}")
}

// Health check endpointunc healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "OK")
}