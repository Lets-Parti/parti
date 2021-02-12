import React from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from 'react-select'

import StaticData from '../../static/static-data'

class ServiceForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            index: this.props.index,
            service: '', 
            description: ''
        }
        this.eventChange = this.eventChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            this.updateParentState()
        })
    }

    handleChangeSelect(name, value)
    {
        this.setState({
            [name]: value
        }, () =>
        {
            this.updateParentState()
        })
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
                        <Grid item sm="6" xs="10" align="left" >
                            <Select 
                            options={StaticData.options} 
                            styles="width:100px;" 
                            id="service"
                            value={this.state.service}
                            onChange={this.handleChangeSelect.bind(this, "service")}/>
                        </Grid>

                        <Grid item sm="6" xs="2" align="right">
                            <IconButton onClick={() => this.props.deleteMethod(this.state.index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>

                        <Grid item sm="12" xs="12" className="seperator"></Grid>

                        <Grid item sm="12" xs="12" align="left">
                            <TextField
                                id="standard-multiline-static"
                                placeholder="Describe what you're looking for. More details helps us connect you with better suited vendors"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                name="description"
                                onChange={this.eventChange}
                                value={this.state.description}
                            />
                        </Grid>
                    </Grid>
            </div>
        )
    }
}

export default ServiceForm