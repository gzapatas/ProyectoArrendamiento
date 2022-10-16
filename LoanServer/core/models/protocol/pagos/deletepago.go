package pagos

type DeletePagoClient struct{
	Id			uint64
}

func (o *DeletePagoClient) Check() string{
	if o.Id == 0 {
		return "Id de pago no valido"
	}
	
	return ""
}

type DeletePagoServer struct{
	ResponseCode	int
	ResponseString	string
}
