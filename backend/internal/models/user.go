package models

type UserSimpleInfo struct {
	Type     string `json:"type"`
	Name     string `json:"name"`
	Username string `json:"username"`
	OU       string `json:"ou"`
}
