package bancos

import (
	"app/core"
	"app/core/models/database"
	ba "app/core/models/protocol/bancos"
)

//Funcion para obtener dispositivos
func CtrlGetBancos(obj *ba.GetBancosClient) []database.Bancos{
	var records []database.Bancos

	if obj.SearchType == "NoFilter" {
		core.Database.Order("banco_id").Find(&records)
	} else if obj.SearchType == "Id" {
		core.Database.Find(&records,obj.SearchValue)
	}
	
	return records
}

func CtrlGetAllBanksByIndex() (map[uint64]database.Bancos){
	ret := make(map[uint64]database.Bancos)

	banks := CtrlGetBancos(&ba.GetBancosClient{
		SearchType: "NoFilter",
	})

	for _,bank := range(banks){
		ret[bank.Id] = bank
	}

	return ret
}