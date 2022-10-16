import DeleteUser from "../../services/Usuarios/DeleteUser";

export default class DeleteUserCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(id) {
        if(id === null || id === 0){
            this.error = "Identificador de usuario incorrecto"
            return false
        }

        var model = new DeleteUser();
        const response = await model.DoWork(id)        

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}