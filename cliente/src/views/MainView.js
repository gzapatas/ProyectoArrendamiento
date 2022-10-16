import React, { Component } from "react";
import Dashboard from './Dashboard'
import Login from './Login'

export default class MainView extends Component {
    constructor(){
        super()

        this.state = {
            dummy : false,
        }

        this.handler = this.handlerF.bind(this);
    }

    handlerF() {
        this.setState({dummy: false })
    }

    render(){
        var logged = sessionStorage.getItem("logged")

        if(logged === "true"){
            return <Dashboard action = {this.handler}/>
        }
        else{
            return <Login action = {this.handler} />
        }
    }
}