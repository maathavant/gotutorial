package main

import (
	"fmt"
	"net/http"
	"strings"
)

func main() {
	// GET request example
	resp, err := http.Get("https://jsonplaceholder.typicode.com/posts/1")
	if err != nil {
		fmt.Println("Error making GET request:", err)
		return
	}
	defer resp.Body.Close()

	fmt.Println("GET Response Status:", resp.Status)

	// POST request example
	data := "title=foo&body=bar&userId=1"
	resp, err = http.Post("https://jsonplaceholder.typicode.com/posts", "application/x-www-form-urlencoded", 
		strings.NewReader(data))
	if err != nil {
		fmt.Println("Error making POST request:", err)
		return
	}
	defer resp.Body.Close()

	fmt.Println("POST Response Status:", resp.Status)
}