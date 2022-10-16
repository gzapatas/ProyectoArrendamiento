package lotes

import (
	"app/controllers/estados"
	"app/core"
	"app/core/models/database"
	lt "app/core/models/protocol/lotes"
)

//Funcion para obtener dispositivos
func CtrlGetLotes(obj *lt.GetLotesClient) ([]database.Lotes, map[int32]database.Estados){
	var records []database.Lotes

	states := estados.CtrlGetStatesByIndex(core.LOTE)

	if obj.Id != "" {
		core.Database.Find(&records,obj.Id)
	} else if obj.Sector != "" && obj.Block != "" && obj.Number != "" && obj.Status != "" {
		core.Database.Order("lote_id").Where("lote_estado = ? AND lote_sector = ? AND lote_manzana = ? AND lote_nro = ?",
		obj.Status,
		obj.Sector,
		obj.Block,
		obj.Number).Find(&records)
	} else if obj.Sector != "" && obj.Block != "" && obj.Status != "" {
		core.Database.Order("lote_id").Where("lote_estado = ? AND lote_sector = ? AND lote_manzana = ?",
		obj.Status,
		obj.Sector,
		obj.Block).Find(&records)
	} else if obj.Sector != "" && obj.Status != "" {
		core.Database.Order("lote_id").Where("lote_estado = ? AND lote_sector = ?",
		obj.Status,
		obj.Sector).Find(&records)
	} else if obj.Status != "" {
		core.Database.Order("lote_id").Where("lote_estado = ?",obj.Status).Find(&records)
	}
	
	return records,states
}