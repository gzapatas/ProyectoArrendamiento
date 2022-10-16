import Configuration from '../../configuration/configuration';
import axios from 'axios';

class GetSectorssObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.BodyInfo = []
    }
}

export default class GetSectors{
    async DoWork(obj) {
        var ret = new GetSectorssObj();
        var authorization = sessionStorage.getItem("authorization");

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Lotes/GetSectors",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            if (data.ResponseCode === 0 && data.Info !== null) {
                for (var info of data.Info) {
                    ret.BodyInfo.push(info)
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