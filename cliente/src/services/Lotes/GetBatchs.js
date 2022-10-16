import Configuration from '../../configuration/configuration';
import axios from 'axios';

class BatchInfo {
    constructor(info){
        this.Id = info.Id
        this.Sector = info.Sector
        this.Block = info.Block
        this.Number = info.Number
        this.Status = info.Status
        this.StatusName = info.StatusName
    }
}

class GetBatchsObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.BodyInfo = []
        this.HeaderInfo = []
        this.BodyPosition = {}
    }
}

export default class GetBatchs{
    async DoWork(obj) {
        var ret = new GetBatchsObj();
        var authorization = sessionStorage.getItem("authorization");

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Lotes/Get",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            if (data.ResponseCode === 0 && data.Info !== null) {
                var pos = 0

                for (var info of data.Info) {
                    var batch = new BatchInfo(info)
                    ret.BodyInfo.push(batch)
                    ret.BodyPosition[batch.Id] = pos++
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