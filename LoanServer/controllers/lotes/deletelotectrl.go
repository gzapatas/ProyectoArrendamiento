package lotes

import (
	"app/core"
	"app/core/models/database"
	lt "app/core/models/protocol/lotes"
)

func CtrlDeleteLote(obj *lt.DeleteLoteClient) string{
	var lote database.Lotes

	core.Database.Find(&lote, obj.Id)

	if lote.Id != obj.Id {
		return "No se encontro el lote a eliminar"
	}

	if lote.Estado == core.LOTE_ELIMINADO {
		return "El lote ya se encuentra eliminado"
	}

	if lote.Estado == core.LOTE_OCUPADO {
		return "No se puede eliminar un lote ocupado, debe liberar el contrato"
	}


	lote.Estado = core.LOTE_ELIMINADO

	ret := core.Database.Save(&lote)

	if ret.Error != nil {
		return "No se pudo eliminar el lote"
	}

	return ""
}