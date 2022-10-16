import GetContracts from "../../services/Contratos/GetContracts";

export default class GetContractsCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        var model = new GetContracts();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return null
        }
        
        response.HeaderInfo.push({id: 'Id',label: 'Id'})
        response.HeaderInfo.push({id: 'TotalFormat',label: 'Pago Total'})
        response.HeaderInfo.push({id: 'InitialFormat',label: 'Cuota Inicial'})
        response.HeaderInfo.push({id: 'AmountFormat',label: 'Cuota Mensual'})
        response.HeaderInfo.push({id: 'Quotes',label: 'Nro de Cuotas'})
        response.HeaderInfo.push({id: 'Init',label: 'Inicio'})
        response.HeaderInfo.push({id: 'End',label: 'Fin'})
        response.HeaderInfo.push({id: 'Address',label: 'Direccion'})
        response.HeaderInfo.push({id: 'DocumentId',label: 'Nro de Conciliacion'})
        response.HeaderInfo.push({id: 'Name',label: 'Nombre'})
        response.HeaderInfo.push({id: 'Cellphone',label: 'Celular'})
        response.HeaderInfo.push({id: 'StatusName',label: 'Estado'})
        response.HeaderInfo.push({id: 'Comment',label: 'Comentario'})

        return response
    }
}