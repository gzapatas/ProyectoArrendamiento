package contratos

import (
	"app/core"
	"app/core/models/database"
	ct "app/core/models/protocol/contratos"
	"strconv"
	"time"
)

func CtrlCreateContrato(obj *ct.CreateContratoClient) string{
	var lotes []database.Lotes
	var err error

	core.Database.Find(&lotes,obj.AddressId)

	if len(lotes) == 0 {
		return "No se encontro el lote para el contrato"
	}

	lote := lotes[0]

	if lote.Estado != core.LOTE_VACIO {
		var estado database.Estados

		core.Database.Where("estado_tipo = ? AND estado_valor = ?",core.LOTE,lote.Estado).Find(&estado)

		return "El lote se encuentra " + estado.Descripcion
	}

	lote.Estado = core.LOTE_OCUPADO

	var contrato database.Contratos

	monto,err := strconv.ParseFloat(obj.Amount,64)
	if err != nil {
		return "Formato de monto incorrecto"
	}

	montoInicial,err := strconv.ParseFloat(obj.Initial,64)
	if err != nil {
		return "Formato de monto incorrecto"
	}

	montoTotal,err := strconv.ParseFloat(obj.Total,64)
	if err != nil {
		return "Formato de monto incorrecto"
	}

	if monto == 0 && obj.Status != core.CONTRATO_DONADO {
		return "No se puede ingresar un monto igual a 0. El contrato no es donado"
	}

	if monto != 0 && obj.Status == core.CONTRATO_DONADO {
		return "No se puede asignar un contrato donado con monto mayor a 0"
	}

	contrato.Monto = uint64(monto * 100)
	contrato.Inicial = uint64(montoInicial * 100)
	contrato.Total = uint64(montoTotal * 100)

	contrato.Inicio = obj.Init
	_,err = time.Parse("2006-01-02",contrato.Inicio)
	if err != nil {
		return "Formato de fecha inicial incorrecto"
	}

	contrato.Fin = obj.End
	_,err = time.Parse("2006-01-02",contrato.Fin)
	if err != nil {
		return "Formato de fecha final incorrecto"
	}

	if obj.Status != core.CONTRATO_VIGENTE && obj.Status != core.CONTRATO_DONADO {
		return "Seleccione si el contrato es donado o vigente"
	}

	contrato.Idlote = obj.AddressId
	contrato.Dni = obj.DocumentId
	contrato.Nombre = obj.Name
	contrato.Celular = obj.Cellphone
	contrato.Estado = obj.Status
	contrato.Cuotas = obj.Quotes

	contrato.Comentario = obj.Comment

	ret := core.Database.Save(&lote)

	if ret.Error != nil {
		return "No se pudo actualizar el estado del Lote"
	}

	ret = core.Database.Create(&contrato)

	if ret.Error != nil {
		return "No se pudo crear el contrato"
	}

	return ""
}