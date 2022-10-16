package loginapi

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type LoginAPI struct {
	Apiname string
	Name    string
}

// Funcion para inicializar API
func (o *LoginAPI) InitializeAPI(e *gin.Engine) {

	e.POST("/Login", o.login)
	e.POST("/Logout", o.logout)
	e.POST("/CreateUser", o.createUser)
	e.POST("/GetUsers", o.getUsers)
	e.POST("/DeleteUser", o.deleteUser)
	e.POST("/UpdateUser", o.updateUser)
	e.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Ok!")
	})
}
