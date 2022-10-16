import Configuration from '../../configuration/configuration';
import axios from 'axios';
import Utils from '../../core/utils';

class PayInfo {
    constructor(info){
        this.Id = info.Id
        this.Receipt = info.Receipt
        this.ContractId = info.ContractId
        this.Operation = info.Operation
        this.BankId = info.BankId
        this.Bank = info.Bank
        this.Amount = info.Amount
        this.AmountFormat = Utils.numberFormat(info.Amount)
        this.Month = info.Month
        this.Year = info.Year
        this.Period = info.Year
        this.Status = info.Status
        this.StatusName = info.StatusName
        this.DocumentId = info.DocumentId
        this.Name = info.Name
        this.PayDate = info.PayDate
        this.Quote = info.Quote
        this.QuoteRef = info.QuoteRef

        if (info.Quote === 0){
            this.Quote = "INICIAL"
            this.QuoteRef = ""
        }
    }
}

class GetPaysObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.BodyInfo = []
        this.HeaderInfo = []
        this.BodyPosition = {}
    }
}

export default class GetPays{
    async DoWork(obj) {
        var ret = new GetPaysObj();
        var authorization = sessionStorage.getItem("authorization");

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Pagos/Get",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            if (data.ResponseCode === 0 && data.Info !== null) {
                var pos = 0

                for (var info of data.Info) {
                    var pay = new PayInfo(info)
                    ret.BodyInfo.push(pay)
                    ret.BodyPosition[pay.Id] = pos++
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