import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteBatchCtrl from "../../controllers/Lotes/DeleteBatch";


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

class Eliminar extends Component {
    constructor(){
        super();
        
        this.state = {
            Message: ""
        }
    }

    getMessage(){
        if(this.props.item === null){
            return ""
        }
        
        return "¿Esta seguro que desea eliminar el lote " + this.props.item.Sector + "-" + this.props.item.Block + "-" + this.props.item.Number + "?"
    }

    render(){
        const { classes } = this.props;

        return  <Dialog open={this.props.visible} maxWidth="sm" fullWidth classes={{ paper: this.props.dialogWrapper }}>
                    <Container component="main" maxWidth="sm">
                        <DialogTitle className={classes.dialogTitle}>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
                                    {this.props.title}
                                </Typography>
                            </div>
                        </DialogTitle>
                        <DialogContent dividers>
                            <form>
                                <Typography display="inline" variant="h6" style={{ flexGrow: 1 }}>
                                    {this.getMessage()}
                                </Typography>
                                <br/>
                                <Typography variant="h6" component="div" style={{ flexGrow: 1 , color:"red"}}>
                                    {this.state.Message}
                                </Typography>
                                <br/>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="primary" size="large" 
                                                onClick = {(e) => this.submitAction(e)}>
                                            Aceptar
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button type="submit" variant="contained" color="secondary" size="large" 
                                                onClick = {() => this.handleClose()}>
                                            Cancelar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </DialogContent>
                    </Container>
                </Dialog>
    }

    handleClose(){
        this.props.close();
        this.setState({Message: ""})
    }

    async submitAction(e) {
        e.preventDefault()
        var controller = new DeleteBatchCtrl();

        var ret = await controller.Execute(this.props.item.Id);

        if(!ret){
            this.setState({Message: controller.error});
        }
        else{ 
            this.setState({Message: ""})
            this.props.success("Lote " + this.props.item.Sector + "-" + this.props.item.Block + "-" + this.props.item.Number + " fue eliminado correctamente")
        }
    }
}

export default withStyles(styles, { withTheme: true })(Eliminar);