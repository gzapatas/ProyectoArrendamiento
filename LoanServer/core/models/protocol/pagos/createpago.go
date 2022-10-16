package pagos


type CreatePagoClient struct{
	Receipt			string
	Operation		string
	BankId			uint64
	ContractId		uint64
	Amount			string
	PayDate			string
	Year			uint32
	Quote			uint32
	QuoteRef		uint32
}

func (o *CreatePagoClient) Check() string{
	if o.Receipt == "" {
		return "Numero de recibo vacio"
	} else if o.Operation == "" {
		return "Numero de operacion vacio"
	} else if o.BankId == 0 {
		return "Id de banco incorrecto"
	} else if o.Amount == "" {
		return "No se ingreso el monto"
	} else if o.Year < 1900 || o.Year > 2100 {
		return "Se ha ingresado un año incorrecto"
	} else if o.ContractId == 0 {
		return "Id de contrato incorrecto"
	} else if o.PayDate == "" {
		return "No se ingreso la fecha de pago"
	} else if o.Quote == 0 {
		return "No se ingreso la cuota a pagar"
	}
	
	return ""
}

type CreatePagoServer struct{
	ResponseCode	int
	ResponseString	string
}
