package protocol

import "app/core/models/database"
var user database.Users

type UpdateUserClient struct{
	Id				uint64
	Username 		string
	Password 		string
	Name 			string
	Lastname 		string
	Documentid 		string
	Email 			string
	Cellphone 		string
	Permissions 	string
	Status			int
}

func (o *UpdateUserClient) Check() string{
	if o.Id == 0 {
		return "Falta identificador de usuario"
	}
	
	return ""
}

type UpdateUserServer struct{
	ResponseCode	int
	ResponseString	string
}
