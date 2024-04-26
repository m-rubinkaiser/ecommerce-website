package models

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	ProductID uint
	Product   Product `json:"product" gorm:"foreignkey:ProductID"`
	Qty       uint    `json:"qty"`
	Amount    float64 `json:"amount"`
	Status    string  `json:"status"`
}
