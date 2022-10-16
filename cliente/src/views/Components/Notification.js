import { Alert } from '@material-ui/lab';
import { Snackbar, withStyles } from '@material-ui/core';
import React, {Component} from 'react';

const styles = theme => ({
    root: {
        top: theme.spacing(9)
    }
});

class Notification extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    handleClose(){
        this.props.close()
    }

    render(){
        return (
            <Snackbar
                className={this.props.root}
                open={this.props.visible}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => this.handleClose()}>
                <Alert
                    severity={this.props.type}
                    onClose={() => this.handleClose()}>
                    {this.props.message}
                </Alert>
            </Snackbar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Notification);