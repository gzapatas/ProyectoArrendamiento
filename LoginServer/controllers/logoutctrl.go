package controllers

import (
	"app/core/models/database"
	"app/core/models"
)

func CtrlLogout( token *models.TokenObject) (*database.Users){
	var user database.Users

	/*status := core.Database.Where("username = ? AND password = ? AND status = 1",obj.Username,obj.Password).First(&user)

	if status.Error != nil {
		return nil
	}*/

	return &user
}