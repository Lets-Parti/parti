import React from 'react';
import '../../stylesheets/common.css'
import '../../stylesheets/create-contract.css'
import StaticData from '../../static/static-data'

//Components
import FeeForm from '../../components/create-contract-components/fee-form'

//Material UI components 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from 'react-select'

import { connect } from 'react-redux'
import { createContract } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

class NewContract extends React.Component
{
    // "clientHandle": "matt8p",
    // "eventID": "14GJ9yOUFbTQwwny6Iee",
    // "fees": [
    //     {"name": "DJ Services", "cost": 800},
    //     {"name": "Service Fee", "cost": 325}
    // ],
    // "tags": ["DJ", "Photography"],
    // "body": "We will provide a lot "
    constructor()
    {
        super(); 
        this.state = 
        {
            clientHandle: '',
            eventID: '',
            fees: [],
            tags: [], 
            body: '', 
            errors: {}, 
            FeeFormComponents: [],
            isLoading: false
        }
        this.eventChange = this.eventChange.bind(this); 
        this.getChildrenData = this.getChildrenData.bind(this); 
        this.deleteFee = this.deleteFee.bind(this); 
        this.onSubmitForm = this.onSubmitForm.bind(this); 
        this.addFee = this.addFee.bind(this); 
    }

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm()
    {
        let fees = []
        let tags = [] 
        this.state.fees.forEach(fee =>
        {
            if(fee !== null)
            {
                if(Object.keys(fee.errors).length > 0)
                {
                    return this.setState({
                        errors: {fees: 'Invalid Fees'}
                    })
                }
                fees.push({
                    name: fee.name, 
                    cost: fee.cost
                })
            }
        })

        this.state.tags.forEach(tag =>
        {
            tags.push(tag.value)
        })

        let data = {
            clientHandle: this.state.clientHandle,
            eventID: this.state.eventID,
            fees, 
            tags, 
            body: this.state.body
        }

        this.props.createContract(data, this.props.history);
    }

    addFee()
    {
        let index = this.state.FeeFormComponents.length; 
        let newFeeFormComponents = this.state.FeeFormComponents.concat(
            <FeeForm 
                key={index} 
                index={index} 
                deleteMethod={this.deleteFee}
                getChildrenData={this.getChildrenData}
            />
        )
        this.setState({
            FeeFormComponents: newFeeFormComponents
        })
    }

    deleteFee(deleteTargetIndex)                    
    {
        let FeeFormComponents = this.state.FeeFormComponents.slice()
        let fees = this.state.fees

        FeeFormComponents[deleteTargetIndex] = null
        delete fees[deleteTargetIndex]

        this.setState({
            FeeFormComponents: FeeFormComponents,
            fees: fees
        })
    }

    getChildrenData(key, data)                      //Called by the <ServiceForm> object to send info to THIS object
    {
        let newFees = this.state.fees
        newFees[key] = data
        this.setState({
            fees: newFees
        })
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.UI.errors)
        {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        this.setState({
            isLoading: nextProps.UI.isLoading
        })
    }

    handleChangeSelect(name, value) {
        this.setState({
            [name]: value,
        })
    }

    render()
    {
        let SubmitButton;
        let AddFeeButton; 
        if(this.state.isLoading)
        {
            SubmitButton = <CircularProgress />
            AddFeeButton = null; 
        }else
        {
            SubmitButton =
            <div className="submit">
                <Button
                    variant="contained"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={this.onSubmitForm}
                    color="primary"
                >
                    Submit
                </Button>
            </div>

            AddFeeButton = 
            <IconButton 
                color="primary" 
                onClick={this.addFee}
                >
                <AddCircleOutlineIcon />
            </IconButton>
        }
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <p className="title">Create Contract</p>

                        <p className="question">1. Who's event?</p>
                        <TextField
                            label="Client Username" 
                            variant="outlined" 
                            size="small" 
                            name='clientHandle'
                            value={this.state.clientHandle}
                            onChange={this.eventChange}
                            helperText={this.state.errors.clientHandle}
                            error={this.state.errors.clientHandle ? true : false}
                            />
                        <p className="question">2. Verify event ID code</p>
                        <TextField
                            label="Event ID" 
                            variant="outlined" 
                            size="small" 
                            name='eventID'
                            value={this.state.eventID}
                            onChange={this.eventChange}
                            helperText={this.state.errors.eventID}
                            error={this.state.errors.eventID ? true : false}
                            />
                        <p className="question">3. What services are you providing for this event?</p>
                        <Select 
                            isMulti
                            options={StaticData.options}
                            styles="width:100px;"
                            id="select"
                            onChange={this.handleChangeSelect.bind(this, "tags")}
                        /> 
                        <p className="error">{this.state.errors.tags}</p>
                        <p className="question">4. Outline contract details</p>
                        <TextField
                            id="standard-multiline-static"
                            placeholder="Contract Details"
                            multiline
                            rows={8}
                            variant="outlined"
                            fullWidth
                            name="body"
                            onChange={this.eventChange}
                            value={this.state.body}
                            helperText={this.state.errors.body}
                            error={this.state.errors.body ? true : false}
                        />
                        <p className="question">5. What are you fees?</p>
                        {this.state.FeeFormComponents}
                        {AddFeeButton}

                        <p className="error">{this.state.errors.fees}</p>
                        {SubmitButton}
                    </div>
                </Grid>

            </div>
        )
    }
}

NewContract.propTypes = {
    createContract: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
})

const mapActionsToProps = {
    createContract
}

export default connect(mapStateToProps, mapActionsToProps)(NewContract)