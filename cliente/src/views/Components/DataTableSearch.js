import React, {forwardRef,Component} from 'react';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class DataTableSearch extends Component {
  constructor(){
    super();
    this.state = {}
    this.csvLink = React.createRef();
  }

  exportToCSV(){
    if(this.csvLink === null) return;
    this.csvLink.current.link.click()
  }

  handleCheck(e){
    this.props.check(e.Id)
  }

  render(){
    var table = {columns: [],rows: []};
    var info = this.props.body
    var keys = this.props.header
    
    for (var key of keys){
      table.columns.push({
        title: key.label,
        field: key.id,
        sort: 'asc',
      })
    }
    
    for (var value of info){
      var item = {}

      for (var key2 of keys){
        item[key2.id] = value[key2.id]
      }

      table.rows.push(item)
    }

    return (
      <Paper style={{padding: 8,border: "1px solid gray"}}>
        <MaterialTable columns = {table.columns} data = {table.rows} title = {this.props.title} sort = {false}
                        icons={tableIcons}
                        options={{
                          maxBodyHeight: 500,
                          pageSize: 5,
                          pageSizeOptions: [5, 10, 20, 50],
                          showTitle: false,
                          search: true,
                          exportButton: false,
                          headerStyle: {
                            position: 'sticky', 
                            top: 0,
                            fontSize:18,
                            backgroundColor: '#5322b9',
                            color: '#FFF',
                            align: "center",
                          },
                          rowStyle: {
                            fontSize:15,
                            backgroundColor: '#FFF',
                            color: '#000',
                            align: "center",
                          },
                        }}
                        localization={{
                          header: {
                            actions: 'Acciones',
                          },
                          pagination: {
                            labelDisplayedRows: 'De {from}-{to} a {count}',
                            labelRowsSelect: 'lineas',
                            labelRowsPerPage: 'lineas por hoja:',
                            firstAriaLabel: 'Primera hoja',
                            firstTooltip: 'Primera hoja',
                            previousAriaLabel: 'Anterior hoja',
                            previousTooltip: 'Anterior hoja',
                            nextAriaLabel: 'Siguiente hoja',
                            nextTooltip: 'Siguiente hoja',
                            lastAriaLabel: 'Ultima hoja',
                            lastTooltip: 'Ultima hoja'
                          },
                          toolbar: {
                            nRowsSelected: '{0} columna(s) seleccionadas',
                            searchTooltip: 'Buscar',
                            searchPlaceholder: 'Buscar',
                            exportPDFName: 'Exportar a PDF',
                            exportCSVName: 'Exportar a CSV',
                            exportTitle: 'Exportar',
                            searchAriaLabel: 'Buscar',
                          },
                          body: {
                            emptyDataSourceMessage: 'No hay datos por mostrar',
                          }
                        }}
                        actions={[
                          {
                            icon: () => <Check/>,
                            tooltip: 'Seleccionar',
                            onClick: (event, rowData) => this.handleCheck(rowData)
                          },
                        ]}
        /> 
      </Paper>
    );
  }
}

export default DataTableSearch;
