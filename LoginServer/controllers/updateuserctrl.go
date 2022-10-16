package controllers

import (
	"app/core"
	"app/core/models"
	"app/core/models/database"
	"app/core/models/protocol"
)

//Funcion para actualizar perifericos
func CtrlUpdateUser(obj *protocol.UpdateUserClient, token *models.TokenObject) string{
	var user database.Users

	ret := core.Database.Where("id = ?",obj.Id).First(&user)

	if ret.Error != nil {
		return "No existe el usuario a editar"
	}

	if obj.Status != 1 && user.Status == 2 {
		return "No se puede editar un usuario eliminado"
	}

	if obj.Username != "" { user.Username = obj.Username }
	if obj.Password != "" { user.Password = obj.Password }
	if obj.Name != "" { user.Name = obj.Name }
	if obj.Lastname != "" { user.Lastname = obj.Lastname }
	if obj.Documentid != "" { user.Documentid = obj.Documentid }
	if obj.Status != 0 { user.Status = obj.Status }
	if obj.Email != "" { user.Email = obj.Email }
	if obj.Cellphone != "" { user.Cellphone = obj.Cellphone }
	if obj.Permissions != "" { user.Permissions = obj.Permissions }

	user.Userid = token.Userid
	
	core.Database.Save(&user)

	return ""
}