package contratosapi

import (
	"github.com/gin-gonic/gin"
)

type ContratosAPI struct{
	Apiname		string
	Name		string
}

//Funcion para inicializar API
func (o *ContratosAPI)InitializeAPI(e* gin.Engine){
	e.POST("/" + o.Apiname + "/Create",o.createContrato)
	e.POST("/" + o.Apiname + "/Get",o.getContratos)
	e.POST("/" + o.Apiname + "/Delete",o.deleteContrato)
	e.POST("/" + o.Apiname + "/Update",o.updateContrato)
}

