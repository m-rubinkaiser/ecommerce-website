package routers

import (
	"net/http"

	"github.com/m-rubinkaiser/Api/controller"
	"github.com/m-rubinkaiser/Api/cors"
)

func Order() {
	http.HandleFunc("/order",cors.AllowCors(controller.CreateOrder))
	// http.HandleFunc("/product/{id}",controller.)
}