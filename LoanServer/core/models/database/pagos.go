package database

import "time"

type Pagos struct {
	Id				uint64			`gorm:"primarykey;column:pago_id"`
	Recibo			string			`gorm:"index;column:pago_recibo"`
	Operacion		string			`gorm:"column:pago_operacion"`
	Bancoid			uint64			`gorm:"column:pago_bancoid"`
	Contratoid		uint64			`gorm:"index:p_index4;index:p_index2;index:p_index3;column:pago_contrato"`
	Monto			uint64			`gorm:"column:pago_monto"`
	Anio			uint32			`gorm:"index:p_index1;index:p_index2;column:pago_anio"`
	Cuota			uint32			`gorm:"column:pago_cuota"`
	CuotaRef		uint32			`gorm:"column:pago_ref_cuota"`
	FechaPago		string			`gorm:"index:p_index4;index:p_index5;column:fecha_pago"`
	Estado			int32			`gorm:"index:p_index4;index:p_index5;index;index:p_index1;index:p_index2;index:p_index3;column:pago_estado"`
	CreatedAt		time.Time		`gorm:"index;column:pago_created_at"`
	UpdatedAt		time.Time		`gorm:"column:pago_updated_at"`
}

//`gorm:"TYPE:bigint REFERENCES contratos;index:p_index2;index:p_index3;"`

func (Pagos) TableName() string {
	return "pagos"
}