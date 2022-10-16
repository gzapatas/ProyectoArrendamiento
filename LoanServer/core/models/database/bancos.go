package database

import "time"

type Bancos struct {
	Id				uint64			`gorm:"primarykey;column:banco_id"`
	Nombre			string			`gorm:"column:banco_nombre"`
	Alias			string			`gorm:"column:banco_alias"`
	CreatedAt		time.Time		`gorm:"index;column:banco_created_at"`
	UpdatedAt		time.Time		`gorm:"column:banco_updated_at"`
}

func (Bancos) TableName() string {
	return "bancos"
}