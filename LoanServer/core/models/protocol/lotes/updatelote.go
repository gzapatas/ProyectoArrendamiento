package lotes

type UpdateLoteClient struct{
	Id				uint64
	Sector 			string
	Block 			string
	Number 			string
	Status			int32
}

func (o *UpdateLoteClient) Check() string{
	if o.Id == 0 {
		return "Falta identificador de contrato"
	}
	
	return ""
}

type UpdateLoteServer struct{
	ResponseCode	int
	ResponseString	string
}
