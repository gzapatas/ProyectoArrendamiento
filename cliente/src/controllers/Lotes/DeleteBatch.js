import DeleteBatch from "../../services/Lotes/DeleteBatch";

export default class DeleteBatchCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(id) {
        if(id === null || id === 0){
            this.error = "Identificador de lote incorrecto"
            return false
        }

        var model = new DeleteBatch();
        const response = await model.DoWork(id)        

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}