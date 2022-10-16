package loginapi

import (
	"app/controllers"
	"app/core/models/protocol"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o *LoginAPI) getUsers(c *gin.Context) {
	var objC protocol.GetUsersClient
	var objS protocol.GetUsersServer

	data, token := getData(c)

	if token == nil {
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

	users := controllers.CtrlGetUsers(&objC, token)

	eo := protocol.GetErrorObject(protocol.NO_ERROR, "")
	objS.ResponseCode = eo.ResponseCode
	objS.ResponseString = eo.ResponseString

	for _, user := range users {
		objS.AddItem(user)
	}

	c.JSON(http.StatusOK, objS)
}
