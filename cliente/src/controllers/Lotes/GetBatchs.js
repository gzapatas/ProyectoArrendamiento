import GetBatchs from "../../services/Lotes/GetBatchs";

export default class GetBatchsCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        var model = new GetBatchs();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return null
        }

        response.HeaderInfo.push({id: 'Id',label: 'Id'})
        response.HeaderInfo.push({id: 'Sector',label: 'Sector'})
        response.HeaderInfo.push({id: 'Block',label: 'Mz/Piso'})
        response.HeaderInfo.push({id: 'Number',label: 'Numero'})
        response.HeaderInfo.push({id: 'StatusName',label: 'Estado'})

        return response
    }
}