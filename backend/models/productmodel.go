package models

import "gorm.io/gorm"

type ImageDatas struct {
	gorm.Model
	ProductID uint // Foreign key
	ImageUrl  string
}

type Product struct {
	gorm.Model
	Name         string       `json:"name"`
	Price        float64      `json:"price"`
	Description  string       `json:"description"`
	Rating       float64      `json:"rating"`
	Images       []ImageDatas `json:"images" gorm:"foreignKey:ProductID"` // Define the foreign key relationship
	Category     string       `json:"category"`
	Seller       string       `json:"seller"`
	Stock        uint         `json:"stock"`
	NumOfReviews uint         `json:"numofreview"`
	// CreatedAt time.Time `json:"createdat"`
}
