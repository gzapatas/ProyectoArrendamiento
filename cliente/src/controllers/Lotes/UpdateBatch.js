import UpdateBatch from "../../services/Lotes/UpdateBatch";

export default class UpdateBatchCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Id' in obj) || obj.Id === ""){
            this.error = "Se debe seleccionar el lote a actualizar"
            return false
        }

        var model = new UpdateBatch();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}