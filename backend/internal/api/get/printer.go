package get

import (
	"backend/internal/api/option"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"
)

type Printer struct {
	Server          string `json:"server"`
	Queue           string `json:"queue"`
	Model           string `json:"model"`
	IP              string `json:"ip"`
	PrintProccessor string `json:"printProccessor"`
	Location        string `json:"location"`
	Notes           string `json:"notes"`
}

// Request to return all printers that match the search
func PrinterSearch(w http.ResponseWriter, r *http.Request) {
	option.EnableCORS(w, r)

	if !checkMethod(r) {
		return
	}

	time.Sleep(1 * time.Second)
	search := strings.Split(r.URL.Path, "/")[3]

	printers := MatchPrinter(search)

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // Send 200 OK status

	if search == "" {
		jsonData, _ := json.Marshal(printers)

		// Write the response to the client
		w.Write(jsonData)
		return
	}

}

// Matches printer to the search
func MatchPrinter(input string) (printers []Printer) {
	printersList := fetchPrinters()

	for _, printer := range printersList {
		build := fmt.Sprintf("\\\\%s\\%s %s %s %s %s %s", printer.Server, printer.Queue, printer.Model, printer.IP, printer.PrintProccessor, printer.Location, printer.Notes)
		if strings.Contains(build, input) {
			printers = append(printers, printer)
		}
	}
	return
}

// Retrieves the printer queue from the server
func fetchPrinters() (printer []Printer) {
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

		printer = append(printer, Printer{record[0], record[1], record[2], record[3], record[4], record[5], record[6]})

	}

	return
}
