package main

import (
	"app/core"
	"app/libs/log"
	"app/routers"
	"app/utils"
	"fmt"
	"net/http"

	"github.com/gin-contrib/location"
	"github.com/gin-gonic/gin"
)

func Options(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "HEAD,GET,POST,OPTIONS")
	c.Header("Access-Control-Allow-Headers", "authorization, origin, content-type, accept")
	c.Header("Allow", "HEAD,GET,POST,OPTIONS")
	c.Header("Content-Type", "application/json")
	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusOK)
	}
}

func main() {
	//gin.SetMode(gin.ReleaseMode)

	//INICIANDO ARCHIVO DE CONFIGURACION
	var c = &utils.Config
	c.Load()

	//INICIANDO LOGS DE SERVIDOR
	log.Log = log.LogObject{
		Directory:      c.Log.Directory,
		MaxFiles:       c.Log.MaxFiles,
		FilePrefix:     c.Log.FilePrefix,
		FileLimit:      c.Log.FileLimit,
		ConsoleEnabled: c.Log.ConsoleEnabled,
		FileEnabled:    c.Log.FileEnabled,
		MaxQueue:       20,
	}

	//INICNANDO BASE DE DATOS
	core.InitDatabase()
	core.InitilizeAppDB()

	//RUN SERVER
	var err error
	url := fmt.Sprintf("%s:%d", "0.0.0.0", c.Port)
	r := gin.Default()
	r.Use(Options)

	if c.HttpsEnabled {
		log.Log.Information("Servidor HTTPS iniciado en "+url, "Servidor")
		r.Use(location.New(location.Config{
			Scheme: "https",
			Base:   "/",
		}))
		routers.InitializeRouters(r)
		err = r.RunTLS(url, c.CertPath, c.KeyPath)
	} else {
		log.Log.Information("Servidor HTTP iniciado en "+url, "Server")
		r.Use(location.New(location.Config{
			Scheme: "http",
			Base:   "/",
		}))
		routers.InitializeRouters(r)
		err = r.Run(url)
	}

	if err != nil {
		panic("No se pudo iniciar el servidor " + err.Error())
	}
}
