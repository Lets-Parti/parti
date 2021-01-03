import React from 'react';
import '../../stylesheets/common.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import ContractCard from '../../components/contracts-components/contract-card'

//Redux
import { connect } from 'react-redux'
import { getContracts } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

//Resources
import nothing_img from '../../resources/images/nothing_found.png'

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

    createNewContract()
    {
        window.location.href = "/contracts/new"
    }

    render()
    {
        const {contracts, isLoading} = this.props.data; 
        const {authenticated, user} = this.props.user

        const nothingFound = 
        <div>
            <img src={nothing_img} className="nothingImg" alt="Nothing Found"/>
            <p>None found.</p>
        </div>

        let dataDisplay = null
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            if(contracts.length === 0)
            {
                dataDisplay.push(nothingFound); 
            }else
            {
                contracts.forEach(contract => 
                {
                    dataDisplay.push(<ContractCard key={contract.contractID} data={contract}/>)    
                });
            }
        }
        
        let newContractsButton = (authenticated && user.type === 'service') ?
        <Button
            variant="contained"
            onClick={this.createNewContract}
            color="primary"
        >
            Create Contract   
        </Button>
        : 
        null

        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <p className="title">My Contracts</p>
                        {newContractsButton}
                        {dataDisplay}
                    </div>
                </Grid>
            </div>
        )
    }
}

Contracts.propTypes = {
    getContracts: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})

const mapActionsToProps = {
    getContracts
}


export default connect(mapStateToProps, mapActionsToProps)(Contracts)