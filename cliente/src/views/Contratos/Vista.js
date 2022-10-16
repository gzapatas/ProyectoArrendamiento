import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {styles} from '../Variables'
import Title from '../Title';
import DataTable2 from "../Components/DataTable2"
import Divider from '@material-ui/core/Divider';
import GetStates from '../../services/Estados/GetStates'
import GetContractsCtrl from '../../controllers/Contratos/GetContracts'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Notification from '../Components/Notification';
import Crear from './Crear'
import Eliminar from './Eliminar'
import Actualizar from './Actualizar'
import Buscar from './Buscar'
import SearchIcon from '@material-ui/icons/Search';
import GetSectorsCtrl from '../../controllers/Lotes/GetSectors';


class Contratos extends Component {
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
      sectors: null,
    }
    
    this.hEdit = this.handlerEdit.bind(this);
    this.hDelete = this.handlerDelete.bind(this);
    this.getStates();
    this.getContracts({Status:"1"});
    this.getSectors();
  }

  handleClose(){
    this.setState({deleteVisible:false,createVisible:false,updateVisible:false,searchVisible:false,item: null});
  }

  handleCloseAlert(){
    this.setState({alert:false});
  }

  handleSuccessCreate(message){
    this.setState({createVisible:false,item: null, message: message, alert: true});
    this.getContracts({Status:"1"});
  }

  handleSuccessUpdate(message){
    this.setState({updateVisible:false,item: null, message: message, alert: true});
    this.getContracts({Status:"1"});
  }

  handleSuccessDelete(message){
    this.setState({deleteVisible:false,item: null, message: message, alert: true});
    this.getContracts({Status:"1"});
  }

  handleSuccessSearch(message){
    this.setState({searchVisible:false});
    console.log(message)
    this.getContracts(message)
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
            <Title>Contratos</Title>
            <Divider />
            <br/>
            <Button variant="contained" size="large" color="primary" 
                    onClick = {() => this.handlerCreate()}> Crear <AddIcon/> </Button>
            &nbsp;
            <Button variant="contained" size="large" color="primary" 
                    onClick = {() => this.handlerSearch()}> Buscar <SearchIcon/> </Button>
            <br/><br/>
            { this.fillTable() }
            <Crear title = {"Crear contrato"} visible = {this.state.createVisible} states = {this.state.states}
                  close = {() => this.handleClose()} success = {(message) => this.handleSuccessCreate(message)}/>
            <Eliminar item = {this.state.item} title = {"Eliminar contrato"} visible = {this.state.deleteVisible} 
                      close = {() => this.handleClose()}  success = {(message) => this.handleSuccessDelete(message)}/>
            <Actualizar item = {this.state.item} title = {"Actualizar contrato"} visible = {this.state.updateVisible} 
                        states = {this.state.states}
                        close = {() => this.handleClose()}  success = {(message) => this.handleSuccessUpdate(message)}/>
            <Buscar states = {this.state.states} sectors = {this.state.sectors}
                      title = {"Busqueda de contratos"} visible = {this.state.searchVisible} 
                        close = {() => this.handleClose()}  success = {(message) => this.handleSuccessSearch(message)}/>
            <Notification type = "success" close = {() => this.handleCloseAlert()} message = {this.state.message} 
                          visible = {this.state.alert}/>
        </React.Fragment>
    );
  }

  async getContracts(message) {
    var controller = new GetContractsCtrl();

    var ret = await controller.Execute(message);

    if(ret !== null){
      this.setState({data: ret});
    }
  }

  async getStates() {
    var controller = new GetStates();

    var ret = await controller.DoWork("Contrato");

    if(ret !== null){
      this.setState({states: ret.Info});
    }
  }

  async getSectors() {
    var controller = new GetSectorsCtrl();
    
    var obj = {}
    var ret = await controller.Execute(obj);

    if(ret !== null){
      this.setState({sectors: ret.BodyInfo});
    }
  }

}

export default withStyles(styles, { withTheme: true })(Contratos);