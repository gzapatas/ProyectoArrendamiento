package contratos

type DeleteContratoClient struct{
	Id			uint64
}

func (o *DeleteContratoClient) Check() string{
	if o.Id == 0 {
		return "Id de lote no valido"
	}
	
	return ""
}

type DeleteContratoServer struct{
	ResponseCode	int
	ResponseString	string
}
