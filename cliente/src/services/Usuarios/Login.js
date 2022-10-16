import Configuration from '../../configuration/configuration';
import axios from 'axios';

class LoginObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.Name = ""
        this.Lastname = ""
        this.Authorization = ""
    }
}

export default class LoginModel{
    async DoWork(username,password) {
        var obj = {}
        var ret = new LoginObj()
        
        obj["Username"] = username
        obj["Password"] = password

        try {
            const response = await axios.post(Configuration.API_LOGIN + "/Login",JSON.stringify(obj))

            var data = response.data

            ret.Message = data.Message
            ret.Status = data.ResponseCode
            
            if (data.ResponseCode === 0){
                ret.Name = data.Name
                ret.Lastname = data.Lastname
                ret.Authorization = data.Authorization
            }

            return ret
        } catch (error) {
            ret.Message = error.message + " - Sin respuesta del servidor"
            ret.Status = 1

            return ret
        }
    }
}