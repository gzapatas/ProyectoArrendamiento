package main

import (
	"app/core"
	"app/core/models/database"
	"app/libs/log"
	"app/utils"
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

	log.Log.Information("Agregando lista de bancos al sistema", "Database")

	core.Database.Create(&database.Bancos{
		Nombre: "Banco Continental",
		Alias:  "BBVA",
	})

	core.Database.Create(&database.Bancos{
		Nombre: "Banco Interbank",
		Alias:  "Interbank",
	})

	core.Database.Create(&database.Bancos{
		Nombre: "Banco de Credito",
		Alias:  "BCP",
	})

	core.Database.Create(&database.Bancos{
		Nombre: "Banco de la Nacion",
		Alias:  "BN",
	})

	core.Database.Create(&database.Bancos{
		Nombre: "Scotiabank",
		Alias:  "SB",
	})

	log.Log.Information("Lista de bancos agregada", "Database")

	log.Log.Information("Agregando lista de estados al sistema", "Database")

	core.Database.Create(&database.Estados{
		Valor:       core.LOTE_VACIO,
		Tipo:        core.LOTE,
		Descripcion: "Vacio",
	})
	core.Database.Create(&database.Estados{
		Valor:       core.LOTE_ELIMINADO,
		Tipo:        core.LOTE,
		Descripcion: "Eliminado",
	})
	core.Database.Create(&database.Estados{
		Valor:       core.LOTE_OCUPADO,
		Tipo:        core.LOTE,
		Descripcion: "Ocupado",
	})
	core.Database.Create(&database.Estados{
		Valor:       core.LOTE_MANTENIMIENTO,
		Tipo:        core.LOTE,
		Descripcion: "En mantenimiento",
	})

	log.Log.Information("Lista de bancos agregada", "Database")

	log.Log.Information("Agregando lista de pagos al sistema", "Database")

	core.Database.Create(&database.Estados{
		Valor:       core.PAGO_REALIZADO,
		Tipo:        core.PAGO,
		Descripcion: "Realizado",
	})
	core.Database.Create(&database.Estados{
		Valor:       core.PAGO_ANULADO,
		Tipo:        core.PAGO,
		Descripcion: "Anulado",
	})

	log.Log.Information("Lista de pagos agregada", "Database")

	log.Log.Information("Agregando lista de contratos al sistema", "Database")

	core.Database.Create(&database.Estados{
		Valor:       core.CONTRATO_VIGENTE,
		Tipo:        core.CONTRATO,
		Descripcion: "Vigente",
	})
	core.Database.Create(&database.Estados{
		Valor:       core.CONTRATO_DONADO,
		Tipo:        core.CONTRATO,
		Descripcion: "Donado",
	})
	/*core.Database.Create(&database.Estados{
		Valor: core.CONTRATO_ANULADO,
		Tipo: core.CONTRATO,
		Descripcion: "Anulado",
	})*/
	core.Database.Create(&database.Estados{
		Valor:       core.CONTRATO_CONCILIACION,
		Tipo:        core.CONTRATO,
		Descripcion: "En conciliacion",
	})

	core.Database.Create(&database.Estados{
		Valor:       core.CONTRATO_FINALIZADO,
		Tipo:        core.CONTRATO,
		Descripcion: "Finalizado",
	})

	log.Log.Information("Lista de contratos agregada", "Database")

	time.Sleep(1 * time.Second)
}
