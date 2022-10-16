import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
});

class Buscar extends Component {
    constructor(){
        super();

        this.state = {
            Sector: "",
            Block: "",
            Number: "",
            Status: "",
        }
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
                                <Autocomplete
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    freeSolo
                                    options={this.props.sectors}
                                    getOptionLabel={(option) => option}
                                    onChange={(e,newValue) => this.handleSector(newValue)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Sector" variant="outlined"
                                            value={this.state.Sector}
                                            onChange={(e) => this.handleSector(e.target.value)}
                                        />
                                    )}
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Mz/Piso" value={this.state.Block}
                                    onChange={(e) => this.handleBlock(e)}
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Numero" value={this.state.Number}
                                    onChange={(e) => this.handleNumber(e)}
                                />
                                <br/><br/>
                                <Autocomplete
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    options={this.props.states}
                                    getOptionLabel={(option) => option.Description}
                                    onChange={(e,newValue) => this.handleStatus(newValue)}
                                    renderInput={(params) => <TextField {...params} label="Estado" variant="outlined" />}
                                />
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

    handleSector(e) {
        this.setState({Sector:e});
    }

    handleBlock(e) {
        this.setState({Block:e.target.value});
    }

    handleNumber(e) {
        this.setState({Number:e.target.value});
    }

    handleStatus(e) {
        this.setState({Status:e.Value.toString()});
    }

    handleClose(){
        this.setState({Sector: "",Block: "",Number: "",Message: ""})
        this.props.close();
    }

    async submitLogin(e) {
        e.preventDefault()

        if(this.state.Status === ""){
            this.setState({Message: "Debe seleccionar al menos un estado"})
        }
        else{
            this.setState({Sector: "",Block: "",Number: "",Message: ""})
            this.props.success(this.state)
        }
    }
}

export default withStyles(styles, { withTheme: true })(Buscar);