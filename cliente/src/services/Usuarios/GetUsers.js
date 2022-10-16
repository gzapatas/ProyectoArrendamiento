import Configuration from '../../configuration/configuration';
import axios from 'axios';

class UserInfo {
    constructor(info){
        this.Id = info.Id
        this.Username = info.Username
        this.Name = info.Name
        this.Lastname = info.Lastname
        this.Cellphone = info.Cellphone
        this.Documentid = info.Documentid
        this.Email = info.Email
        //this.Permissions = info.Permissions
        this.Status = info.Status
    }
}

class GetUserObj {
    constructor(){
        this.Status = 0
        this.Message = ""
        this.BodyInfo = []
        this.BodyPosition = {}
        this.HeaderInfo = []
    }
}

export default class GetUser{
    async DoWork(searchtype,searchvalue) {
        var obj = {};
        var ret = new GetUserObj();
        var authorization = sessionStorage.getItem("authorization");
        
        obj["SearchType"] = searchtype;
        obj["SearchValue"] = searchvalue;

        try {
            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                //'Access-Control-Allow-Headers': '*',
                'Authorization': 'Bearer ' + authorization,
            };

            const response = await axios.post(Configuration.API_LOGIN + "/GetUsers",JSON.stringify(obj),{ headers : headers});

            var data = response.data;

            ret.Message = data.Message != null ? data.Message : ""
            ret.Status = data.ResponseCode
            

            if (data.ResponseCode === 0 && data.Info !== null) {
                var pos = 0

                for (var info of data.Info) {
                    var user = new UserInfo(info)
                    ret.BodyInfo.push(user)
                    ret.BodyPosition[user.Id] = pos++
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