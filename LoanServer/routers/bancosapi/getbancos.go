package bancosapi

import (
	"app/controllers/bancos"
	"app/core/models/protocol"
	b "app/core/models/protocol/bancos"
	"app/utils"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (o *BancosAPI ) getBancos(c *gin.Context){
	var objC b.GetBancosClient
	var objS b.GetBancosServer

	data, _ := utils.GetData(c)

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

	bancos := bancos.CtrlGetBancos(&objC)

	for _, banco := range bancos {
		objS.AddItem(banco)
	}

	eo := protocol.GetErrorObject(protocol.NO_ERROR,"")
	objS.ResponseCode = eo.ResponseCode
	objS.ResponseString = eo.ResponseString
	

	c.JSON(http.StatusOK, objS)
}