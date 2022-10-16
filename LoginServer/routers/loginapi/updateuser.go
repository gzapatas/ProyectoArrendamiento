package loginapi

import (
	"app/controllers"
	"app/core/models/protocol"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o *LoginAPI) updateUser(c *gin.Context) {
	var objC protocol.UpdateUserClient
	var objS protocol.UpdateUserServer

	data, token := getData(c)

	if data == nil {
		return
	}

	err := json.Unmarshal(data, &objC)

	if err != nil {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INVALID_JSON, err.Error()))
		return
	}

	var con = objC.Check()

	if con != "" {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INCOMPLETE_DATA, con))
		return
	}

	ret := controllers.CtrlUpdateUser(&objC, token)

	if ret != "" {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INTERNAL_ERROR, ret))
		return
	}

	objS.ResponseCode = int(protocol.NO_ERROR)
	objS.ResponseString = ""

	c.JSON(http.StatusOK, objS)
}
