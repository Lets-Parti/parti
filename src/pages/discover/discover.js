import React from 'react';
import '../../stylesheets/common.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Components
import DiscoverCard from '../../components/discover-components/discover-card'

//Redux
import { connect } from 'react-redux'
import { discover } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'


class Discover extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            service: '',
            discover_cards: [], 
            isLoading: false
        }
        this.onSubmitForm = this.onSubmitForm.bind(this); 
    }

    componentDidMount()
    {
        const query = {
            service: 'DJ'
        }
        this.props.discover(query); 
    }

    onSubmitForm = (event) =>
    {

    }

    render()
    {
        const {discover, isLoading} = this.props.data; 

        let dataDisplay
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            discover.forEach(service =>
            {
                dataDisplay.push(<DiscoverCard data={service} />); 
            })
        }

        return(
            <Grid align="center">
            <div className="page-content">
                <p className="title">Discover</p>
                {dataDisplay}
            </div>
        </Grid>
        )
    }
}

Discover.propTypes = {
    discover: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    discover
}


export default connect(mapStateToProps, mapActionsToProps)(Discover)