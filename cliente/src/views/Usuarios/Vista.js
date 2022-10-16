import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {styles} from '../Variables'
import Title from '../Title';
import Divider from '@material-ui/core/Divider';
import GetUserCtrl from "../../controllers/Usuarios/GetUsers";
import DataTable2 from "../Components/DataTable2"
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Crear from './Crear'
import Eliminar from './Eliminar'
import Actualizar from './Actualizar'
import Notification from '../Components/Notification';


class Usuarios extends Component {
  constructor(){
    super();
    
    this.state = {
      data : null,
      deleteVisible: false,
      createVisible: false,
      updateVisible: false,
      item: null,
      message: "",
      alert: false,
    };

    this.hEdit = this.handlerEdit.bind(this);
    this.hDelete = this.handlerDelete.bind(this);

    this.getUsers();
  }

  handleClose(){
    this.setState({deleteVisible:false,createVisible:false,updateVisible:false,item: null});
  }

  handleCloseAlert(){
    this.setState({alert:false});
  }

  handleSuccessCreate(message){
    this.setState({createVisible:false,item: null, message: message, alert: true});
    this.getUsers()
  }

  handleSuccessUpdate(message){
    this.setState({updateVisible:false,item: null, message: message, alert: true});
    this.getUsers()
  }

  handleSuccessDelete(message){
    this.setState({deleteVisible:false,item: null, message: message, alert: true});
    this.getUsers()
  }

  handlerEdit(id){
    var body = this.state.data.BodyInfo; //UserInfo struct
    var bodypos = this.state.data.BodyPosition;

    this.setState({updateVisible:true,item:body[bodypos[id]]});
  }

  handlerDelete(id){
    var body = this.state.data.BodyInfo; //UserInfo struct
    var bodypos = this.state.data.BodyPosition;

    this.setState({deleteVisible:true,item:body[bodypos[id]]});
  }

  handlerCreate(){
    this.setState({createVisible:true});
  }

  fillTable(){
    var data = this.state.data;
    if(data !== null){
      return <DataTable2 title = "Usuarios" body = {data.BodyInfo}  header = {data.HeaderInfo} edit = {(id) => this.hEdit(id)} delete = {(id) => this.hDelete(id)}/>
    }
    else{
      return <DataTable2 body = {[]}  header = {[]}/>
    }
  }

  render() {
    return (
        <React.Fragment>
            <Title>Usuarios <AccountCircleIcon/></Title>
            <Divider />
            <br/>
            <Button variant="contained" size="large" color="primary" onClick = {() => this.handlerCreate()}> Crear <AddIcon/> </Button>
            <br/><br/>
            { this.fillTable() }
            <Crear title = {"Crear usuario"} visible = {this.state.createVisible} 
                  close = {() => this.handleClose()} success = {(message) => this.handleSuccessCreate(message)}/>
            <Eliminar item = {this.state.item} title = {"Eliminar usuario"} visible = {this.state.deleteVisible} 
                      close = {() => this.handleClose()}  success = {(message) => this.handleSuccessDelete(message)}/>
            <Actualizar item = {this.state.item} title = {"Actualizar usuario"} visible = {this.state.updateVisible} 
                        close = {() => this.handleClose()}  success = {(message) => this.handleSuccessUpdate(message)}/>
            <Notification type = "success" close = {() => this.handleCloseAlert()} message = {this.state.message} 
                          visible = {this.state.alert}/>
        </React.Fragment>
    );
  }

  async getUsers() {
    var controller = new GetUserCtrl();

    var ret = await controller.Execute("","");

    if(ret !== null){
      this.setState({data: ret});
    }
  }

}

export default withStyles(styles, { withTheme: true })(Usuarios);