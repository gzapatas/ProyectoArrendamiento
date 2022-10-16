import CreateBatch from "../../services/Lotes/CreateBatch";

export default class CreateBatchCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Sector' in obj) || obj.Sector === ""){
            this.error = "Se debe ingresar el sector"
            return false
        }

        if(!('Block' in obj) || obj.Block === ""){
            this.error = "Se debe ingresar el bloque"
            return false
        }

        if(!('Number' in obj) || obj.Number === ""){
            this.error = "Se debe ingresar el numero"
            return false
        }

        var model = new CreateBatch();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}