package database

import "time"


type GetPagos struct {
	P_Id			uint64			`gorm:"primarykey;column:pago_id"`
	P_Recibo		string			`gorm:"index;column:pago_recibo"`
	P_Operacion		string			`gorm:"column:pago_operacion"`
	P_Bancoid		uint64			`gorm:"column:pago_bancoid"`
	P_Contratoid	uint64			`gorm:"index:p_index2;index:p_index3;column:pago_contrato"`
	P_Monto			uint64			`gorm:"column:pago_monto"`
	P_Mes			uint32			`gorm:"column:pago_mes"`
	P_Cuota			uint32			`gorm:"column:pago_cuota"`
	P_CuotaRef		uint32			`gorm:"column:pago_ref_cuota"`
	P_Anio			uint32			`gorm:"index:p_index1;index:p_index2;column:pago_anio"`
	P_Estado		int32			`gorm:"index;index:p_index1;index:p_index2;index:p_index3;column:pago_estado"`
	P_CreatedAt		time.Time		`gorm:"index;column:pago_created_at"`
	P_UpdatedAt		time.Time		`gorm:"column:pago_updated_at"`
	P_FechaPago		string			`gorm:"index:p_index4;index:p_index5;column:fecha_pago"`
	C_Id			uint64			`gorm:"primarykey;column:contrato_id"`
	C_Monto			uint64			`gorm:"column:contrato_monto"`
	C_Inicio		string			`gorm:"index:c_index2;column:contrato_inicio"`
	C_Fin			string			`gorm:"index:c_index2;column:contrato_fin"`
	C_Idlote		uint64			`gorm:"index:c_index1;index:c_index2;column:contrato_idlote"`
	C_Dni			string			`gorm:"index;column:contrato_dni;"`
	C_Nombre		string			`gorm:"column:contrato_nombre"`
	C_Celular		string			`gorm:"column:contrato_celular"`
	C_Estado		int32			`gorm:"index;index:c_index1;column:contrato_estado"`
	C_CreatedAt		time.Time		`gorm:"index;column:contrato_created_at"`
	C_UpdatedAt		time.Time		`gorm:"column:contrato_updated_at"`
}