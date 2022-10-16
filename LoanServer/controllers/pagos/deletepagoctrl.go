package pagos

import (
	"app/core/models/database"
	pa "app/core/models/protocol/pagos"
	"app/core"
)

func CtrlDeletePago(obj *pa.DeletePagoClient) string{
	var pago database.Pagos

	core.Database.Find(&pago,obj.Id)

	if obj.Id != pago.Id {
		return "No existe el pago a eliminar"
	}

	pago.Estado = core.PAGO_ANULADO

	ret := core.Database.Save(&pago)
	//ret := core.Database.Model(database.Pagos{}).Where("recibo = ?", pago.Recibo).Updates(database.Pagos{Estado: core.PAGO_ANULADO})

	if ret.Error != nil {
		return "No se pudo anular el pago del recibo"
	}

	return ""
}