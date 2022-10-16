package lotes

import (
	"app/core"
	"app/core/models/database"
	lt "app/core/models/protocol/lotes"
)

func CtrlCreateLote(obj *lt.CreateLoteClient) string{
	var lotes []database.Lotes

	core.Database.Where("lote_sector = ? AND lote_manzana = ? AND lote_nro = ? AND lote_estado != ?",
							obj.Sector,obj.Block,obj.Number,core.LOTE_ELIMINADO).Find(&lotes)

	if len(lotes) != 0 {
		return "La propiedad ya se encuentra registrada"
	}

	var lote database.Lotes

	lote.Estado = core.LOTE_VACIO
	lote.Manzana = obj.Block
	lote.Nro = obj.Number
	lote.Sector = obj.Sector

	ret := core.Database.Create(&lote)

	if ret.Error != nil {
		return "No se pudo crear la propiedad"
	}

	return ""
}