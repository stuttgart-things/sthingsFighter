
package main

import (
"fmt"
"log"
"net/http"
"time"
)

func main() {
	http.HandleFunc("/events", func(w http.ResponseWriter, r *http.Request) {
	// Set headers for SSE
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173") // CORS
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported!", http.StatusInternalServerError)
	return
	}

	ticker := time.NewTicker(2 * time.Second)
	defer ticker.Stop()

	// Stream loop
	for {
		select {
			case <-r.Context().Done():
				log.Println("Client closed connection")
				return
			case t := <-ticker.C:
				keys := []string{"ken", "ryu"}
				rand.Seed(time.Now().UnixNano()) // Seed the random number generator
				randomKey := keys[rand.Intn(len(keys))]
				data := fmt.Sprintf("data: {\"key\": \"%s\", \"timestamp\": \"%s\"}\n\n", randomKey, t.Format(time.RFC3339))
				_, err := fmt.Fprint(w, data)
			if err != nil {
				log.Println("Error writing to client:", err)
				return
			}
			flusher.Flush()
		}
	}
	})

	port := 3000
	log.Printf("SSE server running at http://localhost:%d\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
