package database

import "time"

type Estados struct {
	Id				uint64			`gorm:"primarykey;column:estado_id"`
	Tipo			string			`gorm:"index;index:e_index1;column:estado_tipo"`
	Valor			int32			`gorm:"index:e_index1;column:estado_valor"`
	Descripcion		string			`gorm:"column:estado_descripcion"`
	CreatedAt		time.Time		`gorm:"index;column:estado_created_at"`
	UpdatedAt		time.Time		`gorm:"column:estado_updated_at"`
}

func (Estados) TableName() string {
	return "estados"
}