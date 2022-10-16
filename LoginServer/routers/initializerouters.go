package routers

import (
	"app/libs/log"
	"app/routers/loginapi"

	"github.com/gin-gonic/gin"
)

func InitializeRouters(e *gin.Engine) {
	log.Log.Information("Inicializando endpoints de LoginAPI", "Server")

	loginapi := loginapi.LoginAPI{
		Apiname: "api/v1",
		Name:    "LoginAPI",
	}

	loginapi.InitializeAPI(e)
	log.Log.Information("LoginAPI endpoints fueron inicializados", "Server")
}
