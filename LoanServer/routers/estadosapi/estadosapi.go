package contratosapi

import (
	"github.com/gin-gonic/gin"
)

type EstadosAPI struct{
	Apiname		string
	Name		string
}

//Funcion para inicializar API
func (o *EstadosAPI) InitializeAPI(e* gin.Engine){
	e.POST("/" + o.Apiname + "/Get",o.getEstados)
}

