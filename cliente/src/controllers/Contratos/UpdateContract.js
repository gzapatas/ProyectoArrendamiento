import UpdateContract from "../../services/Contratos/UpdateContract";

export default class UpdateContractCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Id' in obj) || obj.Id === ""){
            this.error = "Se debe seleccionar el contrato a actualizar"
            return false
        }

        var model = new UpdateContract();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}