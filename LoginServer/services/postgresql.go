package services

import "fmt"

type ConnectionParameters struct{
	Host		string
	Port		int
	User		string
	Name		string
	Password	string
}

func GetConfiguration() string{
	cp := new(ConnectionParameters)

	cp.Host = "127.0.0.1"
	cp.Port = 5432
	cp.User = "server_user"
	cp.Name = "iot_db"
	cp.Password = "qwerty@@"

	return fmt.Sprintf("host=%s port=%d user=%s dbname=%s password=%s",cp.Host,cp.Port,cp.User,cp.Name,cp.Password)
}
