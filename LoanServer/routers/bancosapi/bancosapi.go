package bancosapi

import (
	"github.com/gin-gonic/gin"
)

type BancosAPI struct{
	Apiname		string
	Name		string
}

//Funcion para inicializar API
func (o *BancosAPI) InitializeAPI(e* gin.Engine){
	e.POST("/" + o.Apiname + "/Get",o.getBancos)
}

