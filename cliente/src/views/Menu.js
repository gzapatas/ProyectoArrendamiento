import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {styles} from './Variables'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PaymentIcon from '@material-ui/icons/Payment';


class Menu extends Component {
  constructor(){
    super()
    
    this.state = {
      open:false,
    }
  }

  handleDrawerOpen(e){
    this.setState({open:true})
  };

  handleDrawerClose(e) {
    this.setState({open:false})
  };

  handleLogout(){
    sessionStorage.clear()
    sessionStorage.setItem("logged",false)
    this.props.action("logout")
  }

  handleMenuEvent(data){
    this.props.action(data)
  }

  render() {
    const { classes } = this.props;
        
    return (
      <div>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={(e) => this.handleDrawerOpen(e)}
              className={clsx(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <IconButton color= "inherit" onClick = {() => this.handleMenuEvent("inicio")}>
                Sistema de Arrendamiento
              </IconButton>
            </Typography>
            <IconButton color="inherit" onClick = {()=>this.handleLogout()}>
              <ExitToAppIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
          paper: clsx(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
          ),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
          <IconButton onClick={(e) => this.handleDrawerClose(e)}>
              <MenuOpenIcon />
          </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick = {() => this.handleMenuEvent("usuarios")}>
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItem>
            <ListItem button onClick = {() => this.handleMenuEvent("lotes")}>
              <ListItemIcon>
                <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary="Lotes" />
            </ListItem>
            <ListItem button onClick = {() => this.handleMenuEvent("contratos")}>
              <ListItemIcon>
                <AssignmentIcon/>
              </ListItemIcon>
              <ListItemText primary="Contratos" />
            </ListItem>
            <ListItem button onClick = {() => this.handleMenuEvent("pagos")}>
              <ListItemIcon>
                <PaymentIcon/>
              </ListItemIcon>
              <ListItemText primary="Pagos" />
            </ListItem>
            <ListItem button onClick = {() => this.handleMenuEvent("reportes")}>
              <ListItemIcon>
                <BarChartIcon/>
              </ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItem>
          </List>
      </Drawer>
    </div>
      
    );
  }

}

export default withStyles(styles, { withTheme: true })(Menu);