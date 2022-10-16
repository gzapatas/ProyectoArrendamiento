import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {styles} from '../Variables'
import Title from '../Title';
import DataTable2 from "../Components/DataTable2"
import Divider from '@material-ui/core/Divider';
import GetPaysCtrl from '../../controllers/Pagos/GetPays'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Notification from '../Components/Notification';
import Crear from './Crear'
import Eliminar from './Eliminar'
import Actualizar from './Actualizar'
import Buscar from './Buscar'
import SearchIcon from '@material-ui/icons/Search';
import GetStates from '../../services/Estados/GetStates';
import GetBanks from '../../services/Bancos/GetBanks';

class Pagos extends Component {
  constructor(){
    super()
    
    this.state = {
      data : null,
      deleteVisible: false,
      createVisible: false,
      searchVisible: false,
      updateVisible: false,
      item: null,
      message: "",
      alert: false,
      states: null,
      banks:null,
    }

    this.hEdit = this.handlerEdit.bind(this);
    this.hDelete = this.handlerDelete.bind(this);
    this.getStates();
    this.getBanks();
  }

  handleClose(){
    this.setState({deleteVisible:false,createVisible:false,updateVisible:false,searchVisible:false,item: null});
  }

  handleCloseAlert(){
    this.setState({alert:false});
  }

  handleSuccessCreate(message,data){
    this.setState({createVisible:false,item: null, message: message, alert: true});
    this.getPagos({ContractId: data.ContractId.toString(), Status:"1"});
  }

  handleSuccessUpdate(message,data){
    console.log(data)
    this.setState({updateVisible:false,item: null, message: message, alert: true});
    this.getPagos({ContractId: data.ContractId.toString(), Status:"1"});
  }

  handleSuccessDelete(message,data){
    this.setState({deleteVisible:false,item: null, message: message, alert: true});
    this.getPagos({ContractId: data.ContractId.toString(), Status:"1"});
  }

  handleSuccessSearch(message){
    this.setState({searchVisible:false});
    this.getPagos(message)
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

  handlerSearch(){
    this.setState({searchVisible:true});
  }

  fillTable(){
    var data = this.state.data;
    if(data !== null){
      return <DataTable2 title = "Lotes" body = {data.BodyInfo}  header = {data.HeaderInfo} edit = {(id) => this.hEdit(id)} delete = {(id) => this.hDelete(id)}/>
    }
    else{
      return <DataTable2 body = {[]}  header = {[]}/>
    }
  }

  render() {
    return (
      <React.Fragment>
          <Title>Pagos</Title>
          <Divider />
          <br/>
          <Button variant="contained" size="large" color="primary" 
                  onClick = {() => this.handlerCreate()}> Crear <AddIcon/> </Button>
          &nbsp;
          <Button variant="contained" size="large" color="primary" 
                  onClick = {() => this.handlerSearch()}> Buscar <SearchIcon/> </Button>
          <br/><br/>
          { this.fillTable() }
          <Crear title = {"Crear Pago"} visible = {this.state.createVisible} item = {this.state.item} banks = {this.state.banks}
                close = {() => this.handleClose()} success = {(message,data) => this.handleSuccessCreate(message,data)}/>
          <Eliminar item = {this.state.item} title = {"Eliminar pago"} visible = {this.state.deleteVisible} 
                    close = {() => this.handleClose()}  success = {(message,data) => this.handleSuccessDelete(message,data)}/>
          <Actualizar item = {this.state.item} title = {"Actualizar pagos"} visible = {this.state.updateVisible} banks = {this.state.banks}
                      close = {() => this.handleClose()}  success = {(message,data) => this.handleSuccessUpdate(message,data)}/>
          <Buscar states = {this.state.states} title = {"Busqueda de pagos"} visible = {this.state.searchVisible} banks = {this.state.banks}
                      close = {() => this.handleClose()}  success = {(message) => this.handleSuccessSearch(message)}/>
          <Notification type = "success" close = {() => this.handleCloseAlert()} message = {this.state.message} 
                        visible = {this.state.alert}/>
      </React.Fragment>
    );
  }

  async getPagos(message) {
    var controller = new GetPaysCtrl();

    var ret = await controller.Execute(message);

    if(ret !== null){
      this.setState({data: ret});
    }
  }

  async getStates() {
    var controller = new GetStates();

    var ret = await controller.DoWork("Pago");

    if(ret !== null){
      this.setState({states: ret.Info});
    }
  }

  async getBanks() {
    var controller = new GetBanks();

    var ret = await controller.DoWork();

    if(ret !== null){
      this.setState({banks: ret.Info});
    }
  }

}

export default withStyles(styles, { withTheme: true })(Pagos);