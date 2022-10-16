import ReportPay from "../../services/Pagos/ReportPay";

export default class ReportPaysCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        var model = new ReportPay();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return null
        }

        response.HeaderInfo.push({id: 'Id',label: 'Propiedad'})
        response.HeaderInfo.push({id: 'ContractName',label: 'Contratante'})
        response.HeaderInfo.push({id: 'ContractStart',label: 'Inicio contrato'})
        response.HeaderInfo.push({id: 'ContractEnd',label: 'Fin contrato'})
        response.HeaderInfo.push({id: 'MonthAmount',label: 'Cuota mensual'})
        response.HeaderInfo.push({id: 'InitialAmount',label: 'Cuota inicial'})
        response.HeaderInfo.push({id: 'TotalAmount',label: 'Valor total'})
        response.HeaderInfo.push({id: 'SumAmountInitial',label: 'Total inicial pagado'})
        response.HeaderInfo.push({id: 'SumMonthAmount',label: 'Total cuotas pagado'})
        response.HeaderInfo.push({id: 'SumAmountTotal',label: 'Total pagado'})
        response.HeaderInfo.push({id: 'AmountToPay',label: 'Falta pagar'})
        response.HeaderInfo.push({id: 'PaidQuotes',label: 'Cuotas pagadas'})
        response.HeaderInfo.push({id: 'MustPaidQuotes',label: 'Cuota actual'})
        response.HeaderInfo.push({id: 'Comment',label: 'Comentario'})
        response.HeaderInfo.push({id: 'Status',label: 'Status', statusOk: response.StatusOk, statusError: response.StatusError})

        return response
    }
}