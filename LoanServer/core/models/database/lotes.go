package database

import "time"

type Lotes struct {
	Id				uint64			`gorm:"primarykey;column:lote_id"`
	Sector			string			`gorm:"index:l_index1;index:l_index2;index:l_index3;index:l_index4;column:lote_sector"`
	Manzana			string			`gorm:"index:l_index1;index:l_index2;column:lote_manzana"`
	Nro				string			`gorm:"index:l_index1;column:lote_nro"`
	Estado			int32			`gorm:"index;index:l_index1;index:l_index2;index:l_index3;column:lote_estado"`
	CreatedAt		time.Time		`gorm:"index;column:lote_created_at"`
	UpdatedAt		time.Time		`gorm:"column:lote_updated_at"`
}

func (Lotes) TableName() string {
	return "lotes"
}