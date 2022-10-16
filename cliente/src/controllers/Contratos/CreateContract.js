import CreateContract from "../../services/Contratos/CreateContract";

export default class CreateContractCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        if(!('Status' in obj) || obj.Status === 0){
            this.error = "Se debe ingresar el estado"
            return false
        }

        if(!('Amount' in obj) || obj.Amount === ""){
            this.error = "Se debe ingresar el monto de alquiler"
            return false
        }

        if(!('Init' in obj) || obj.Init === ""){
            this.error = "Se debe ingresar la fecha de inicio"
            return false
        }

        if(!('End' in obj) || obj.End === ""){
            this.error = "Se debe ingresar la fecha de fin"
            return false
        }

        if(!('AddressId' in obj) || obj.AddressId === ""){
            this.error = "Se debe ingresar el lote a alquilar"
            return false
        }

        if(!('DocumentId' in obj) || obj.DocumentId === ""){
            this.error = "Se debe ingresar el Nro de conciliacion"
            return false
        }

        if(!('Name' in obj) || obj.Name === ""){
            this.error = "Se debe ingresar el nombre del arrendatario"
            return false
        }

        if(!('Cellphone' in obj) || obj.Cellphone === ""){
            this.error = "Se debe ingresar el celular del arrendatario"
            return false
        }

        if(!('Quotes' in obj) || obj.Quotes === 0){
            this.error = "Se debe ingresar las cuotas del contrato"
            return false
        }
        
        var model = new CreateContract();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        return true
    }
}