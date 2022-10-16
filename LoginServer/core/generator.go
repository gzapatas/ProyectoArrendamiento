package core

import (
	"app/core/models/database"
	"app/libs/log"
	"encoding/json"
)

// Funcion para crear la base de datos
func PopoulateDB() {
	Database.Migrator().DropTable(&database.Users{})
	Database.Migrator().CreateTable(&database.Users{})
}

func InitilizeAppDB() {
	createIfNotExists(&database.Users{}, initializeUsers)
}

func initializeUsers() {
	permissions := database.Permissions{
		Type:  "admin",
		Views: "all",
	}

	rawpermission, _ := json.Marshal(permissions)

	log.Log.Information("Agregando al usuario root al sistema", "Database")

	Database.Create(&database.Users{
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
}

func createIfNotExists(in interface{}, fn func()) {
	migrator := Database.Migrator()

	if !migrator.HasTable(in) {
		migrator.CreateTable(in)
		if fn != nil {
			fn()
		}
	}
}
