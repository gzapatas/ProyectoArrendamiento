import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { MDBDataTable, MDBBtn  } from 'mdbreact';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { CSVLink } from "react-csv";
import Button from '@material-ui/core/Button';

class DataTable extends Component {
  constructor(){
    super();
    this.state = {}
    this.csvLink = React.createRef();
  }

  exportToCSV(){
    if(this.csvLink === null) return;
    this.csvLink.current.link.click()
  }

  handleEdit(e){
    var id = e.currentTarget.getAttribute('id');
    this.props.edit(id)
  }

  handleDelete(e){
    var id = e.currentTarget.getAttribute('id');
    this.props.delete(id)
  }

  render(){
    var table = {columns: [],rows: []};
    var csv = {headers: [], data: []}
    var info = this.props.body
    var keys = this.props.header
    
    for (var key of keys){
      table.columns.push({
        label: key.label,
        field: key.id,
        sort: 'asc',
      })

      csv.headers.push({ 
        label: key.label,
        key: key.id 
      })
    }
    if(table.columns.length > 0){
      table.columns.push(
        {label: "Editar",field:'edit'},
        {label: "Borrar",field:'delete'}
      )
    }
    
    for (var value of info){
      var item = {
        'edit': <div className="text-center"><MDBBtn id = {value.Id} onClick = {(e) => this.handleEdit(e)}><EditIcon/></MDBBtn></div>,
        'delete': <div className="text-center"><MDBBtn id = {value.Id} onClick = {(e) => this.handleDelete(e)}><DeleteIcon/></MDBBtn></div>,
      }
      var csvitem = {}

      for (var key2 of keys){
        item[key2.id] = value[key2.id]
        csvitem[key2.id] = value[key2.id]
      }

      table.rows.push(item)
      csv.data.push(csvitem)
    }

    return (
      <Paper style={{padding: 8,border: "1px solid gray"}}>
        <Button variant="contained" size="middle" color="primary" style={{background:'#007840'}}
                    onClick = {() => this.exportToCSV()}> CSV </Button>
        <CSVLink data={csv.data} headers={csv.headers} ref={this.csvLink} filename={this.props.title + ".csv"} />
        <br/><br/>
        <MDBDataTable responsive bordered striped small data={table} sortable={false} searchingLabel = "Buscar"/> 
      </Paper>
    );
  }
}

export default DataTable;
