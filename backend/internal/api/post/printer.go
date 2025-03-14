package post

import (
	"backend/internal/api/option"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

type Printer struct {
	Server          string `json:"server"`
	Queue           string `json:"queue"`
	Model           string `json:"model"`
	IP              string `json:"ip"`
	PrintProccessor string `json:"printProccessor"`
	Location        string `json:"location"`
	Notes           string `json:"notes"`
	Type            string `json:"type"`
}

// Request to return all printers that match the search
func PrinterSearch(w http.ResponseWriter, r *http.Request) {
	var input Input
	option.EnableCORS(w, r)

	if !CheckMethod(r) {
		http.Error(w, "Incorrect Method", http.StatusBadRequest)
		return
	}

	fmt.Println(r.URL.Path)

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	// Log the received message
	fmt.Printf("Searching for:  %s\n", input.Value)

	if input.Value == "" {
		return
	}

	printers := MatchPrinter(input.Value)

	fmt.Printf("Number of Printers Found: %d", len(printers))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	jsonData, _ := json.MarshalIndent(printers, "", "  ")

	w.Write(jsonData)

}

// Matches printer to the search
func MatchPrinter(input string) (printers []Printer) {
	printers = make([]Printer, 0)
	printersList := fetchPrinters()

	for _, printer := range printersList {
		build := fmt.Sprintf("\\\\%s\\%s %s %s %s %s %s", printer.Server, printer.Queue, printer.Model, printer.IP, printer.PrintProccessor, printer.Location, printer.Notes)
		if strings.Contains(strings.ToLower(build), strings.ToLower(input)) {
			printers = append(printers, printer)
		}
	}
	return
}

// Retrieves the printer queue from the server
func fetchPrinters() (printers []Printer) {
	printers = make([]Printer, 0)
	// Make a GET request
	resp, err := http.Get("https://apps.mc.rochester.edu/ISD/SIG/PrintQueues/PrintQReport.csv")
	if err != nil {
		log.Fatalf("Error fetching URL: %v", err)
	}
	defer resp.Body.Close()

	// Read the response body
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}

	file := csv.NewReader(resp.Body)

	records, _ := file.ReadAll()

	for _, record := range records {
		var printer Printer
		printer.Server = record[0]
		printer.Queue = record[1]
		printer.Model = record[2]
		printer.IP = record[3]
		printer.PrintProccessor = record[4]
		printer.Location = record[5]
		printer.Notes = record[6]
		printer.Type = "printer"

		printers = append(printers, printer)

	}

	return
}
