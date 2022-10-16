package pagos

import (
	"app/core"
	"app/core/models/database"
	pa "app/core/models/protocol/pagos"
	"fmt"
	"strconv"
	"time"
)

func CtrlUpdatePago(obj *pa.UpdatePagoClient) string{
	var pagos []database.Pagos
	var pago database.Pagos
	var contrato database.Contratos
	var Monto float64
	var err error

	core.Database.Find(&pago,obj.Id);

	if pago.Id != obj.Id {
		return "No existe el pago seleccionado"
	}

	if pago.Estado != core.PAGO_REALIZADO {
		return "El pago seleccionado se encuentra inhabilitado"
	}

	core.Database.Find(&contrato,pago.Contratoid)

	if contrato.Id != pago.Contratoid {
		return "Identificador de contrato incorrecto"
	}

	quote := obj.Quote
	// Si la cuota no es la inicial, verificar si tiene el pago mensual completo
	if quote != 0 {
		quote = pago.Cuota
		core.Database.Where("pago_contrato = ? AND pago_cuota = ? AND pago_estado = ?",
						pago.Contratoid,quote,core.PAGO_REALIZADO).Find(&pagos)
	
		Monto,err = strconv.ParseFloat(obj.Amount,64)

		if err != nil {
			Monto = 0
		}
					
		var totalamount uint64 = uint64(Monto * 100)

		for _,item := range pagos {
			if item.Id != obj.Id {
				totalamount += item.Monto
			}
		}

		if totalamount > contrato.Monto {
			var excess float64 = float64(totalamount - contrato.Monto) / 100
			var total float64 = float64(contrato.Monto) / 100
			return fmt.Sprintf("Monto %.2f con excedente de %.2f del contrato %.2f - Cuota %d",Monto, excess,total,obj.Quote)
		}
	}

	if obj.PayDate != "" {
		pago.FechaPago = obj.PayDate
		_,err := time.Parse("2006-01-02",pago.FechaPago)
		if err != nil {
			return "Formato de fecha de pago incorrecto"
		}
	}

	if obj.Year != 0 {
		pago.Anio = obj.Year
	}
	
	if obj.Quote != 0 {
		pago.Cuota = obj.Quote
	}

	pago.CuotaRef = obj.QuoteRef

	if obj.BankId != 0 {
		pago.Bancoid = obj.BankId
	}

	if obj.Operation != "" {
		pago.Operacion = obj.Operation
	}

	if obj.Receipt != "" {
		pago.Recibo = obj.Receipt
	}

	if Monto != 0 {
		pago.Monto = uint64(Monto * 100)
	}

	ret := core.Database.Save(&pago)

	if ret.Error != nil {
		return "No se pudo actualizar el pago"
	}

	return ""
}