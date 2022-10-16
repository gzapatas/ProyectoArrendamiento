package pagos

import (
	"app/core"
	"app/core/models/database"
	pa "app/core/models/protocol/pagos"
	"strconv"
	"time"
)

func CtrlCreatePagoInicial(obj *pa.CreatePagoInicialClient) string{
	var pago database.Pagos
	var contrato database.Contratos
	var Monto float64

	pago.FechaPago = obj.PayDate
	_,err := time.Parse("2006-01-02",pago.FechaPago)
	if err != nil {
		return "Formato de fecha de pago incorrecto"
	}

	core.Database.Find(&contrato,obj.ContractId)

	if contrato.Id != obj.ContractId {
		return "Identificador de contrato incorrecto"
	}
	
	Monto,err = strconv.ParseFloat(obj.Amount,64)

	if err != nil {
		return "Formato de monto incorrecto"
	}

	if Monto == 0 {
		return "No se puede ingresar un monto igual a 0"
	}

	pago.Anio = obj.Year
	pago.Bancoid = obj.BankId
	pago.Contratoid = obj.ContractId
	pago.Estado = core.PAGO_REALIZADO
	pago.Operacion = obj.Operation
	pago.Recibo = obj.Receipt
	pago.Monto = uint64(Monto * 100)
	pago.Cuota = 0
	pago.CuotaRef = 0
	
	ret := core.Database.Create(&pago)

	if ret.Error != nil {
		return "No se pudo crear el pago"
	}

	return ""
}