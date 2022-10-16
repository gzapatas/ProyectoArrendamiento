import md5 from "md5";
import CreateUser from "../../services/Usuarios/CreateUser";

export default class CreateUserCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Username' in obj) || obj.Username === ""){
            this.error = "Se debe ingresar el usuario"
            return false
        }

        if(!('Password' in obj) || obj.Password === ""){
            this.error = "Se debe ingresar la contraseña"
            return false
        }

        if(!('Name' in obj) || obj.Name === ""){
            this.error = "Se debe ingresar el nombre"
            return false
        }

        if(!('Lastname' in obj) || obj.Lastname === ""){
            this.error = "Se debe ingresar el apellido"
            return false
        }

        if(!('Cellphone' in obj) || obj.Cellphone === ""){
            this.error = "Se debe ingresar el celular"
            return false
        }

        if(!('Documentid' in obj) || obj.Documentid === ""){
            this.error = "Se debe ingresar el DNI"
            return false
        }

        if(!('Email' in obj) || obj.Email === ""){
            this.error = "Se debe ingresar el correo"
            return false
        }

        if (obj.Password !== ""){
            if (obj.Password.length <= 5){
                this.error = "La contraseña debe tener al menos 6 caracteres"
                return false
            }

            obj.Password = md5(obj.Password).toLowerCase()
        }

        
        var model = new CreateUser();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}