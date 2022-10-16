package lotes

import (
	"app/core"
	"app/core/models/database"
	lt "app/core/models/protocol/lotes"
)

func CtrlUpdateLote(obj *lt.UpdateLoteClient) string{
	var lotes []database.Lotes
	var lote database.Lotes

	core.Database.Where("lote_sector = ? AND lote_manzana = ? AND lote_nro = ? AND lote_estado != ?",
						obj.Sector,obj.Block,obj.Number,core.LOTE_ELIMINADO).Find(&lotes)

	if len(lotes) != 0 {
		lote = lotes[0]

		if lote.Id != obj.Id {
			return "Los datos que quiere actualizar ya estan siendo utilizados por otro lote"
		}
		
	} else {
		core.Database.Find(&lote,obj.Id);

		if lote.Id != obj.Id {
			return "No existe el lote seleccionado"
		}
	}

	if obj.Status == core.LOTE_ELIMINADO {
		if lote.Estado == core.LOTE_ELIMINADO {
			return "El lote ya se encuentra eliminado"
		}

		return "No se puede eliminar un lote de esta manera"
	}

	if obj.Block != "" { lote.Manzana = obj.Block }
	if obj.Number != "" { lote.Nro = obj.Number }
	if obj.Sector != "" { lote.Sector = obj.Sector }
	if obj.Status != 0 { lote.Estado = obj.Status }
	
	ret := core.Database.Save(&lote)

	if ret.Error != nil {
		return "No se pudo actualizar el lote"
	}

	return ""
}