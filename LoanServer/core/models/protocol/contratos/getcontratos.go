package contratos

import (
	"app/core/models/database"
	"strconv"
)

type GetContratosClient struct{
	Sector	string
	Block	string
	Number	string
	Status 	string
}

func (o *GetContratosClient) Check() string{
	return ""
}

type ContractInfo struct{
	Id				uint64
	Init 			string
	End 			string
	AddressId		uint64
	Address			string
	DocumentId		string
	Name			string
	Cellphone		string
	Status			int32
	StatusName		string
	Quotes			int32
	Amount 			string
	Initial			string
	Total			string
	Comment			string
}

type GetContratosServer struct{
	ResponseCode	int
	ResponseString	string
	Info			[]ContractInfo
}

func (o* GetContratosServer) AddItem(contrato database.GetContratos, estados map[int32]database.Estados){
	item := new(ContractInfo)

	status := estados[contrato.C_Estado]
	
	item.Id = contrato.C_Id
	amount := float64(contrato.C_Monto)/100.00
	amountInitial := float64(contrato.C_Inicial)/100.00
	amountTotal := float64(contrato.C_Total)/100.00
	item.Amount = strconv.FormatFloat(amount,'f',2,64)
	item.Total = strconv.FormatFloat(amountTotal,'f',2,64)
	item.Initial = strconv.FormatFloat(amountInitial,'f',2,64)
	item.Init = contrato.C_Inicio
	item.End = contrato.C_Fin
	item.AddressId = contrato.C_Idlote
	item.Address = contrato.L_Sector + "-" + contrato.L_Manzana + "-" + contrato.L_Nro
	item.DocumentId = contrato.C_Dni
	item.Name = contrato.C_Nombre
	item.Cellphone = contrato.C_Celular
	item.Status = contrato.C_Estado
	item.StatusName = status.Descripcion
	item.Quotes = contrato.C_Cuotas
	
	item.Comment = contrato.C_Comentario

	o.Info = append(o.Info,*item)
}
