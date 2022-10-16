package contratos

type UpdateContratoClient struct{
	Id				uint64
	Init 			string
	End 			string
	AddressId		uint64
	DocumentId		string
	Name			string
	Cellphone		string
	Amount 			string
	Initial			string
	Total			string
	Comment			string
	Status			int32
	Quotes			int32
}

func (o *UpdateContratoClient) Check() string{
	if o.Id == 0 {
		return "Falta identificador de contrato"
	}
	
	return ""
}

type UpdateContratoServer struct{
	ResponseCode	int
	ResponseString	string
}
