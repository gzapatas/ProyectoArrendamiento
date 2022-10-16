import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import BuscarDialog from '../Contratos/BuscarDialog';
import Button from '@material-ui/core/Button';
import CreatePayCtrl from "../../controllers/Pagos/CreatePay";
import CreatePayInitialCtrl from "../../controllers/Pagos/CreatePayInitial";
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs';
import * as moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const InitialKey = "InitialKey"
const MonthlyKey = "MonthlyKey"

class Crear extends Component {
    constructor(){
        super();

        this.state = {
            QuoteType: InitialKey,
            QuoteRef: 0,
            Quote: 1,
            Receipt: "",
            Operation: "",
            Bank:  {Id:0},
            ContractId: 0,
            Contract: "",
            Amount:"0.00",
            Year: "2021",
            searchVisible: false,
            PayDate: moment().toDate(),
            Message: ""
        }

        this.hSearch = this.handlerSearch.bind(this);
    }

    default(){
        this.setState({
            QuoteType: InitialKey,
            Receipt: "",
            Operation: "",
            Bank: {Id:0},
            Contract: "",
            ContractId: 0,
            Amount:"0.00",
            Year: "2021",
            searchVisible: false,
            PayDate: moment().toDate(),
            Message: "",
            Quote: 1,
            QuoteRef: 0,
        })
    }


    handlerSearch(item){
        var contract = item.Address + ' / ' + item.Name + ' / ' + item.Amount
        this.setState({searchVisible:false,Contract: contract,ContractId: item.Id});
    }

