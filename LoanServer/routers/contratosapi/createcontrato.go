package contratosapi

import (
	"app/controllers/contratos"
	"app/core/models/protocol"
	ct "app/core/models/protocol/contratos"
	"app/utils"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o * ContratosAPI) createContrato(c *gin.Context){
	var objC ct.CreateContratoClient
	var objS ct.CreateContratoServer

	data,_ := utils.GetData(c)

	if data == nil{
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

	ret := contratos.CtrlCreateContrato(&objC)

	if ret != ""{
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INTERNAL_ERROR,ret))
		return
	}

	objS.ResponseCode = int(protocol.NO_ERROR)
	objS.ResponseString = ""
	
	c.JSON(http.StatusOK, objS)
}