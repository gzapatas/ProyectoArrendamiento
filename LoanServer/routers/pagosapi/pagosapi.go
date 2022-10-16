package pagossapi

import (
	"github.com/gin-gonic/gin"
)

type PagosAPI struct{
	Apiname		string
	Name		string
}

//Funcion para inicializar API
func (o *PagosAPI)InitializeAPI(e* gin.Engine){
	e.POST("/" + o.Apiname + "/Create",o.createPago)
	e.POST("/" + o.Apiname + "/CreateInitial",o.createPagoInicial)
	e.POST("/" + o.Apiname + "/Get",o.getPagos)
	e.POST("/" + o.Apiname + "/Delete",o.deletePago)
	e.POST("/" + o.Apiname + "/Update",o.updatePago)
	e.POST("/" + o.Apiname + "/ReportPago",o.reportPago)
}

