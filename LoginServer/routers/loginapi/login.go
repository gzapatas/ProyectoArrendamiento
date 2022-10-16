package loginapi

import (
	"app/controllers"
	"app/core/models/protocol"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o *LoginAPI) login(c *gin.Context) {
	var objC protocol.LoginClient
	var objS protocol.LoginServer

	data, err := ioutil.ReadAll(c.Request.Body)

	/*for k, vals := range c.Request.Header {
		fmt.Println(fmt.Sprintf("%s", k))
		for _, v := range vals {
			fmt.Println(fmt.Sprintf("\t%s", v))
		}
	}*/

	if err != nil {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INVALID_DATA, err.Error()))
		return
	}

	if data == nil {
		return
	}

	err = json.Unmarshal(data, &objC)

	if err != nil {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INVALID_JSON, err.Error()))
		return
	}

	var con = objC.Check()

	if con != "" {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INCOMPLETE_DATA, con))
		return
	}

	user, token := controllers.CtrlLogin(&objC)

	if user == nil {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INTERNAL_ERROR, "Usuario y/o contraseña erroneo"))
		return
	}

	objS.ResponseCode = int(protocol.NO_ERROR)
	objS.ResponseString = ""
	objS.Name = user.Name
	objS.Lastname = user.Lastname
	objS.Authorization = token

	c.JSON(http.StatusOK, objS)
}
