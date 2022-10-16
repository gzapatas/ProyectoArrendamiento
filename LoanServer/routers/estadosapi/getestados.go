package contratosapi

import (
	//"app/controllers"
	"app/controllers/estados"
	"app/core/models/protocol"
	ed "app/core/models/protocol/estados"
	"app/utils"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o *EstadosAPI) getEstados(c *gin.Context){
	var objC ed.GetEstadosClient
	var objS ed.GetEstadosServer

	data,token := utils.GetData(c)
	
	if token == nil{	
		return
	}

	err := json.Unmarshal(data, &objC)

	if err != nil {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INVALID_JSON,err.Error()))
		return
	}
	
	var con = objC.Check()

	if con != "" {
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INCOMPLETE_DATA,con))
		return
	}

	estados := estados.CtrlGetEstados(&objC)
	for _, estado := range estados {
		objS.AddItem(estado)
	}

	eo := protocol.GetErrorObject(protocol.NO_ERROR,"")
	objS.ResponseCode = eo.ResponseCode
	objS.ResponseString = eo.ResponseString
	

	c.JSON(http.StatusOK, objS)
}