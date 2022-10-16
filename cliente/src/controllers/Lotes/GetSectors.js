import GetSectors from "../../services/Lotes/GetSectors";

export default class GetSectorsCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(obj) {
        var model = new GetSectors();
        const response = await model.DoWork(obj)

        if(response.Status !== 0){
            this.error = response.Message
            return null
        }

        return response
    }
}