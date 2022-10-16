package pagossapi

import (
	"app/controllers/pagos"
	"app/core/models/protocol"
	pa "app/core/models/protocol/pagos"
	"app/utils"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o * PagosAPI) createPago(c *gin.Context){
	var objC pa.CreatePagoClient
	var objS pa.CreatePagoServer

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

	ret := pagos.CtrlCreatePago(&objC)

	if ret != ""{
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INTERNAL_ERROR,ret))
		return
	}

	objS.ResponseCode = int(protocol.NO_ERROR)
	objS.ResponseString = ""
	
	c.JSON(http.StatusOK, objS)
}