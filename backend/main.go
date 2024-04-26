package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/m-rubinkaiser/Api/controller"
	"github.com/m-rubinkaiser/Api/models"
	routers "github.com/m-rubinkaiser/Api/router"
	// "github.com/m-rubinkaiser/Api/models"
)

func main() {
	err := controller.Db.AutoMigrate(&models.Product{})
	if err != nil {
		panic("automigrate failed")
	}
	err = controller.Db.AutoMigrate(&models.ImageDatas{})
	if err != nil {
		panic("automigrate failed")
	}
	err = controller.Db.AutoMigrate(&models.Cart{})
	if err != nil {
		panic("automigrate failed")
	}
	fmt.Println("success")
	routers.Router()
	routers.Order()
	log.Fatal(http.ListenAndServe("127.0.0.1:3000", nil))
}
