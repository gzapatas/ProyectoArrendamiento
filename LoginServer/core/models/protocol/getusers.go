package protocol

import (
	"app/core/models/database"
)

type GetUsersClient struct{
	SearchType		string
	SearchValue		string
}

func (o *GetUsersClient) Check() string{
	if (o.SearchType != "NoFilter" && o.SearchType != "") && o.SearchValue == ""{
		return "Sin valores de busqueda"
	}
	return ""
}

type UserInfo struct{
	Id				uint64
	Username 		string
	Name 			string
	Lastname 		string
	Documentid 		string
	Email 			string
	Cellphone 		string
	Permissions 	string
	Status			int
}

type GetUsersServer struct{
	ResponseCode	int
	ResponseString	string
	Info			[]UserInfo
}

func (o* GetUsersServer) AddItem(user database.Users){
	var item UserInfo
	
	item.Id = user.Id
	item.Username = user.Username
	item.Name = user.Name
	item.Lastname = user.Lastname
	item.Documentid = user.Documentid
	item.Email = user.Email
	item.Cellphone = user.Cellphone
	item.Permissions = user.Permissions
	item.Status = user.Status

	o.Info = append(o.Info,item)
}
