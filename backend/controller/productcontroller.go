package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/m-rubinkaiser/Api/models"
)

type Data struct {
	Success       bool        `json:"success"`
	ProductModels interface{} `json:"models,omitempty"`
	Error         string      `json:"error,omitempty"`
	Amount        float64     `json:"amount,omitempty"`
}

// get product Api - /products
func GetProducts(w http.ResponseWriter, r *http.Request) {
	var products []models.Product
	query := r.URL.Query()
	// fmt.Println(query)
	productName := query.Get("keyword")
	fmt.Println(productName)
	if err := Db.Preload("Images").Where("name LIKE ?", "%"+productName+"%").Find(&products).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	data := Data{Success: true, ProductModels: products}
	json.NewEncoder(w).Encode(data)
}

// get single product Api - /product/{id}
func GetSingleProduct(w http.ResponseWriter, r *http.Request) {
	var products []models.Product
	id := r.PathValue("id")

	if err := Db.Preload("Images").Where("id=?", id).Find(&products).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if len(products) == 0 {
		http.Error(w, "Not Found", http.StatusNotFound)
		data := Data{Success: false, Error: "the given id not available"}
		json.NewEncoder(w).Encode(data)
		return
	}
	data := Data{Success: true, ProductModels: products[0]}
	json.NewEncoder(w).Encode(data)
}
