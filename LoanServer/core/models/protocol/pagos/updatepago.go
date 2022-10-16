package pagos


type UpdatePagoClient struct{
	Id				uint64
	Receipt			string
	Operation		string
	BankId			uint64
	Amount			string
	PayDate			string
	Quote			uint32
	QuoteRef		uint32
	Year			uint32
}

func (o *UpdatePagoClient) Check() string{
	if o.Id == 0 {
		return "Falta identificador de pago"
	}
	
	return ""
}

type UpdatePagoServer struct{
	ResponseCode	int
	ResponseString	string
}
