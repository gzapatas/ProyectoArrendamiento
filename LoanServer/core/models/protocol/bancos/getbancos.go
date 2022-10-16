package bancos

import "app/core/models/database"

type GetBancosClient struct{
	SearchType		string
	SearchValue		string
}

func (o *GetBancosClient) Check() string{
	if (o.SearchType != "NoFilter" && o.SearchType != "") && o.SearchValue == ""{
		return "Sin valores de busqueda"
	}
	return ""
}

type BankInfo struct{
	Id				uint64
	Name 			string
	Alias 			string
}

type GetBancosServer struct{
	ResponseCode	int
	ResponseString	string
	Info			[]BankInfo
}

func (o* GetBancosServer) AddItem(banco database.Bancos){
	item := new(BankInfo)
	
	item.Id = banco.Id
	item.Name = banco.Nombre
	item.Alias = banco.Alias

	o.Info = append(o.Info,*item)
}
