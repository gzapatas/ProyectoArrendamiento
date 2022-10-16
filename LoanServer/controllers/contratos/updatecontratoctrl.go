package contratos

import (
	"app/core"
	"app/core/models/database"
	ct "app/core/models/protocol/contratos"
	"app/utils"
	"fmt"
	"strconv"
	"time"
)

//Funcion para actualizar perifericos
func CtrlUpdateContrato(obj *ct.UpdateContratoClient) string{
	var contrato database.Contratos
	

	monto, err := strconv.ParseFloat(obj.Amount,64)

	if err != nil{
		return "Monto con formato incorrecto"
	}

	montoInicial, err := strconv.ParseFloat(obj.Initial,64)

	if err != nil{
		return "Monto Inicial con formato incorrecto"
	}

	montoTotal, err := strconv.ParseFloat(obj.Total,64)

	if err != nil{
		return "Monto Total con formato incorrecto"
	}

	_,err = time.Parse("2006-01-02",obj.Init)
	if err != nil {
		return "Formato de fecha inicial incorrecto"
	}

	_,err = time.Parse("2006-01-02",obj.End)
	if err != nil {
		return "Formato de fecha final incorrecto"
	}

	if obj.Status == core.CONTRATO_ANULADO {
		return "No se puede anular un contrato de esta manera"
	}

	core.Database.Find(&contrato,obj.Id)

	if obj.Id != contrato.Id {
		return "No existe el contrato a editar"
	}

	if obj.AddressId != 0{
		var nuevolote database.Lotes
		core.Database.Find(&nuevolote,obj.AddressId)

		if nuevolote.Id == 0 {
			return "Lote nuevo no encontrado"
		}

		if nuevolote.Estado == core.LOTE_ELIMINADO {
			return "No se puede asignar un lote eliminado"
		}
		
		if obj.AddressId != contrato.Idlote {
			if utils.AnyEqual(nuevolote.Estado,core.LOTE_MANTENIMIENTO,core.LOTE_OCUPADO){
				return "No se puede asignar un lote ocupado"
			} else{
				fmt.Println("HOLA CAMBIO")
				var oldLote database.Lotes

				core.Database.Find(&oldLote,contrato.Idlote)

				if oldLote.Id == 0 {
					return "Lote antiguo no encontrado"
				}

				oldLote.Estado = core.LOTE_VACIO
				ret := core.Database.Save(&oldLote)

				if ret.Error != nil {
					return "No se pudo desocupar el lote anterior"
				}

				nuevolote.Estado = core.LOTE_OCUPADO
				ret = core.Database.Save(&nuevolote)

				if ret.Error != nil {
					return "No se ocupar el lote actual"
				}
				contrato.Idlote = obj.AddressId
			}
		}
	}

	realamount := uint64(monto * 100)
	realAmountInitial := uint64(montoInicial * 100)
	realAmountTotal := uint64(montoTotal * 100)
	
	if obj.Amount != "" { contrato.Monto = realamount }
	if obj.Init != "" { contrato.Inicio = obj.Init }
	if obj.End != "" { contrato.Fin = obj.End }
	if obj.DocumentId != "" { contrato.Dni = obj.DocumentId }
	if obj.Name != "" { contrato.Nombre = obj.Name }
	if obj.Cellphone != "" { contrato.Celular = obj.Cellphone }
	if obj.Status != 0 { contrato.Estado = obj.Status }
	if obj.Quotes != 0 { contrato.Cuotas = obj.Quotes }
	if obj.Comment != "" { contrato.Comentario = obj.Comment }
	if obj.Total != "" { contrato.Total = realAmountTotal }
	if obj.Initial != "" { contrato.Inicial = realAmountInitial }
	
	ret := core.Database.Save(&contrato)

	if ret.Error != nil {
		return "No se pudo actualizar el contrato"
	}

	return ""
}