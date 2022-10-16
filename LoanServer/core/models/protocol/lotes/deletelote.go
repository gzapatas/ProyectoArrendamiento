package lotes

type DeleteLoteClient struct{
	Id			uint64
}

func (o *DeleteLoteClient) Check() string{
	if o.Id == 0 {
		return "Id de lote no valido"
	}
	
	return ""
}

type DeleteLoteServer struct{
	ResponseCode	int
	ResponseString	string
}
