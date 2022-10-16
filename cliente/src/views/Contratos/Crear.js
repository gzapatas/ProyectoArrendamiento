import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import BuscarDialog from '../Lotes/BuscarDialog';
import Button from '@material-ui/core/Button';
import CreateContractCtrl from "../../controllers/Contratos/CreateContract";
import * as moment from 'moment';
import DayJsUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from '@material-ui/lab';


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

class Crear extends Component {
    constructor(){
        super();

        this.state = {
            Quotes: 1,
            Status: 1,
            Comment: "",
            Amount: "0.00",
            AmountTotal: "0.00",
            AmountInitial: "0.00",
            Init: moment().toDate(),
            End: moment().toDate(),
            AddressId: "",
            Address:"",
            DocumentId: "",
            Name: "",
            Cellphone: "",
            Message: "",
            searchVisible: false,
        }

        this.hSearch = this.handlerSearch.bind(this);
    }

    default(){
        this.setState({
            Status: 0,
            Amount: "0.00",
            Init: moment().toDate(),
            End: moment().toDate(),
            Address: "",
            AddressId: "",
            DocumentId: "",
            Name: "",
            Cellphone: "",
            Message: "",
            searchVisible:false,
        })
    }

    handlerSearch(item){
        var address = item.Sector + '-' + item.Block + '-' + item.Number
        this.setState({searchVisible:false,Address: address,AddressId: item.Id});
    }

