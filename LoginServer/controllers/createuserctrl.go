package controllers

import (
	"app/core"
	"app/core/models"
	"app/core/models/database"
	"app/core/models/protocol"
)

func CtrlCreateUser(obj *protocol.CreateUserClient, token *models.TokenObject) string{
	var users []database.Users

	core.Database.Where("username = ? AND status = 1",obj.Username).Find(&users)

	if len(users) != 0 {
		return "El usuario ya se encuentra en uso"
	}

	var user database.Users

	user.Username = obj.Username
	user.Password = obj.Password
	user.Name = obj.Name
	user.Lastname = obj.Lastname
	user.Documentid = obj.Documentid
	user.Status = 1
	user.Email = obj.Email
	user.Cellphone = obj.Cellphone
	user.Permissions = obj.Permissions
	user.Userid = token.Userid

	core.Database.Create(&user)

	return ""
}