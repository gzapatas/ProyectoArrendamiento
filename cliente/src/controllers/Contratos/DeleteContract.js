import DeleteContract from "../../services/Contratos/DeleteContract";

export default class DeleteContractCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(id) {
        if(id === null || id === 0){
            this.error = "Identificador de contrato incorrecto"
            return false
        }

        var model = new DeleteContract();
        const response = await model.DoWork(id)        

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}