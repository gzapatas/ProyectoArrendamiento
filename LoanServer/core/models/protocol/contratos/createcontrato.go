package contratos

type CreateContratoClient struct{
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

func (o *CreateContratoClient) Check() string{
	if o.Amount == "" {
		return "Falta el monto de cuota"
	} else if o.Total == "" {
		return "Falta el monto total"
	} else if o.Initial == "" {
		return "Falta el monto inicial"
	} else if o.Init == "" {
		return "Falta la fecha de inicio"
	} else if o.End == "" {
		return "Falta la fecha de fin"
	} else if o.AddressId == 0 {
		return "Id de lote incorrecto"
	} else if o.DocumentId == "" {
		return "Falta el DNI"
	} else if o.Name == "" {
		return "Falta el Nombre el propietario"
	} else if o.Cellphone == "" {
		return "Falta el numero de celular"
	} else if o.Status == 0 {
		return "Estado de contrato incorrecto"
	} else if o.Quotes == 0 {
		return "Cuota incorrecta"
	}
	
	return ""
}

type CreateContratoServer struct{
	ResponseCode	int
	ResponseString	string
}
