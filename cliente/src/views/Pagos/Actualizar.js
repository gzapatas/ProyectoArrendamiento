import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UpdatePayCtrl from "../../controllers/Pagos/UpdatePay";
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from 'moment';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs';

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

class Actualizar extends Component {
    constructor(){
        super();

        this.state = {
            QuoteRef: 0,
            Quote: 1,
            Id: 0,
            ContractId: "",
            Receipt: "",
            Operation: "",
            Bank: {Id:0,Name:"",Alias:""},
            Amount: "",
            PayDate: moment().toDate(),
            Month: 0,
            Year: 0,
            Message: "",
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            if(this.props.visible && this.props.item !== null){
                var selected = null
                for(var value of this.props.banks){
                    if(value.Alias + " - " + value.Name === this.props.item.Bank){
                        selected = value
                    }
                }

                const quote = typeof this.props.item.Quote != 'number' ? 0 : this.props.item.Quote
                const quoteRef = typeof this.props.item.QuoteRef != 'number' ? 0 : this.props.item.QuoteRef

                this.setState({
                    Id: this.props.item.Id,
                    ContractId: this.props.item.ContractId,
                    Receipt: this.props.item.Receipt,
                    Operation: this.props.item.Operation,
                    Bank: selected,
                    Amount: this.props.item.Amount,
                    PayDate: moment(this.props.item.PayDate,'YYYY-MM-DD').toDate(),
                    Month: this.props.item.Month,
                    Year: this.props.item.Year,
                    QuoteRef: quoteRef,
                    Quote: quote,
                });
            }
        }
    }

    render(){
        const { classes } = this.props;
        
        return  <Dialog open={this.props.visible} maxWidth="sm" fullWidth classes={{ paper: this.props.dialogWrapper }}>
                    <Container component="main" maxWidth="sm">
                        <DialogTitle className={classes.dialogTitle}>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
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
                                    value={this.state.Bank}
                                    options={this.props.banks}
                                    getOptionLabel={(option) => option.Name + " - " + option.Alias}
                                    onChange={(e,newValue) => this.handleBank(newValue)}
                                    renderInput={(params) => <TextField {...params} margin="normal" label="Banco" variant="outlined" />}
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
                                    this.state.Quote !== 0 &&
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
                                    this.state.Quote !== 0 &&
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

    handlePayDate(value) {
        this.setState({PayDate:value});
    }

    handleQuote(e) { 
        const quote = parseInt(e.target.value)
        this.setState({Quote:quote});
    }

    handleQuoteRef(e) { 
        const quote = parseInt(e.target.value)
        this.setState({QuoteRef:quote});
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

    handleMonth(newValue) {
        if(newValue == null){
            this.setState({Month: 0});
            return;
        }

        this.setState({Month: newValue.Value});
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
        this.props.close();
        this.setState({Sector: "",Block: "",Number: "",Message: ""})
    }

    async submitLogin(e) {
        e.preventDefault()
        var controller = new UpdatePayCtrl();

        var PayDate = moment(new Date(this.state.PayDate)).format('YYYY-MM-DD');

        var ret = await controller.Execute({
            Id: this.state.Id,
            Receipt: this.state.Receipt,
            Operation: this.state.Operation,
            BankId: this.state.Bank.Id,
            Amount: this.state.Amount,
            PayDate: PayDate,
            Month: parseInt(this.state.Month),
            Year: parseInt(this.state.Year),
            Quote: this.state.Quote,
            QuoteRef: this.state.QuoteRef,
        });

        if(!ret){
            this.setState({Message: controller.error});
        }
        else{
            this.props.success("Pago de operacion " + this.state.Operation + " se actualizo correctamente", this.state)
            this.setState({Message: ""})
        }
    }
}

export default withStyles(styles, { withTheme: true })(Actualizar);