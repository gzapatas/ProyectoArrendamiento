package protocol

type LoginClient struct{
	Username		string
	Password		string
}

func (o *LoginClient) Check() string{
	if o.Username == "" {
		return "Usuario vacio"
	} else if o.Password == "" {
		return "Contraseña vacia"
	}

	return ""
}

type LoginServer struct{
	ResponseCode	int
	ResponseString	string
	Authorization	string
	Name			string
	Lastname		string
}
