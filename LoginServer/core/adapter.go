package core

import (
	"app/libs/log"
	"app/utils"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Database *gorm.DB

func InitDatabase() {
	log.Log.Information("Inicializando pool de base de datos", "Database")

	c := utils.Config.DBParams

	connectionstring := c.ToString()

	db, err := gorm.Open(postgres.Open(connectionstring), &gorm.Config{})

	if err != nil {
		log.Log.Error("Pool de base de datos - No se pudo obtener la conexion de GORM", "Database")
	}

	item, err := db.DB()

	if err != nil {
		log.Log.Error("Pool de base de datos - No se puede obtener la conexion", "Database")
	}

	item.SetMaxIdleConns(c.MaxIdleConns)
	item.SetMaxOpenConns(c.MaxOpenConns)

	Database = db

	log.Log.Information("Pool de base de datos inicializado", "Database")
}
