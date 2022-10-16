package controllers

import (
	"app/core"
	"app/core/models"
	"app/core/models/database"
	"app/core/models/protocol"
	"app/utils"
	"fmt"
)

// Funcion para agregar dispositivos
func CtrlLogin(obj *protocol.LoginClient) (*database.Users, string) {
	var users []database.Users

	status := core.Database.Where("username = ? AND password = md5(?) AND status = 1", obj.Username, obj.Password).Find(&users)
	fmt.Println("test")

	if len(users) == 0 || status.Error != nil {
		return nil, ""
	}

	user := users[0]

	ret, data := utils.GenerateSession()

	if !ret {
		return nil, ""
	}

	user.Sessionkey = data
	status = core.Database.Save(&user)

	if status.Error != nil {
		return nil, ""
	}

	var token models.TokenObject

	token.Userid = user.Id
	token.Sessionkey = user.Sessionkey
	rawtoken := utils.CreateToken(token)

	return &user, rawtoken
}
