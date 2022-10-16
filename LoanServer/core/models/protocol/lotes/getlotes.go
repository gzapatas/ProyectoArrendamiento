package lotes

import "app/core/models/database"

type GetLotesClient struct{
	Id			string
	Sector		string
	Block		string
	Number		string
	Status		string

}

func (o *GetLotesClient) Check() string{
	return ""
}

type AddressInfo struct{
	Id				uint64
	Sector 			string
	Block 			string
	Number			string
	Status			int32
	StatusName		string
}

type GetLotesServer struct{
	ResponseCode	int
	ResponseString	string
	Info			[]AddressInfo
}

func (o* GetLotesServer) AddItem(lote database.Lotes, estados map[int32]database.Estados){
	item := new(AddressInfo)

	status := estados[lote.Estado]
	
	item.Id = lote.Id
	item.Sector = lote.Sector
	item.Block = lote.Manzana
	item.Number = lote.Nro
	item.Status = lote.Estado
	item.StatusName = status.Descripcion

	o.Info = append(o.Info,*item)
}
