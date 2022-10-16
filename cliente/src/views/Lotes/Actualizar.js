import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UpdateBatchCtrl from "../../controllers/Lotes/UpdateBatch";
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

class Actualizar extends Component {
    constructor(){
        super();

        this.state = {
            Id: "",
            Sector: "",
            Block: "",
            Number: "",
            Status: "",
            Message: "",
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            if(this.props.visible && this.props.item !== null){

                var selected = null

                for(var value of this.props.states){
                    if(value.Value === this.props.item.Status){
                        selected = value
                    }
                }

                this.setState({
                    Id: this.props.item.Id,
                    Sector: this.props.item.Sector,
                    Block: this.props.item.Block,
                    Number: this.props.item.Number,
                    Status: selected,
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
                                <Autocomplete
                                    id="cb"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    freeSolo
                                    value={this.state.Sector}
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
                                    label="Manzana" value={this.state.Block}
                                    onChange={(e) => this.handleBlock(e)} required
                                />
                                <TextField variant="outlined" margin="normal" fullWidth
                                    label="Numero" value={this.state.Number}
                                    onChange={(e) => this.handleNumber(e)} required
                                />
                                <br/><br/>
                                <Autocomplete
                                    id="cb"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value = {this.state.Status}
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
        this.setState({Status:e});
    }

    handleClose(){
        this.props.close();
        this.setState({Sector: "",Block: "",Number: "",Message: ""})
    }

    async submitLogin(e) {
        e.preventDefault()
        var controller = new UpdateBatchCtrl();

        var ret = await controller.Execute({
            Id: this.state.Id,
            Block: this.state.Block,
            Number: this.state.Number,
            Sector: this.state.Sector,
            Status: this.state.Status.Value
        });

        if(!ret){
            this.setState({Message: controller.error});
        }
        else{
            this.props.success("Lote " + this.state.Sector + "-" + this.state.Block + "-" + this.state.Number + " se actualizo correctamente")
            this.setState({Sector: "",Block: "",Number: "",Message: ""})
        }
    }
}

export default withStyles(styles, { withTheme: true })(Actualizar);