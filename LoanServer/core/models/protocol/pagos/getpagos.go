package pagos

import (
	"app/core/models/database"
	"strconv"
)

type GetPagosClient struct{
	Id				string
	Receipt			string
	ContractId		string
	Year			string
	Status			string
}

func (o *GetPagosClient) Check() string{
	return ""
}

type PayInfo struct{
	Id				uint64
	ContractId		uint64
	Receipt			string
	Operation		string
	BankId			uint64
	Bank			string
	Amount			string
	Month			uint32
	Year			uint32
	Status			int32
	StatusName		string
	DocumentId		string
	Name			string
	PayDate			string
	Quote			uint32
	QuoteRef		uint32
}

type GetPagosServer struct{
	ResponseCode	int
	ResponseString	string
	Info			[]PayInfo
}

func (o* GetPagosServer) AddItem(pago database.GetPagos, bancos map[uint64]database.Bancos,
									estados map[int32]database.Estados){
	item := new(PayInfo)

	bank := bancos[pago.P_Bancoid]
	status := estados[pago.P_Estado]
	
	item.Id = pago.P_Id
	item.ContractId = pago.C_Id
	item.Receipt = pago.P_Recibo
	item.Operation = pago.P_Operacion
	item.BankId = pago.P_Bancoid
	item.Bank = bank.Alias + " - " + bank.Nombre
	amount := float64(pago.P_Monto)/100.00
	item.Amount = strconv.FormatFloat(amount,'f',2,64)
	item.Month = pago.P_Mes
	item.Year = pago.P_Anio
	item.Status = pago.P_Estado
	item.StatusName = status.Descripcion
	item.Name = pago.C_Nombre
	item.DocumentId = pago.C_Dni
	item.PayDate = pago.P_FechaPago
	item.Quote = pago.P_Cuota
	item.QuoteRef = pago.P_CuotaRef

	o.Info = append(o.Info,*item)
}
