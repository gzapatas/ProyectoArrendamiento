package loginapi

import (
	"app/controllers"
	"app/core/models/protocol"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o *LoginAPI) logout(c *gin.Context) {
	var objS protocol.LogoutServer

	data, token := getData(c)

	if data == nil {
		return
	}

	controllers.CtrlLogout(token)

	objS.ResponseCode = int(protocol.NO_ERROR)
	objS.ResponseString = ""

	c.JSON(http.StatusOK, objS)
}
