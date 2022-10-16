import LoginModel from "../../services/Usuarios/Login";

export default class LoginCtrl{
    constructor() {
        this.error = ""
    }

    async Execute(username,password) {
        if (username === "") {
            this.error = "El campo usuario no puede estar vacio"
            return false
        }

        if (password === "") {
            this.error = "El campo contraseña no puede estar vacio"
            return false
        }

        var login = new LoginModel();
        const response = await login.DoWork(username, password)

        if(response.Status !== 0){
            this.error = response.Message
            return false
        }

        sessionStorage.setItem("logged",true)
        sessionStorage.setItem("user",response.Name + " " + response.Lastname)
        sessionStorage.setItem("authorization",response.Authorization)

        return true
    }
}