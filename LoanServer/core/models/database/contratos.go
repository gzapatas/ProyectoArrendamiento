package database

import "time"

type Contratos struct {
	Id				uint64			`gorm:"primarykey;column:contrato_id"`
	Inicio			string			`gorm:"index:c_index2;column:contrato_inicio"`
	Fin				string			`gorm:"index:c_index2;column:contrato_fin"`
	Idlote			uint64			`gorm:"index:c_index1;index:c_index2;column:contrato_idlote"`
	Dni				string			`gorm:"index;column:contrato_dni;"`
	Nombre			string			`gorm:"column:contrato_nombre"`
	Cuotas			int32			`gorm:"column:contrato_cuotas"`
	Celular			string			`gorm:"column:contrato_celular"`
	Estado			int32			`gorm:"index;index:c_index1;column:contrato_estado"`
	Monto			uint64			`gorm:"column:contrato_monto"`
	Inicial			uint64			`gorm:"column:contrato_pago_inicial"`
	Total			uint64			`gorm:"column:contrato_pago_total"`
	Comentario		string			`gorm:"column:contrato_comentario"`
	CreatedAt		time.Time		`gorm:"index;column:contrato_created_at"`
	UpdatedAt		time.Time		`gorm:"column:contrato_updated_at"`
}

func (Contratos) TableName() string {
	return "contratos"
}