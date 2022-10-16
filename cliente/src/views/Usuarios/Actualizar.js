import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UpdateUserCtrl from "../../controllers/Usuarios/UpdateUser";

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
            Username: "",
            Password: "",
            Name: "",
            Lastname: "",
            Cellphone: "",
            Documentid: "",
            Email: "",
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            if(this.props.visible && this.props.item !== null){
                this.setState({
                    Id: this.props.item.Id,
                    Username: this.props.item.Username,
                    Password: "",
                    Name: this.props.item.Name,
                    Lastname: this.props.item.Lastname,
                    Cellphone: this.props.item.Cellphone,
                    Documentid: this.props.item.Documentid,
                    Email: this.props.item.Email,
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
                                <TextField variant="outlined" margin="normal" required fullWidth
                                    label="Usuario" autoFocus value={this.state.Username}
                                    onChange={(e) => this.handleUsername(e)}
                                />
                                <TextField variant="outlined" margin="normal" required fullWidth
                                    label="Contraseña" value={this.state.Password} type="password"
                                    onChange={(e) => this.handlePassword(e)}
                                />
                                <TextField variant="outlined" margin="normal" required fullWidth
                                    label="Nombres" value={this.state.Name}
                                    onChange={(e) => this.handleName(e)}
                                />
                                <TextField variant="outlined" margin="normal" required fullWidth
                                    label="Apellidos" value={this.state.Lastname}
                                    onChange={(e) => this.handleLastname(e)}
                                />
                                <TextField variant="outlined" margin="normal" required fullWidth
                                    label="Celular" value={this.state.Cellphone}
                                    onChange={(e) => this.handleCellphone(e)}
                                />
                                <TextField variant="outlined" margin="normal" required fullWidth
                                    label="DNI" value={this.state.Documentid}
                                    onChange={(e) => this.handleDocumentid(e)}
                                />
                                <TextField variant="outlined" margin="normal" required fullWidth
                                    label="Correo" value={this.state.Email}
                                    onChange={(e) => this.handleEmail(e)}
                                />
                                <br/>
                                <Typography variant="h6" component="div" style={{ flexGrow: 1 , color:"red"}}>
                                    {this.state.Message}
                                </Typography>
                                <br/>
                                <Button type="submit" variant="contained" color="primary" size="large" 
                                        onClick = {(e) => this.submitLogin(e)}>
                                    Aceptar
                                </Button>
                            </form>
                        </DialogContent>
                    </Container>
                </Dialog>
    }

    handleUsername(e) {
        this.setState({Username:e.target.value});
    }

    handlePassword(e) {
        this.setState({Password:e.target.value});
    }

    handleName(e) {
        this.setState({Name:e.target.value});
    }

    handleLastname(e) {
        this.setState({Lastname:e.target.value});
    }

    handleCellphone(e) {
        this.setState({Cellphone:e.target.value});
    }

    handleDocumentid(e) {
        this.setState({Documentid:e.target.value});
    }

    handleEmail(e) {
        this.setState({Email:e.target.value});
    }

    handleClose(){
        this.props.close();
    }

    async submitLogin(e) {
        e.preventDefault()
        var controller = new UpdateUserCtrl();

        var ret = await controller.Execute(this.state);

        if(!ret){
            this.setState({Message: controller.error});
        }
        else{
            this.setState({Message: ""})
            this.props.success("Usuario " + this.state.Username + " se actualizo correctamente")
        }
    }
}

export default withStyles(styles, { withTheme: true })(Actualizar);