    render(){
        const { classes } = this.props;

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
                                <RadioGroup 
                                    row aria-label="Cuota" value={this.state.QuoteType} 
                                    onChange={(e,value) => this.handleInitialQuote(value)}>
                                    <FormControlLabel value={InitialKey} control={<Radio />} label="Cuota Inicial" />
                                    <FormControlLabel value={MonthlyKey} control={<Radio />} label="Cuota Mensual" />
                                </RadioGroup>
                                <CurrencyTextField variant="outlined" margin="normal" fullWidth
                                    label="Monto"
                                    currencySymbol="S/."
                                    outputFormat="string"
                                    autoFocus value={this.state.Amount}
                                    decimalCharacter="."
		                            digitGroupSeparator=","
                                    onChange={(e, value) => this.handleAmount(value)} 
                                    required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Digitos Cuenta" value={this.state.Receipt}
                                    onChange={(e) => this.handleReceipt(e)} required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Operacion" value={this.state.Operation}
                                    onChange={(e) => this.handleOperation(e)} required
                                />
                                <Autocomplete
                                    id="cb"
                                    variant="outlined"
                                    margin="normal"
                                    
                                    fullWidth
                                    options={this.props.banks}
                                    getOptionLabel={(option) => option.Name + " - " + option.Alias}
                                    onChange={(e,newValue) => this.handleBank(newValue)}
                                    renderInput={(params) => <TextField {...params} required margin="normal" label="Banco" variant="outlined" />}
                                />
                                <MuiPickersUtilsProvider utils={DayjsUtils} >
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="outlined" margin="normal" fullWidth
                                        format="DD/MM/YYYY" inputVariant="outlined"
                                        label="Fecha de pago" value={this.state.PayDate}
                                        onChange={(value) => this.handlePayDate(value)} required
                                        okLabel = "Aceptar"
                                        cancelLabel = "Cancelar"
                                        clearLabel = "Limpiar"
                                    />
                                </MuiPickersUtilsProvider>
                                {
                                    this.state.QuoteType === MonthlyKey && 
                                    <TextField variant="outlined" margin="normal" fullWidth
                                        label="Cuota de pago" value={this.state.Quote} type="number"
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
                                        onWheel={(e) => this.handleQuote(e)}
                                        onChange={(e) => this.handleQuote(e)} required
                                    />
                                }
                                {
                                    this.state.QuoteType === MonthlyKey && 
                                    <TextField variant="outlined" margin="normal" fullWidth
                                    label="Cuota segun el cliente" value={this.state.QuoteRef} type="number"
                                    inputProps={
                                        {
                                            style: { textAlign: 'right' },
                                            step:1,
                                            min:0,
                                            max:1000,
                                        }
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onWheel={(e) => this.handleQuoteRef(e)}
                                    onChange={(e) => this.handleQuoteRef(e)}
                                />
                                }
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Año" value={this.state.Year} type="number"
                                    inputProps={
                                        {
                                            step:1,
                                            min:2000,
                                            max:3000,
                                        }
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onWheel={(e) => this.handleYear(e)}
                                    onChange={(e) => this.handleYear(e)} required
                                />
                                <br/><br/>
                                <div>
                                    <TextField variant="filled" disabled={true} style = {{width: "85%"}} 
                                                label="Lote / Nombre / Cuota" value={this.state.Contract} required
                                    />
                                    &nbsp;
                                    <Button variant="contained" color="secondary"
                                            className={classes.button}
                                            onClick = {() => this.handlerCreateDialog()}>
                                        <SearchIcon/>
                                    </Button>
                                </div>
                                
                                <BuscarDialog visible = {this.state.searchVisible} title = {"Busqueda de contratos"} 
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

    handleCloseDialog(){
        this.setState({searchVisible:false});
    }

    handleInitialQuote(e) { 
        const quote = e
        this.setState({QuoteType:quote});
    }

    handleQuote(e) { 
        const quote = parseInt(e.target.value)
        this.setState({Quote:quote});
    }

    handleQuoteRef(e) { 
        const quote = parseInt(e.target.value)
        this.setState({QuoteRef:quote});
    }

    handlePayDate(value) {
        this.setState({PayDate:value});
    }

    handleAmount(value) {
        this.setState({Amount:value});
    }

    handleReceipt(e) {
        this.setState({Receipt:e.target.value});
    }

    handleOperation(e) {
        this.setState({Operation:e.target.value});
    }

    handleYear(e) {      
        this.setState({Year:e.target.value});
    }

    handleBank(newValue) {
        if(newValue == null){
            this.setState({Bank: {Id:0}});
            return;
        }
        
        this.setState({Bank:newValue});
    }

    handleClose(){
        this.default()
        this.props.close();
    }

    async submitLogin(e) {
        e.preventDefault()

        if (this.state.QuoteType === MonthlyKey){
            await this.submitMonthly()
        }
        else {
            await this.submitInitial()
        }
    }

    async submitMonthly(){
        var controller = new CreatePayCtrl();

        var PayDate = moment(new Date(this.state.PayDate)).format('YYYY-MM-DD');

        var ret = await controller.Execute({
            Receipt: this.state.Receipt,
            Operation: this.state.Operation,
            PayDate: PayDate,
            BankId: this.state.Bank.Id,
            ContractId: this.state.ContractId,
            Amount: this.state.Amount,
            Year: parseInt(this.state.Year),
            Quote: this.state.Quote,
            QuoteRef: this.state.QuoteRef,
        });

        if(!ret){
            this.setState({Message: controller.error});
        }
        else{
            this.props.success("Pago con operacion " + this.state.Operation + " creado correctamente", this.state)
            this.default()
        }
    }

    async submitInitial(){
        var controller = new CreatePayInitialCtrl();

        var PayDate = moment(new Date(this.state.PayDate)).format('YYYY-MM-DD');

        var ret = await controller.Execute({
            Receipt: this.state.Receipt,
            Operation: this.state.Operation,
            PayDate: PayDate,
            BankId: this.state.Bank.Id,
            ContractId: this.state.ContractId,
            Amount: this.state.Amount,
            Year: parseInt(this.state.Year),
            Quote: this.state.Quote,
            QuoteRef: this.state.QuoteRef,
        });

        if(!ret){
            this.setState({Message: controller.error});
        }
        else{
            this.props.success("Pago inicial con operacion " + this.state.Operation + " creado correctamente", this.state)
            this.default()
        }
    }
}

export default withStyles(styles, { withTheme: true })(Crear);