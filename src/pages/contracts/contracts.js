import React from 'react';
import '../../stylesheets/common.css'
import EventCard from '../../components/events-components/event-card'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContractCard from '../../components/contracts-components/contract-card'

//Redux
import { connect } from 'react-redux'
import { getContracts } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

class Contracts extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            
        }
    }

    componentDidMount()
    {
        this.props.getContracts(); 
    }

    render()
    {
        const {contracts, isLoading} = this.props.data; 

        let dataDisplay = null
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            contracts.forEach(contract => 
            {
                dataDisplay.push(<ContractCard key={contract.contractID} data={contract}/>)    
            });
        }
        
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <p className="title">My Contracts</p>
                        {dataDisplay}
                    </div>
                </Grid>
            </div>
        )
    }
}

Contracts.propTypes = {
    getContracts: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getContracts
}


export default connect(mapStateToProps, mapActionsToProps)(Contracts)