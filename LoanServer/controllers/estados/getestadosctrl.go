package estados

import (
	"app/core"
	"app/core/models/database"
	et "app/core/models/protocol/estados"
)

//Funcion para obtener dispositivos
func CtrlGetEstados(obj *et.GetEstadosClient) []database.Estados{
	var records []database.Estados

	if obj.SearchType == "NoFilter" {
		core.Database.Order("estado_id").Find(&records)
	} else if obj.SearchType == "Id" {
		core.Database.Find(&records,obj.SearchValue)
	} else if obj.SearchType == "Type" {
		core.Database.Where("estado_tipo = ?",obj.SearchValue).Find(&records)
	}
	
	return records
}

func CtrlGetStatesByIndex(tipo string) (map[int32]database.Estados){
	ret := make(map[int32]database.Estados)

	states := CtrlGetEstados(&et.GetEstadosClient{
		SearchType: "Type",
		SearchValue: tipo,
	})

	for _,state := range(states){
		ret[state.Valor] = state
	}

	return ret
}