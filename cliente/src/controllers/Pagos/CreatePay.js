import CreatePay from "../../services/Pagos/CreatePay";

export default class CreatePayCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Receipt' in obj) || obj.Receipt === ""){
            this.error = "Se debe ingresar los ultimos digitos de la cuenta"
            return false
        }

        if(!('Operation' in obj) || obj.Operation === ""){
            this.error = "Se debe ingresar la operacion"
            return false
        }

        if(!('BankId' in obj) || obj.BankId === 0){
            this.error = "Se debe seleccionar el banco"
            return false
        }

        if(!('ContractId' in obj) || obj.ContractId === 0){
            this.error = "Se debe seleccionar el contrato"
            return false
        }

        if(!('Amount' in obj) || obj.Amount === ""){
            this.error = "Se debe ingresar el monto"
            return false
        }

        if(!('Quote' in obj) || obj.Quote === 0){
            this.error = "Se debe ingresar la cuota a pagar"
            return false
        }

        if(!('Year' in obj) || obj.Year === 0){
            this.error = "Se debe ingresar el año"
            return false
        }

        var model = new CreatePay();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}