import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DataTableSearch from '../Components/DataTableSearch';
import GetBatchsCtrl from '../../controllers/Lotes/GetBatchs'


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

class BuscarDialog extends Component {
    constructor(){
        super();

        this.state = {
            Sector: "",
            Block: "",
            Number: "",
            data: null,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible && this.props.visible) {
            this.getBatchs();
        }
    }

    hCheck(id){
        var body = this.state.data.BodyInfo; //LotesInfo struct
        var bodypos = this.state.data.BodyPosition;

        var selected = body[bodypos[id]];

        this.props.check(selected)
    }

    fillTable(){
        var data = this.state.data;
        if(data !== null){
          return <DataTableSearch title = "Lotes" body = {data.BodyInfo}  header = {data.HeaderInfo} check = {(id) => this.hCheck(id)}/>
        }
        else{
          return <DataTableSearch body = {[]}  header = {[]}/>
        }
      }

    render(){
        const { classes } = this.props;

        return  <Dialog open={this.props.visible} maxWidth="xl" fullWidth classes={{ paper: this.props.dialogWrapper }}>
                    <Container component="main" maxWidth="xl">
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
                                <div>
                                </div>
                                <br/><br/>
                                {this.fillTable()}
                                <br/>
                                <Typography variant="h6" component="div" style={{ flexGrow: 1 , color:"red"}}>
                                    {this.state.Message}
                                </Typography>
                                <br/>
                                <Button variant="contained" color="primary" size="large" 
                                        onClick = {() => this.getBatchs()}>
                                    Refrescar
                                </Button>
                            </form>
                        </DialogContent>
                    </Container>
                </Dialog>
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

    async getBatchs() {
        var controller = new GetBatchsCtrl();

        var ret = await controller.Execute({Status: "1"});

        if(ret !== null){
            this.setState({data: ret});
        }
    }
}

export default withStyles(styles, { withTheme: true })(BuscarDialog);