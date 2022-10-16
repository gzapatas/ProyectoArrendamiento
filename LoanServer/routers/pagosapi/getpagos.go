package pagossapi

import (
	//"app/controllers"
	"app/controllers/pagos"
	"app/core/models/protocol"
	pa "app/core/models/protocol/pagos"
	"app/utils"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o *PagosAPI) getPagos(c *gin.Context){
	var objC pa.GetPagosClient
	var objS pa.GetPagosServer

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

	pagos,bancos,estados := pagos.CtrlGetPagos(&objC)
	for _, pago := range pagos {
		objS.AddItem(pago,bancos,estados)
	}

	eo := protocol.GetErrorObject(protocol.NO_ERROR,"")
	objS.ResponseCode = eo.ResponseCode
	objS.ResponseString = eo.ResponseString
	

	c.JSON(http.StatusOK, objS)
}