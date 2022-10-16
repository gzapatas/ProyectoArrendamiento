import React, { Component } from "react";
import LoginCtrl from "../controllers/Usuarios/Login";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {
    constructor(){
        super()

        this.state = {
            password:"",
            username:"",
            message:""        
        }
    }

    render() {
        const { classes } = this.props;
        
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                    <Typography component="h1" variant="h4">
                        Ingreso
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Usuario"
                            name="username"
                            autoFocus
                            value={this.state.username}
                            onChange={(e) => this.handleUsernameChange(e)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password} 
                            onChange={(e) => this.handlePasswordChange(e)}
                        />
                        <br/>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 , color:"red"}}>
                            {this.state.message}
                        </Typography>
                        <br/>
                        <Button type="submit" size = "large" fullWidth variant="contained" color="primary" onClick={(e) => this.submitLogin(e)}>
                            Ingresar
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }

    handleUsernameChange(e) {
        this.setState({username:e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password:e.target.value})
    }

    async submitLogin(e) {
        e.preventDefault()
        var controller = new LoginCtrl();

        var ret = await controller.Execute(this.state.username,this.state.password)

        if (!ret){
            this.setState({password:"", message:controller.error})
        }
        else {
            this.setState({username:"",password:"",message:""})
            this.props.action()
        }
    }
}

export default withStyles(styles, { withTheme: true })(Login);