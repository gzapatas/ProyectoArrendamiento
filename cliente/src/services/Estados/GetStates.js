import Configuration from '../../configuration/configuration';
import axios from 'axios';

class StateInfo {
    constructor(info){
        this.Id = info.Id
        this.Type = info.Type
        this.Value = info.Value
        this.Description = info.Description
    }
}

class StateObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.Info = []
    }
}

export default class GetStates{
    async DoWork(type) {
        var obj = {};
        var ret = new StateObj();
        var authorization = sessionStorage.getItem("authorization");
        
        obj["SearchType"] = "Type";
        obj["SearchValue"] = type;

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Estados/Get",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            if (data.ResponseCode === 0 && data.Info !== null) {
                for (var info of data.Info) {
                    var state = new StateInfo(info)
                    ret.Info.push(state)
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