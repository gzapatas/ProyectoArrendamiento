package database

import "time"
import "gorm.io/gorm"

type Users struct {
	Id				uint64			`gorm:"primarykey"`
	Username		string			`gorm:"index:u_index1;index:u_index2;"`
	Password		string			`gorm:"index:u_index1;"`
	Sessionkey		string
	Name			string
	Lastname		string
	Documentid		string			`gorm:"index"`
	Status			int				`gorm:"index:u_index1;index:u_index2;"`
	Email			string
	Cellphone		string
	Permissions		string
	Userid			uint64
	CreatedAt		time.Time		`gorm:"index"`
	UpdatedAt		time.Time
	DeletedAt		gorm.DeletedAt
}

func (Users) TableName() string {
	return "users"
}