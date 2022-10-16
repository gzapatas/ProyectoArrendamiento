import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import BuscarDialog from '../Contratos/BuscarDialog';

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

class Buscar extends Component {
    constructor(){
        super();

        this.state = {
            Receipt: "",
            Year: "",
            ContractId: "",
            Contract: "",
            DocumentId: "",
            Status: "",
            Message: "",
            searchVisible: false
        }

        this.hSearch = this.handlerSearch.bind(this);
    }

    default(){
        this.setState({
            Receipt: "",
            Year: "",
            ContractId: "",
            Contract: "",
            DocumentId: "",
            Status: "",
            Message: "",
            searchVisible: false
        })
    }

    handlerSearch(item){
        var contract = item.Address + ' / ' + item.Name + ' / ' + item.Amount
        this.setState({searchVisible:false,Contract: contract,ContractId: item.Id});
    }

    render(){
        const { classes } = this.props;

        var States = this.props.states

        if (States != null && States.length >= 1) { 
            States = States.slice(0,1)
        }

        return  <Dialog open={this.props.visible} maxWidth="sm" fullWidth classes={{ paper: this.props.dialogWrapper }}>
                    <Container component="main" maxWidth="sm">
                        <DialogTitle className={classes.dialogTitle}>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h5" color = "primary" component="div" style={{ flexGrow: 1 }}>
                                    {this.props.title}
                                </Typography>
                                &nbsp;
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
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Digitos Cuenta" autoFocus value={this.state.Receipt}
                                    onChange={(e) => this.handleReceipt(e)}
                                />
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
                                    onChange={(e) => this.handleYear(e)}
                                />
                                <Autocomplete
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    options={States}
                                    getOptionLabel={(option) => option.Description}
                                    onChange={(e,newValue) => this.handleStatus(newValue)}
                                    renderInput={(params) => <TextField  margin="normal" {...params} label="Estado" variant="outlined" />}
                                />
                                <br/>
                                <div>
                                    <TextField variant="filled" disabled={true} style = {{width: "85%"}} 
                                                label="Lote / Nombre / Cuota" value={this.state.Contract}
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

    handleReceipt(e) {
        this.setState({Receipt:e.target.value});
    }

    handleStatus(e) {
        if(e === null){
            this.setState({Status:""});
            return
        }
        this.setState({Status:e.Value.toString()});
    }

    handleYear(e) {      
        this.setState({Year:e.target.value});
    }

    handleClose(){
        this.default()
        this.props.close();
    }

    async submitLogin(e) {
        e.preventDefault()

        if(this.state.Status === ""){
            this.setState({Message: "Debe seleccionar al menos un estado"})
        }
        else{
            this.props.success({
                Receipt: this.state.Receipt,
                ContractId: this.state.ContractId.toString(),
                Year: this.state.Year.toString(),
                Status: this.state.Status
            })
            this.default()

        }
    }
}

export default withStyles(styles, { withTheme: true })(Buscar);