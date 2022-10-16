import Configuration from '../../configuration/configuration';
import axios from 'axios';
import Utils from '../../core/utils';

class ContractInfo {
    constructor(info){
        this.Id = info.Id
        this.Amount = info.Amount
        this.AmountFormat = Utils.numberFormat(info.Amount)
        this.Init = info.Init
        this.End = info.End
        this.AddressId = info.AddressId
        this.Address = info.Address
        this.DocumentId = info.DocumentId
        this.Name = info.Name
        this.Cellphone = info.Cellphone
        this.Status = info.Status
        this.StatusName = info.StatusName
        this.Quotes = info.Quotes
        this.Total = info.Total
        this.TotalFormat = Utils.numberFormat(info.Total)
        this.Initial = info.Initial
        this.InitialFormat = Utils.numberFormat(info.Initial)
        this.Comment = info.Comment
    }
}

class GetContractsObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.BodyInfo = []
        this.HeaderInfo = []
        this.BodyPosition = {}
    }
}

export default class GetContracts{
    async DoWork(obj) {
        var ret = new GetContractsObj();
        var authorization = sessionStorage.getItem("authorization");

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Contratos/Get",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            if (data.ResponseCode === 0 && data.Info !== null) {
                var pos = 0

                for (var info of data.Info) {
                    var contract = new ContractInfo(info)
                    ret.BodyInfo.push(contract)
                    ret.BodyPosition[contract.Id] = pos++
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