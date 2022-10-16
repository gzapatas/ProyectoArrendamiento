package pagos

import (
	"app/controllers/bancos"
	"app/controllers/estados"
	"app/core"
	"app/core/models/database"
	pa "app/core/models/protocol/pagos"
)

//Funcion para obtener dispositivos
func CtrlGetPagos(obj *pa.GetPagosClient) ([]database.GetPagos, map[uint64]database.Bancos, map[int32]database.Estados){
	var pagos []database.GetPagos

	banks := bancos.CtrlGetAllBanksByIndex()
	states := estados.CtrlGetStatesByIndex(core.PAGO)

	if obj.Id != "" {
		core.Database.Table("pagos AS p").Select("*").
			Joins("JOIN contratos AS c ON c.contrato_id = p.pago_contrato").
			Find(&pagos,obj.Id)
	} else if obj.Receipt != "" {
		core.Database.Table("pagos AS p").Select("*").
			Joins("JOIN contratos AS c ON c.contrato_id = p.pago_contrato").
			Where("p.pago_recibo = ?",obj.Status).Scan(&pagos)
	} else if obj.ContractId != "" && obj.Year != "" && obj.Status != "" {
		core.Database.Table("pagos AS p").Select("*").
			Joins("JOIN contratos AS c ON c.contrato_id = p.pago_contrato").
			Where("p.pago_contrato = ? AND p.pago_anio = ? AND p.pago_estado = ?",obj.Status).Scan(&pagos)
	} else if obj.Year != "" && obj.Status != "" {
		core.Database.Table("pagos AS p").Select("*").
			Joins("JOIN contratos AS c ON c.contrato_id = p.pago_contrato").
			Where("p.pago_anio = ? AND p.pago_estado = ?",obj.Year, obj.Status,obj).Scan(&pagos)
	}  else if obj.ContractId != "" && obj.Status != "" {
		core.Database.Table("pagos AS p").Select("*").
			Joins("JOIN contratos AS c ON c.contrato_id = p.pago_contrato").
			Where("p.pago_contrato = ? AND p.pago_estado = ?",obj.ContractId,obj.Status).Scan(&pagos)
	} else if obj.Status != "" {
		core.Database.Table("pagos AS p").Select("*").
			Joins("JOIN contratos AS c ON c.contrato_id = p.pago_contrato").
			Where("p.pago_estado = ?",obj.Status).Scan(&pagos)
	}
	
	return pagos, banks, states
}