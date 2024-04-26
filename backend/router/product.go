package routers

import (
	"net/http"

	"github.com/m-rubinkaiser/Api/controller"
	"github.com/m-rubinkaiser/Api/cors"
)

func Router() {
	http.HandleFunc("/products",cors.AllowCors(controller.GetProducts))
	http.HandleFunc("/product/{id}",cors.AllowCors(controller.GetSingleProduct))
}