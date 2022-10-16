import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Menu from './Menu'
import {styles} from './Variables'
import Inicio from './Inicio'
import Usuarios from './Usuarios/Vista'
import Contratos from './Contratos/Vista'
import Lotes from './Lotes/Vista'
import Pagos from './Pagos/Vista'
import Reportes from './Reportes/Vista'


class Dashboard extends Component {
  constructor(){
    super()
    this.handler = this.handlerF.bind(this);
    this.state = {
      view: "inicio"
    }
  }

  handlerF(data) {
    if(data === "logout"){
      this.setState({view:"inicio"})
      this.props.action()
    }
    else{
      this.setState({view:data})
    }
  }
  selectedTab = () => {
    switch(this.state.view){
      case "inicio":
        return <Inicio/>
      case "usuarios":
        return <Usuarios/>
      case "lotes":
        return <Lotes/>
      case "contratos":
        return <Contratos/>
      case "pagos":
        return <Pagos/>
      case "reportes":
        return <Reportes/>
      default:
        return <Inicio/>
    }
  }

  render() {
    const { classes } = this.props;
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Menu action = {(data) => this.handler(data)}/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            {this.selectedTab()}
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);