package core

const (
	LOTE string = "Lote"
	PAGO string = "Pago"
	CONTRATO string = "Contrato"
)

const (
	LOTE_VACIO int32 = iota + 1
	LOTE_ELIMINADO
	LOTE_OCUPADO
	LOTE_MANTENIMIENTO
)

const (
	PAGO_REALIZADO int32 = iota + 1
	PAGO_ANULADO
)

const (
	CONTRATO_VIGENTE int32 = iota + 1
	CONTRATO_DONADO
	CONTRATO_ANULADO
	CONTRATO_CONCILIACION
	CONTRATO_FINALIZADO
)