import Configuration from '../../configuration/configuration';
import axios from 'axios';

class BankInfo {
    constructor(info){
        this.Id = info.Id
        this.Name = info.Name
        this.Alias = info.Alias
    }
}

class BankObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.Info = []
    }
}

export default class GetBanks{
    async DoWork() {
        var obj = {};
        var ret = new BankObj();
        var authorization = sessionStorage.getItem("authorization");
        
        obj["SearchType"] = "NoFilter";
        obj["SearchValue"] = "";

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Bancos/Get",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            if (data.ResponseCode === 0 && data.Info !== null) {
                for (var info of data.Info) {
                    var bank = new BankInfo(info)
                    ret.Info.push(bank)
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