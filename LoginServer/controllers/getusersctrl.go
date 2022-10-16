package controllers

import (
	"app/core"
	"app/core/models"
	"app/core/models/database"
	"app/core/models/protocol"
)

//Funcion para obtener dispositivos
func CtrlGetUsers(obj *protocol.GetUsersClient, token *models.TokenObject) []database.Users{
	var records []database.Users

	if obj.SearchType == "NoFilter" {
		core.Database.Order("id").Find(&records)
	} else if obj.SearchType == "" || obj.SearchValue == "" {
		core.Database.Order("id").Where("status = 1").Find(&records)
	} else if obj.SearchType == "Id" {
		core.Database.Find(&records,obj.SearchValue)
	} else if obj.SearchType == "Document" {
		core.Database.Where("documentid = ?",obj.SearchValue).Find(&records)
	}
	
	return records
}