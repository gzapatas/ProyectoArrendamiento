package protocol

type DeleteUserClient struct{
	UserDelete		uint64
}

func (o *DeleteUserClient) Check() string{
	if o.UserDelete == 0 {
		return "Identificado de usuario no valido"
	}

	if o.UserDelete == 1 {
		return "No se puede eliminar al usuario maestro"
	}
	
	return ""
}

type DeleteUserServer struct{
	ResponseCode	int
	ResponseString	string
}
