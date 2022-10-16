import GetPays from "../../services/Pagos/GetPays";

export default class GetPaysCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        var model = new GetPays();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return null
        }

        response.HeaderInfo.push({id: 'Id',label: 'Id'})
        response.HeaderInfo.push({id: 'DocumentId',label: 'Nro de Conciliacion'})
        response.HeaderInfo.push({id: 'Name',label: 'Nombre'})
        response.HeaderInfo.push({id: 'Quote',label: 'Cuota'})
        response.HeaderInfo.push({id: 'QuoteRef',label: 'Cuota segun cliente'})
        response.HeaderInfo.push({id: 'PayDate',label: 'Fecha de pago'})
        response.HeaderInfo.push({id: 'Receipt',label: 'Digitos cuenta'})
        response.HeaderInfo.push({id: 'Operation',label: 'Operacion'})
        response.HeaderInfo.push({id: 'Bank',label: 'Banco'})
        response.HeaderInfo.push({id: 'AmountFormat',label: 'Monto'})
        response.HeaderInfo.push({id: 'Period',label: 'Periodo'})
        response.HeaderInfo.push({id: 'StatusName',label: 'Estado'})

        return response
    }
}