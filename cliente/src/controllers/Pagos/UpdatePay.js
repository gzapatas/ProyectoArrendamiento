import UpdatePay from "../../services/Pagos/UpdatePay";

export default class UpdatePayCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Id' in obj) || obj.Id === ""){
            this.error = "Se debe seleccionar el pago a actualizar"
            return false
        }

        var model = new UpdatePay();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}