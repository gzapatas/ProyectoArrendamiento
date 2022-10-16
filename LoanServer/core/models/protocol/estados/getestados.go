package estados

import (
	"app/core/models/database"
)

type GetEstadosClient struct{
	SearchType		string
	SearchValue		string
}

func (o *GetEstadosClient) Check() string{
	if (o.SearchType != "NoFilter" && o.SearchType != "") && o.SearchValue == ""{
		return "Sin valores de busqueda"
	}
	return ""
}

type StateInfo struct{
	Id				uint64
	Type 			string
	Value 			int32
	Description		string
}

type GetEstadosServer struct{
	ResponseCode	int
	ResponseString	string
	Info			[]StateInfo
}

func (o* GetEstadosServer) AddItem(contrato database.Estados){
	item := new(StateInfo)
	
	item.Id = contrato.Id
	item.Type = contrato.Tipo
	item.Value = contrato.Valor
	item.Description = contrato.Descripcion

	o.Info = append(o.Info,*item)
}
