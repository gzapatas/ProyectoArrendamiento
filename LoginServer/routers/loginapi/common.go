package loginapi

import (
	"app/core"
	"app/core/models"
	"app/core/models/database"
	"app/core/models/protocol"
	"app/utils"
	"encoding/json"
	"io/ioutil"
	"net/http"
	ss "strings"
	"github.com/gin-gonic/gin"
)


func getData(c *gin.Context) ([]byte,*models.TokenObject){
	buffer, err := ioutil.ReadAll(c.Request.Body)
	Authorization := c.Request.Header.Get("Authorization")

	if err != nil {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INVALID_DATA,err.Error()))
		return nil,nil
	}

	if len(Authorization) == 0{
		c.String(401,"Acceso no autorizado")
		return nil,nil
	}

	strArr := ss.Split(Authorization, " ")

	if len(strArr) != 2 {
		c.String(401,"Token invalido")
		return nil,nil
	}

	tokendata := strArr[1]
	tokeninfo := utils.DecodeToken(tokendata)

	if tokeninfo == nil {
		c.String(401,"No se puede descifrar el token")
		return nil,nil
	}


	jsonbody, err := json.Marshal(tokeninfo)

	if err != nil {
		c.String(401,"Formato de token invalido")
		return nil,nil
	}

	token := models.TokenObject{}

	if err := json.Unmarshal(jsonbody, &token); err != nil {
		c.String(401,"Datos invalidos en el token")
		return nil,nil
	}


	var users []database.Users

	core.Database.Where("id = ?",token.Userid).Find(&users)

	if len(users) == 0{
		info := protocol.ErrorObject{}
		info.SetError(protocol.INTERNAL_ERROR,"Usuario no encontrado")
		c.JSON(http.StatusOK, info)
		return nil,nil
	}

	user := users[0]

	if user.Status != 1 {
		info := protocol.ErrorObject{}
		info.SetError(protocol.INTERNAL_ERROR,"Usuario inhabilitado")
		c.JSON(http.StatusOK, info)
		return nil,nil
	}

	if user.Sessionkey != token.Sessionkey {
		info := protocol.ErrorObject{}
		info.SetError(protocol.INTERNAL_ERROR,"Llave invalida")
		c.JSON(http.StatusOK, info)
		return nil,nil
	}

	return buffer,&token
}


