package controllers

import "app/core/models/database"
import "app/core/models/protocol"
import "app/core/models"
import "app/core"

func CtrlDeleteUser(obj *protocol.DeleteUserClient, token *models.TokenObject) string{
	var user database.Users

	ret := core.Database.Where("id = ?",obj.UserDelete).First(&user)

	if ret.Error != nil {
		return "No existe el usuario a eliminar"
	}

	if user.Status == 2 {
		return "El usuario ya se encuentra eliminado"
	}

	user.Status = 2
	user.Userid = token.Userid

	core.Database.Save(&user)

	return ""
}