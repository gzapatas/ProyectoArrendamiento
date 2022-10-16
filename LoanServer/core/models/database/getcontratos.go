package database

import "time"


type GetContratos struct {
	C_Id			uint64			`gorm:"column:contrato_id"`
	C_Inicio		string			`gorm:"column:contrato_inicio"`
	C_Fin			string			`gorm:"column:contrato_fin"`
	C_Idlote		uint64			`gorm:"column:contrato_idlote"`
	C_Dni			string			`gorm:"column:contrato_dni"`
	C_Nombre		string			`gorm:"column:contrato_nombre"`
	C_Celular		string			`gorm:"column:contrato_celular"`
	C_Cuotas		int32			`gorm:"column:contrato_cuotas"`
	C_Estado		int32			`gorm:"column:contrato_estado"`
	C_Monto			uint64			`gorm:"column:contrato_monto"`
	C_Inicial		uint64			`gorm:"column:contrato_pago_inicial"`
	C_Total			uint64			`gorm:"column:contrato_pago_total"`
	C_Comentario	string			`gorm:"column:contrato_comentario"`
	C_CreatedAt		time.Time		`gorm:"column:contrato_created_at"`
	C_UpdatedAt		time.Time		`gorm:"column:contrato_updated_at"`
	L_Id			uint64			`gorm:"column:lote_id"`
	L_Sector		string			`gorm:"column:lote_sector"`
	L_Manzana		string			`gorm:"column:lote_manzana"`
	L_Nro			string			`gorm:"column:lote_nro"`
	L_Estado		int32			`gorm:"column:lote_estado"`
	L_CreatedAt		time.Time		`gorm:"column:lote_created_at"`
	L_UpdatedAt		time.Time		`gorm:"column:lote_updated_at"`
}