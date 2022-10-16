import Configuration from '../../configuration/configuration';
import Utils from '../../core/utils';
import axios from 'axios';

const statusOK = "AL DIA"
const statusError = "ATRAZADO"

class QuoteInfo {
    constructor(info){
        this.Amount = info.Amount
        this.Quote = info.Quote === 0 ? "INICIAL" : info.Quote
        this.Date = info.Date
        this.Year = info.Year
    }
}

class QuoteInfoObj {
    constructor(){
        this.BodyInfo = []
        this.HeaderInfo = []
    }
}

class ReportInfo {
    constructor(info){
        var Quotes = new QuoteInfoObj()

        for (var item of info.Quotes) {
            var quote = new QuoteInfo(item)
            quote.ContractName = info.ContractName
            quote.PaidQuotes = info.QuotesPaid + "/" + info.TotalQuotes
            quote.Amount = Utils.numberFormat(quote.Amount)
            Quotes.BodyInfo.push(quote)
        }
        
        Quotes.HeaderInfo.push({id: 'ContractName',label: 'Contratante'})
        Quotes.HeaderInfo.push({id: 'Amount',label: 'Monto pagado'})
        Quotes.HeaderInfo.push({id: 'Quote',label: 'Cuota de pago'})
        Quotes.HeaderInfo.push({id: 'PaidQuotes',label: 'Cuotas pagadas'})
        Quotes.HeaderInfo.push({id: 'Date',label: 'Fecha de pago'})
        Quotes.HeaderInfo.push({id: 'Year',label: 'Año'})

        this.Quotes = Quotes
        this.PaidQuotes = info.QuotesPaid + "/" + info.TotalQuotes
        this.MustPaidQuotes = info.QuotesMustBePaid + "/" + info.TotalQuotes
        this.SumMonthAmount = Utils.numberFormat(info.SumMonthAmount)
        this.SumAmountTotal = Utils.numberFormat(info.SumAmountInitial + info.SumMonthAmount)
        this.SumAmountInitial = Utils.numberFormat(info.SumAmountInitial)
        this.InitialAmount = Utils.numberFormat(info.InitialAmount)
        this.TotalAmount = Utils.numberFormat(info.TotalAmount)
        this.AmountToPay = Utils.numberFormat(info.TotalAmount - info.SumAmountInitial + info.SumMonthAmount)
        this.MonthAmount = Utils.numberFormat(info.MonthAmount)
        this.ContractStart = info.ContractStart
        this.ContractEnd = info.ContractEnd
        this.ContractName = info.ContractName
        this.Id = info.Sector + " " + info.Mz + "-" + info.Number
        this.Status = info.QuotesPaid - info.QuotesMustBePaid
        this.Comment = info.Comment

        if(this.Status >= 0){
            this.Status = statusOK
        }
        else{
            this.Status = statusError
        }
    }
}

class ReportInfoObj {
    constructor(){
        this.StatusOk = statusOK
        this.StatusError = statusError
        this.Status = 0
        this.Message = ""
        this.BodyInfo = []
        this.HeaderInfo = []
        this.BodyPosition = {}
    }
}

export default class ReportPay{
    async DoWork(obj) {
        var ret = new ReportInfoObj();
        var authorization = sessionStorage.getItem("authorization");

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Pagos/ReportPago",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            if (data.ResponseCode === 0 && data.Info !== null) {
                var pos = 0
                
                ret.BodyInfo = []
                for (var info of data.Info) {
                    var report = new ReportInfo(info)
                    ret.BodyInfo.push(report)
                    ret.BodyPosition[report.Id] = pos++
                }
            }
            
            return ret
        } catch (error) {
            ret.Message = error.message + " - Sin respuesta del servidor"
            ret.Status = 1

            return ret
        }
    }
}