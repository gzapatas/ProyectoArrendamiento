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

func (o *LotesAPI) getSectores(c *gin.Context){
	var objC lt.GetSectoresClient
	var objS lt.GetSectoresServer

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

	sectores := lotes.CtrlGetSectores(&objC)
	for _, sector := range sectores {
		objS.AddItem(sector)
	}

	eo := protocol.GetErrorObject(protocol.NO_ERROR,"")
	objS.ResponseCode = eo.ResponseCode
	objS.ResponseString = eo.ResponseString
	

	c.JSON(http.StatusOK, objS)
}