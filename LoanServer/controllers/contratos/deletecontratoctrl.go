package contratos

import (
	"app/core/models/database"
	ct "app/core/models/protocol/contratos"
	"app/core"
)

func CtrlDeleteContrato(obj *ct.DeleteContratoClient) string{
	var contrato database.Contratos
	var lote database.Lotes

	core.Database.Find(&contrato,obj.Id)

	if obj.Id != contrato.Id {
		return "No existe el contrato a eliminar"
	}

	if contrato.Estado == core.CONTRATO_ANULADO {
		return "El contrato ya se encuentra anulado"
	}

	if contrato.Estado == core.CONTRATO_FINALIZADO {
		return "No se puede eliminar un contrato finalizado"
	}

	core.Database.Find(&lote,contrato.Idlote)

	if lote.Id != contrato.Idlote {
		return "No existe el lote asociado al contrato"
	}

	lote.Estado = core.LOTE_VACIO

	ret := core.Database.Save(&lote)

	if ret.Error != nil {
		return "No se pudo vaciar el lote"
	}

	contrato.Estado = core.CONTRATO_ANULADO

	ret = core.Database.Save(&contrato)

	if ret.Error != nil {
		return "No se pudo anular el contrato"
	}

	return ""
}