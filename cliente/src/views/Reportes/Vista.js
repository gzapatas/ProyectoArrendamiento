import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Title from '../Title';
import Divider from '@material-ui/core/Divider';
import DataTable3 from "../Components/DataTable3";
import ReportPayCtrl from '../../controllers/Pagos/ReportPay'
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import GetSectorsCtrl from '../../controllers/Lotes/GetSectors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DetailDialog from './DetailDialog';

const styles = theme => ({
  dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
  },
  dialogTitle: {
      paddingRight: '0px'
  },
  button: {
      height: 55,
  },
});

class Usuarios extends Component {
  constructor(){
    super()
    
    this.state = {
      detailVisible: false,
      item: null,
      data : null,
      Sector: "",
      Block: "",
      Number: "",
      sectors: [],
    }

    this.hDetail = this.handlerDetail.bind(this);

    this.getReports();
    this.getSectors();
  }

  handlerDetail(id){
    var body = this.state.data.BodyInfo; //UserInfo struct
    var bodypos = this.state.data.BodyPosition;
    this.setState({detailVisible:true,item:body[bodypos[id]].Quotes});
  }

  handleCloseDialog(){
    this.setState({detailVisible:false,item:null});
  }

  fillTable(){
    var data = this.state.data;
    if(data !== null){
      return <DataTable3 title = "ReportePago" body = {data.BodyInfo} detail = {(id) => this.hDetail(id)} header = {data.HeaderInfo} />
    }
    else{
      return <DataTable3 body = {[]}  header = {[]}/>
    }
  }
  render() {
    const { classes } = this.props;

    return (
        <React.Fragment>
            <Title>Reportes</Title>
            <Divider />
            <br/>
            <div className="box">
              <Autocomplete
                  variant="filled"
                  freeSolo
                  style = {{ width: '15%'}}
                  options={this.state.sectors}
                  getOptionLabel={(option) => option}
                  onChange={(e,newValue) => this.handleSector(newValue)}
                  renderInput={(params) => (
                      <TextField {...params} label="Sector" variant="filled"
                          value={this.state.Sector}
                          onChange={(e) => this.handleSector(e.target.value)}
                      />
                  )}
              />
              <TextField variant="filled" fullWidth
                  style = {{ width: '15%'}}
                  label="Mz/Piso" value={this.state.Block}
                  onChange={(e) => this.handleBlock(e)}
              />
              <TextField variant="filled" fullWidth
                  style = {{ width: '15%'}}
                  label="Numero" value={this.state.Number}
                  onChange={(e) => this.handleNumber(e)}
              />
              <Button variant="contained" color="primary"
                  className={classes.button}
                  onClick = {() => this.handlerSearch()}> Buscar <SearchIcon/> </Button>       
            </div>
            <DetailDialog visible = {this.state.detailVisible} title = {"Detalle de transaccion"} 
                          close = {() => this.handleCloseDialog()} data = {this.state.item}/>
            
            <br/><br/>
            { this.fillTable() }
        </React.Fragment>
    );
  }

  handleSector(e) {
    this.setState({Sector:e});
  }

  handleBlock(e) {
      this.setState({Block:e.target.value});
  }

  handleNumber(e) {
      this.setState({Number:e.target.value});
  }

  handlerSearch(){
    this.getReports();
  }

  async getReports() {
    var controller = new ReportPayCtrl();

    var ret = await controller.Execute({
      Sector: this.state.Sector,
      Block: this.state.Block,
      Number: this.state.Number
    });

    if(ret !== null){
      this.setState({data: ret});
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

export default withStyles(styles, { withTheme: true })(Usuarios);