import React, {Component} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({

});



class MonthPicker extends Component {
    constructor(){
        super()

        this.Map = [
            { Value: "1",Description: "Enero"},
            { Value: "2",Description: "Febrero"},
            { Value: "3",Description: "Marzo"},
            { Value: "4",Description: "Abril"},
            { Value: "5",Description: "Mayo"},
            { Value: "6",Description: "Junio"},
            { Value: "7",Description: "Julio"},
            { Value: "8",Description: "Agosto"},
            { Value: "9",Description: "Septiembre"},
            { Value: "10",Description: "Octubre"},
            { Value: "11",Description: "Noviembre"},
            { Value: "12",Description: "Diciembre"},
        ]
    }

    render(){
        return  <Autocomplete
                    variant={this.props.variant}
                    margin={this.props.margin}
                    fullWidth
                    value = {this.Map[this.props.value]}
                    options={this.Map}
                    getOptionLabel={(option) => option.Description}
                    onChange={(e,newValue) => this.props.onChange(newValue)}
                    renderInput={(params) => <TextField {...params} margin={this.props.margin} required = {this.props.required} 
                    label={this.props.label} variant={this.props.variant} />}
                />
    }
}

MonthPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    variant: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    margin: PropTypes.string,
    value: PropTypes.number,
};


export default withStyles(styles, { withTheme: true })(MonthPicker);