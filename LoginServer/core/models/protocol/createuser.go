package protocol

type CreateUserClient struct{
	Username 		string
	Password 		string
	Name 			string
	Lastname 		string
	Documentid 		string
	Email 			string
	Cellphone 		string
	Permissions 	string
}

func (o *CreateUserClient) Check() string{
	if o.Username == "" {
		return "Falta usuario"
	} else if o.Password == "" {
		return "Falta contraseña"
	} else if o.Name == "" {
		return "Falta el nombre"
	} else if o.Lastname == "" {
		return "Falta el apellido"
	} else if o.Documentid == "" {
		return "Falta el numero de documento"
	} else if o.Email == "" {
		return "Falta el correo"
	} else if o.Cellphone == "" {
		return "Falta el celular"
	}
	
	return ""
}

type CreateUserServer struct{
	ResponseCode	int
	ResponseString	string
}
