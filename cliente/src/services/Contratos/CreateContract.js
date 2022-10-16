import Configuration from '../../configuration/configuration';
import axios from 'axios';

class CreateContractObj {
    constructor(){
        this.Status = 0
        this.Message = ""
    }
}

export default class CreateContract{
    async DoWork(obj) {
        var ret = new CreateContractObj()
        var authorization = sessionStorage.getItem("authorization")

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            }

            const response = await axios.post(Configuration.API_LOAN + "/api/v1/Contratos/Create",JSON.stringify(obj),{ headers : headers})

            var data = response.data

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode

            return ret
        } catch (error) {
            ret.Message = error.message + " - Sin respuesta del servidor"
            ret.Status = 1

            return ret
        }
    }
}