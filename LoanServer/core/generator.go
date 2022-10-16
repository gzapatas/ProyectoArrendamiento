package core

import (
	"app/core/models/database"
	"app/libs/log"
)

// Funcion para crear la base de datos
func PopoulateDB() {
	Database.Migrator().DropTable(&database.Bancos{})
	Database.Migrator().CreateTable(&database.Bancos{})
	Database.Migrator().DropTable(&database.Estados{})
	Database.Migrator().CreateTable(&database.Estados{})
	Database.Migrator().DropTable(&database.Lotes{})
	Database.Migrator().CreateTable(&database.Lotes{})
	Database.Migrator().DropTable(&database.Contratos{})
	Database.Migrator().CreateTable(&database.Contratos{})
	Database.Migrator().DropTable(&database.Pagos{})
	Database.Migrator().CreateTable(&database.Pagos{})
}

func InitilizeAppDB() {

	createIfNotExists(&database.Bancos{}, initializeBancos)
	createIfNotExists(&database.Estados{}, initializeEstados)
	createIfNotExists(&database.Lotes{}, nil)
	createIfNotExists(&database.Contratos{}, nil)
	createIfNotExists(&database.Pagos{}, nil)
}

func initializeBancos() {
	log.Log.Information("Agregando lista de bancos al sistema", "Database")
	Database.Create(&database.Bancos{
		Nombre: "Banco Continental",
		Alias:  "BBVA",
	})

	Database.Create(&database.Bancos{
		Nombre: "Banco Interbank",
		Alias:  "Interbank",
	})

	Database.Create(&database.Bancos{
		Nombre: "Banco de Credito",
		Alias:  "BCP",
	})

	Database.Create(&database.Bancos{
		Nombre: "Banco de la Nacion",
		Alias:  "BN",
	})

	Database.Create(&database.Bancos{
		Nombre: "Scotiabank",
		Alias:  "SB",
	})
	log.Log.Information("Lista de bancos agregada", "Database")
}

func initializeEstados() {
	log.Log.Information("Agregando lista de estados al sistema", "Database")

	Database.Create(&database.Estados{
		Valor:       LOTE_VACIO,
		Tipo:        LOTE,
		Descripcion: "Vacio",
	})
	Database.Create(&database.Estados{
		Valor:       LOTE_ELIMINADO,
		Tipo:        LOTE,
		Descripcion: "Eliminado",
	})
	Database.Create(&database.Estados{
		Valor:       LOTE_OCUPADO,
		Tipo:        LOTE,
		Descripcion: "Ocupado",
	})
	Database.Create(&database.Estados{
		Valor:       LOTE_MANTENIMIENTO,
		Tipo:        LOTE,
		Descripcion: "En mantenimiento",
	})

	log.Log.Information("Lista de bancos agregada", "Database")

	log.Log.Information("Agregando lista de pagos al sistema", "Database")

	Database.Create(&database.Estados{
		Valor:       PAGO_REALIZADO,
		Tipo:        PAGO,
		Descripcion: "Realizado",
	})
	Database.Create(&database.Estados{
		Valor:       PAGO_ANULADO,
		Tipo:        PAGO,
		Descripcion: "Anulado",
	})

	log.Log.Information("Lista de pagos agregada", "Database")

	log.Log.Information("Agregando lista de contratos al sistema", "Database")

	Database.Create(&database.Estados{
		Valor:       CONTRATO_VIGENTE,
		Tipo:        CONTRATO,
		Descripcion: "Vigente",
	})
	Database.Create(&database.Estados{
		Valor:       CONTRATO_DONADO,
		Tipo:        CONTRATO,
		Descripcion: "Donado",
	})
	/*Database.Create(&database.Estados{
		Valor: CONTRATO_ANULADO,
		Tipo: CONTRATO,
		Descripcion: "Anulado",
	})*/
	Database.Create(&database.Estados{
		Valor:       CONTRATO_CONCILIACION,
		Tipo:        CONTRATO,
		Descripcion: "En conciliacion",
	})

	Database.Create(&database.Estados{
		Valor:       CONTRATO_FINALIZADO,
		Tipo:        CONTRATO,
		Descripcion: "Finalizado",
	})

	log.Log.Information("Lista de contratos agregada", "Database")
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
