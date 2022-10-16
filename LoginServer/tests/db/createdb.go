package main

import (
	"app/core"
	"app/core/models/database"
	"app/libs/log"
	"app/utils"
	"encoding/json"
	"time"
)

func main() {
	//Archivo de configuracion
	c := &utils.Config
	c.Load()

	log.Log = log.LogObject{
		Directory:      c.Log.Directory,
		MaxFiles:       c.Log.MaxFiles,
		FilePrefix:     c.Log.FilePrefix,
		FileLimit:      c.Log.FileLimit,
		ConsoleEnabled: c.Log.ConsoleEnabled,
		FileEnabled:    c.Log.FileEnabled,
		MaxQueue:       20,
	}
	log.Log.Information("Creando base de datos", "Database")

	core.InitDatabase()
	core.PopoulateDB()

	log.Log.Information("Base de datos creada", "Database")

	permissions := database.Permissions{
		Type:  "admin",
		Views: "all",
	}

	rawpermission, _ := json.Marshal(permissions)

	log.Log.Information("Agregando al usuario root al sistema", "Database")

	core.Database.Create(&database.Users{
		Username:    "root",
		Password:    "dbb1c112a931eeb16299d9de1f30161d", //root123456
		Documentid:  "123456",
		Status:      1,
		Cellphone:   "123456789",
		Permissions: string(rawpermission),
		Email:       "gzapatasegura@gmail.com",
		Name:        "root",
		Lastname:    "admin",
	})

	log.Log.Information("Usuario root agregado", "Database")

	time.Sleep(1 * time.Second)
}
