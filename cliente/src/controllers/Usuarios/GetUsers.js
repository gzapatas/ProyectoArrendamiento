import GetUser from "../../services/Usuarios/GetUsers";

export default class GetUserCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(searchtype,searchvalue) {
        var model = new GetUser();
        const response = await model.DoWork(searchtype,searchvalue)

        if(response.Status !== 0){
            this.error = response.Message
            return null
        }

        response.HeaderInfo.push({id: 'Id',label: 'Id'})
        response.HeaderInfo.push({id: 'Username',label: 'Usuario'})
        response.HeaderInfo.push({id: 'Name',label: 'Nombre'})
        response.HeaderInfo.push({id: 'Lastname',label: 'Apellido'})
        response.HeaderInfo.push({id: 'Cellphone',label: 'Celular'})
        response.HeaderInfo.push({id: 'Documentid',label: 'DNI'})
        response.HeaderInfo.push({id: 'Email',label: 'Correo'})
        response.HeaderInfo.push({id: 'Status',label: 'Estado'})

        return response
    }
}