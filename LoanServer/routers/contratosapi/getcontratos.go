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

func (o *ContratosAPI) getContratos(c *gin.Context){
	var objC ct.GetContratosClient
	var objS ct.GetContratosServer

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

	contratos,estados := contratos.CtrlGetContratos(&objC)

	for _, contrato := range contratos {
		objS.AddItem(contrato,estados)
	}

	eo := protocol.GetErrorObject(protocol.NO_ERROR,"")
	objS.ResponseCode = eo.ResponseCode
	objS.ResponseString = eo.ResponseString
	

	c.JSON(http.StatusOK, objS)
}