package routers

import (
	"app/libs/log"
	ba "app/routers/bancosapi"
	ca "app/routers/contratosapi"
	ea "app/routers/estadosapi"
	la "app/routers/lotesapi"
	pa "app/routers/pagosapi"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InitializeRouters(e *gin.Engine) {
	log.Log.Information("Inicializando endpoints de BancosAPI", "Server")

	bancosapi := ba.BancosAPI{
		Apiname: "api/v1/Bancos",
		Name:    "BancosAPI",
	}

	bancosapi.InitializeAPI(e)
	log.Log.Information("BancosAPI endpoints fueron inicializados", "Server")

	log.Log.Information("Inicializando endpoints de ContratosAPI", "Server")

	contratosapi := ca.ContratosAPI{
		Apiname: "api/v1/Contratos",
		Name:    "ContratosAPI",
	}

	contratosapi.InitializeAPI(e)
	log.Log.Information("ContratosAPI endpoints fueron inicializados", "Server")

	log.Log.Information("Inicializando endpoints de EstadosAPI", "Server")

	estadosapi := ea.EstadosAPI{
		Apiname: "api/v1/Estados",
		Name:    "EstadosAPI",
	}

	estadosapi.InitializeAPI(e)
	log.Log.Information("EstadosAPI endpoints fueron inicializados", "Server")

	log.Log.Information("Inicializando endpoints de LotesAPI", "Server")

	lotesapi := la.LotesAPI{
		Apiname: "api/v1/Lotes",
		Name:    "LotesAPI",
	}

	lotesapi.InitializeAPI(e)
	log.Log.Information("LotesAPI endpoints fueron inicializados", "Server")

	log.Log.Information("Inicializando endpoints de PagosAPI", "Server")

	pagosapi := pa.PagosAPI{
		Apiname: "api/v1/Pagos",
		Name:    "PagosAPI",
	}

	pagosapi.InitializeAPI(e)
	log.Log.Information("PagosAPI endpoints fueron inicializados", "Server")

	log.Log.Information("Agregando heathcheck", "Server")
	e.GET("/healthcheck", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Ok!")
	})
	log.Log.Information("Heathcheck agregado", "Server")
}
