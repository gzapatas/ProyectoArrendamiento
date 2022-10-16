package pagos

import (
	"app/core"
	"app/core/models/database"
	pa "app/core/models/protocol/pagos"
	"fmt"
	"strconv"
	"time"
)

func CtrlCreatePago(obj *pa.CreatePagoClient) string{
	var pagos []database.Pagos
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

	core.Database.Where("pago_contrato = ? AND pago_cuota = ? AND pago_estado = ?",
						obj.ContractId, obj.Quote, core.PAGO_REALIZADO).Find(&pagos)
	
	Monto,err = strconv.ParseFloat(obj.Amount,64)

	if err != nil {
		return "Formato de monto incorrecto"
	}

	if Monto == 0 {
		return "No se puede ingresar un monto igual a 0"
	}
				
	var totalamount uint64 = uint64(Monto * 100)

	for _,item := range pagos {
		totalamount += item.Monto
	}

	if totalamount > contrato.Monto {
		var excess float64 = float64(totalamount - contrato.Monto) / 100
		var total float64 = float64(contrato.Monto) / 100
		return fmt.Sprintf("Monto %.2f con excedente de %.2f del contrato %.2f - Cuota %d",Monto, excess,total,obj.Quote)
	}

	pago.Anio = obj.Year
	pago.Bancoid = obj.BankId
	pago.Contratoid = obj.ContractId
	pago.Estado = core.PAGO_REALIZADO
	pago.Operacion = obj.Operation
	pago.Recibo = obj.Receipt
	pago.Monto = uint64(Monto * 100)
	pago.Cuota = obj.Quote
	pago.CuotaRef = obj.QuoteRef
	
	ret := core.Database.Create(&pago)

	if ret.Error != nil {
		return "No se pudo crear el pago"
	}

	return ""
}