import DeletePay from "../../services/Pagos/DeletePay";

export default class DeletePayCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(id) {
        if(id === null || id === 0){
            this.error = "Identificador de pago incorrecto"
            return false
        }

        var model = new DeletePay();
        const response = await model.DoWork(id)        

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}