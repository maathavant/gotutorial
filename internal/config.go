package internal

import (
	"os"
	"strconv"
)

// Config holds application configuration
type Config struct {
	Port      string
	Env       string
	Database  string
}

// LoadConfig loads configuration from environment variables
func LoadConfig() *Config {
	return &Config{
		Port:     os.Getenv("PORT")
		Env:      os.Getenv("ENV")
		Database: os.Getenv("DATABASE_URL")
	}
}