package controller

import (
	"encoding/json"
	"net/http"

	// "strconv"

	"github.com/m-rubinkaiser/Api/models"
)

func insertOrder(cart []models.Cart) error {
	for i := range cart {
		if err := Db.Create(&models.Cart{
			ProductID: cart[i].ProductID,
			Qty:      cart[i].Qty,
			Amount: float64(cart[i].Qty)*cart[i].Product.Price,
			Status:   cart[i].Status}).
			Error; err != nil {
			return err
		}
	}
	return nil
}

func CreateOrder(w http.ResponseWriter, r *http.Request) {
	// var products []models.Product
	var cart []models.Cart
	err := json.NewDecoder(r.Body).Decode(&cart)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	insertOrder(cart)

	data := Data{Success: true, ProductModels: cart}
	json.NewEncoder(w).Encode(data)
}

