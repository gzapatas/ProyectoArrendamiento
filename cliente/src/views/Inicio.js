import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {styles} from './Variables'
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Inicio extends Component {
  constructor(){
    super()
    
    this.state = {
      open:false,
    }
  }

  render() {
    var user = sessionStorage.getItem("user")
    
    return (
        <React.Fragment>
            <Title>{`Bienvenido ${user}`}</Title>
            <Divider />
            <br/>
            <Typography component='h5' variant='h6' gutterBottom>
                Sistema de control de pagos.
            </Typography>
        </React.Fragment>
    );
  }

}

export default withStyles(styles, { withTheme: true })(Inicio);