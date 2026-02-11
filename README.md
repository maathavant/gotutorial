# Go Web Server

This is a robust and scalable web server built in Go. It includes:
- RESTful API endpoints
- Database integration
- Middleware for logging and authentication
- Modular architecture

## Features
- User management
- Health check endpoint
- Environment variable configuration
- Database connection management

## Running the Server
1. Ensure Go is installed
2. Run `go run main.go`
3. Test endpoints:
   - GET http://localhost:8080/health
   - GET http://localhost:8080/users
   - POST http://localhost:8080/users