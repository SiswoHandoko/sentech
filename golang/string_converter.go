package main

import (
	"fmt"
	"regexp"
	"strings"
)

func wordFrequency(text string) map[string]int {
	re := regexp.MustCompile(`[^\w\s]`)
	clean := re.ReplaceAllString(text, "")

	clean = strings.ToLower(clean)

	words := strings.Fields(clean)

	freq := make(map[string]int)
	for _, w := range words {
		freq[w]++
	}

	return freq
}

func main() {
	text := "Four, One two two three Three three four  four   four"
	result := wordFrequency(text)

	for k, v := range result {
		fmt.Printf("%s => %d\n", k, v)
	}
}
