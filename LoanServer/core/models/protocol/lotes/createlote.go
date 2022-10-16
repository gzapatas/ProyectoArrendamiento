package lotes

type CreateLoteClient struct{
	Sector 			string
	Block 			string
	Number 			string
}

func (o *CreateLoteClient) Check() string{
	if o.Sector == "" {
		return "Falta el sector"
	} else if o.Block == "" {
		return "Falta la manzana"
	} else if o.Number == "" {
		return "Falta el numero"
	}
	
	return ""
}

type CreateLoteServer struct{
	ResponseCode	int
	ResponseString	string
}
