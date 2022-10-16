import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import React, {Component} from 'react'
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DataTableInfo from '../Components/DataTableInfo';

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

class DetailDialog extends Component {
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
        
    }

    fillTable(){
        var data = this.props.data;
        if(data !== null){
            return <DataTableInfo title = "Detalle pagos" body = {this.props.data.BodyInfo}  header = {this.props.data.HeaderInfo} check = {(id) => this.hCheck(id)}/>
        }
        else{
          return <DataTableInfo body = {[]}  header = {[]}/>
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
                                {this.fillTable()}
                            </form>
                        </DialogContent>
                    </Container>
                </Dialog>
    }
    
    handleClose(){
        this.setState({Sector: "",Block: "",Number: "",Message: ""})
        this.props.close();
    }
}

export default withStyles(styles, { withTheme: true })(DetailDialog);