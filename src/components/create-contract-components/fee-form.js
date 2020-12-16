import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select'

//Utils
import {isInt, isFloat} from '../../utils/validators'

import StaticData from '../../static/static-data'

class FeeForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            index: this.props.index,
            cost: 0, 
            name: '',
            errors: {},
        }
        this.eventChange = this.eventChange.bind(this)
        // this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }

    eventChange(event)
    {
        if(event.target.name === 'cost')
        {
            this.setState({
                [event.target.name]: event.target.value
            }, () => {
                console.log(parseFloat(event.target.value));
                if(!parseFloat(event.target.value))
                {
                    this.setState({
                        errors: {cost: 'Invalid Number'}
                    }, () =>
                    {
                        this.updateParentState(); 
                    })
                }else
                {
                    this.setState({
                        errors: {}
                    }, () =>
                    {
                        this.updateParentState(); 
                    })
                }
            })
        }else
        {
            this.setState({
                [event.target.name]: event.target.value
            }, () => {
                this.updateParentState()
            })
        }
    }

    updateParentState()
    {
        let data = this.state
        let index = this.state.index
        this.props.getChildrenData(index, data)
    }

    render(props)
    {
        return(
            <div className="service-form">
                <Grid container>
                        <Grid item sm="6" xs="6" align="left" >
                        <TextField
                            label="Fee" 
                            placeholder="ex. Setup fee"
                            fullWidth
                            variant="outlined" 
                            size="small" 
                            name='name'
                            value={this.state.name}
                            onChange={this.eventChange}
                            helperText={this.state.errors.name}
                            error={this.state.errors.name ? true : false}
                            />
                        </Grid>
                        <Grid item sm="6" xs="6" align="right">
                            <IconButton onClick={() => this.props.deleteMethod(this.state.index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item sm="4" xs="4" align="left">
                        <FormControl fullWidth className="">
                            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                name="cost"
                                value={this.state.cost}
                                onChange={this.eventChange}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                helperText={this.state.errors.name}
                                error={this.state.errors.name ? true : false}
                            />
                            <p className="error">{this.state.errors.cost}</p>
                        </FormControl>
                        </Grid>


                    </Grid>
            </div>
        )
    }
}

export default FeeForm