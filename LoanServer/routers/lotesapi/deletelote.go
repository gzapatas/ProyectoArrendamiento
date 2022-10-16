package lotesapi

import (
	"app/controllers/lotes"
	"app/core/models/protocol"
	lt "app/core/models/protocol/lotes"
	"app/utils"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o * LotesAPI) deleteLote(c *gin.Context){
	var objC lt.DeleteLoteClient
	var objS lt.DeleteLoteServer

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

	ret := lotes.CtrlDeleteLote(&objC)

	if ret != ""{
		c.JSON(http.StatusOK, protocol.GetErrorObject(protocol.INTERNAL_ERROR,ret))
		return
	}

	objS.ResponseCode = int(protocol.NO_ERROR)
	objS.ResponseString = ""
	
	c.JSON(http.StatusOK, objS)
}