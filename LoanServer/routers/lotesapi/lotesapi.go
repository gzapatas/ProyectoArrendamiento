package lotesapi

import (
	"github.com/gin-gonic/gin"
)

type LotesAPI struct{
	Apiname		string
	Name		string
}

//Funcion para inicializar API
func (o *LotesAPI)InitializeAPI(e* gin.Engine){

	e.POST("/" + o.Apiname + "/Create",o.createLote)
	e.POST("/" + o.Apiname + "/Get",o.getLotes)
	e.POST("/" + o.Apiname + "/Delete",o.deleteLote)
	e.POST("/" + o.Apiname + "/Update",o.updateLote)
	e.POST("/" + o.Apiname + "/GetSectors",o.getSectores)
}

