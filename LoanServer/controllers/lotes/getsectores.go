package lotes

import (
	"app/core"
	"app/core/models/database"
	lt "app/core/models/protocol/lotes"
)

//Funcion para obtener dispositivos
func CtrlGetSectores(obj *lt.GetSectoresClient) ([]database.Lotes){
	var records []database.Lotes
	
	core.Database.Distinct("lote_sector").Find(&records)

	return records
}