    render(){
        const { classes } = this.props;

        var States = this.props.states

        if (States != null && States.length >= 2) { 
            States = States.slice(0,2)
        }

        return  <Dialog open={this.props.visible} maxWidth="sm" fullWidth classes={{ paper: this.props.dialogWrapper }}>
                    <Container component="main" maxWidth="sm">
                        <DialogTitle className={classes.dialogTitle}>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h5" color = "primary" component="div" style={{ flexGrow: 1 }}>
                                    {this.props.title}
                                </Typography>
                                <Button style = {{minHeight: 20,minWidth: 20}} variant="contained" 
                                        color="primary" size="small" onClick = {() => this.handleClose()}>
                                    <CloseIcon />
                                </Button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                
                            </div>
                        </DialogTitle>
                        <DialogContent dividers>
                            <form>
                                <Autocomplete
                                    id="cb"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    options={States}
                                    getOptionLabel={(option) => option.Description}
                                    onChange={(e,newValue) => this.handleStatus(newValue)}
                                    renderInput={(params) => <TextField {...params} label="Estado" variant="outlined" />}
                                />
                                <CurrencyTextField variant="outlined" margin="normal" fullWidth
                                    label="Pago Total"
                                    currencySymbol="S/."
                                    outputFormat="string"
                                    autoFocus value={this.state.AmountTotal}
                                    decimalCharacter="."
		                            digitGroupSeparator=","
                                    onChange={(e, value) => this.handleAmountTotal(value)} 
                                    required
                                />
                                <CurrencyTextField variant="outlined" margin="normal" fullWidth
                                    label="Cuota Inicial"
                                    currencySymbol="S/."
                                    outputFormat="string"
                                    autoFocus value={this.state.AmountInitial}
                                    decimalCharacter="."
		                            digitGroupSeparator=","
                                    onChange={(e, value) => this.handleAmountInitial(value)} 
                                    required
                                />
                                <CurrencyTextField variant="outlined" margin="normal" fullWidth
                                    label="Cuota Mensual"
                                    currencySymbol="S/."
                                    outputFormat="string"
                                    autoFocus value={this.state.Amount}
                                    decimalCharacter="."
		                            digitGroupSeparator=","
                                    onChange={(e, value) => this.handleAmount(value)} 
                                    required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Cantidad de cuotas" value={this.state.Quotes} type="number"
                                    inputProps={
                                        {
                                            style: { textAlign: 'right' },
                                            step:1,
                                            min:1,
                                            max:1000,
                                        }
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onWheel={(e) => this.handleQuotes(e)}
                                    onChange={(e) => this.handleQuotes(e)} required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Comentario" value={this.state.Comment}
                                    onChange={(e) => this.handleComment(e)} required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Nombre" value={this.state.Name}
                                    onChange={(e) => this.handleName(e)} required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Nro de Conciliacion" value={this.state.DocumentId}
                                    onChange={(e) => this.handleDocumentid(e)} required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Celular" value={this.state.Cellphone}
                                    onChange={(e) => this.handleCellphone(e)} required
                                />
                                <MuiPickersUtilsProvider utils={DayJsUtils} >
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="outlined" margin="normal" fullWidth
                                        format="DD/MM/YYYY" inputVariant="outlined"
                                        label="Fecha Inicial" value={this.state.Init}
                                        onChange={(value) => this.handleInit(value)} required
                                        okLabel = "Aceptar"
                                        cancelLabel = "Cancelar"
                                        clearLabel = "Limpiar"
                                    />
                                    <KeyboardDatePicker 
                                        variant="outlined" margin="normal" fullWidth
                                        format="DD/MM/YYYY" inputVariant="outlined"
                                        label="Fecha Final" value={this.state.End}
                                        onChange={(value) => this.handleEnd(value)} required
                                    />
                                </MuiPickersUtilsProvider>
                                <div>
                                    <TextField variant="filled" disabled={true} style = {{width: "85%"}} 
                                                label="Lote" value={this.state.Address}
                                    />
                                    &nbsp;
                                    <Button variant="contained" color="secondary"
                                            className={classes.button}
                                            onClick = {() => this.handlerCreateDialog()}>
                                        <SearchIcon/>
                                    </Button>
                                </div>
                                <BuscarDialog visible = {this.state.searchVisible} title = {"Busqueda de lotes"} 
                                            close = {() => this.handleCloseDialog()}
                                            check = {(id) => this.hSearch(id)}/>
                                <br/>
                                <Typography variant="h6" component="div" style={{ flexGrow: 1 , color:"red"}}>
                                    {this.state.Message}
                                </Typography>
                                <br/>
                                <Button type="submit" variant="contained" color="primary" size="large" 
                                        style = {{height: 55, width: "40%"}} 
                                        onClick = {(e) => this.submitLogin(e)}>
                                    Aceptar
                                </Button>
                                <br/><br/>
                            </form>
                        </DialogContent>
                    </Container>
                </Dialog>
    }

    handlerCreateDialog(){
        this.setState({searchVisible:true});
    }

    handleQuotes(e) { 
        const quotes = parseInt(e.target.value)
        this.setState({Quotes:quotes});
    }

    handleCloseDialog(){
        this.setState({searchVisible:false});
    }

    handleStatus(e) {
        this.setState({Status:e});
    }

    handleAmountTotal(value) {
        this.setState({AmountTotal:value});
    }

    handleAmountInitial(value) {
        this.setState({AmountInitial:value});
    }

    handleAmount(value) {
        this.setState({Amount:value});
    }

    handleInit(value) {
        this.setState({Init:value});
    }

    handleEnd(value) {
        this.setState({End:value});
    }

    handleDocumentid(e) {
        this.setState({DocumentId:e.target.value});
    }

    handleName(e) {
        this.setState({Name:e.target.value});
    }

    handleComment(e) {
        this.setState({Comment:e.target.value});
    }

    handleCellphone(e) {
        this.setState({Cellphone:e.target.value});
    }

    handleClose(){
        this.setState({Sector: "",Block: "",Number: "",Message: ""})
        this.props.close();
    }

    async submitLogin(e) {
        e.preventDefault()
        var controller = new CreateContractCtrl();

        var InitDate = moment(new Date(this.state.Init)).format('YYYY-MM-DD');
        var FinalDate = moment(new Date(this.state.End)).format('YYYY-MM-DD');

        var ret = await controller.Execute({
            Amount: this.state.Amount,
            Init: InitDate,
            End: FinalDate,
            AddressId: this.state.AddressId,
            DocumentId: this.state.DocumentId,
            Name: this.state.Name,
            Cellphone: this.state.Cellphone,
            Status: this.state.Status.Value,
            Quotes: this.state.Quotes,
            Comment: this.state.Comment,
            Initial: this.state.AmountInitial,
            Total: this.state.AmountTotal,
        });

        if(!ret){
            this.setState({Message: controller.error});
        }
        else{
            this.props.success("Contrato para " + this.state.Name + " creado correctamente")
            this.default()
        }
    }
}

export default withStyles(styles, { withTheme: true })(Crear);