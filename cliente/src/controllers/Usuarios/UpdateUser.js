import md5 from "md5";
import UpdateUser from "../../services/Usuarios/UpdateUser";

export default class UpdateUserCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Id' in obj)){
            this.error = "Se debe seleccionar el usuario a actualizar"
            return false
        }

        if(!('Username' in obj)){
            this.error = "Se debe ingresar el usuario"
            return false
        }

        if(!('Name' in obj)){
            this.error = "Se debe ingresar el nombre del usuario"
            return false
        }

        if(!('Lastname' in obj)){
            this.error = "Se debe ingresar el apellido del usuario"
            return false
        }

        if(!('Cellphone' in obj)){
            this.error = "Se debe ingresar el celular del usuario"
            return false
        }

        if(!('Documentid' in obj)){
            this.error = "Se debe ingresar el DNI del usuario"
            return false
        }

        if(!('Email' in obj)){
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

        var model = new UpdateUser();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}