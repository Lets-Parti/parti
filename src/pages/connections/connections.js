
import React from 'react';
import '../../stylesheets/common.css'
import '../../stylesheets/connect.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ConnectCard from '../../components/connections-components/connect-card'

//Redux
import { connect } from 'react-redux'
import { getConnects } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

//Resources
import nothing_img from '../../resources/images/nothing_found.png'

//Analytics
import {firebaseAnalytics} from '../../utils/firebase'

class Connections extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            connects: [],
            isLoading: false
        }        
        this.analyticsTriggered = false; 
    }

    componentDidMount()
    {
        this.props.getConnects(); 
    }

    triggerAnalytics(user)
    {
        if(!this.analyticsTriggered)
        {
            firebaseAnalytics.logEvent(`viewconnections_${user.userHandle}`);
            this.analyticsTriggered = true; 
        }
    }

    render()
    {
        const nothingFound = 
        <div>
            <img src={nothing_img} className="nothingImg" alt="Nothing Found"/>
            <p>None found.</p>
        </div>

        const {connects, isLoading} = this.props.data; 
        const {user} = this.props.user;

        let dataDisplay;
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            if(connects.length === 0)
            {
                dataDisplay.push(nothingFound); 
            }else
            {
                connects.forEach(connect => 
                {
                    dataDisplay.push(<ConnectCard data={connect}/>)    
                });
            }
        }

        if(user.userHandle)
        {
            this.triggerAnalytics(user); 
        }
        
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <p className="title">My Connections</p>
                        <p>Messages that you send or recieve.
                        </p>
                        {dataDisplay}
                    </div>
                </Grid>
            </div>
        )
    }
}

Connections.propTypes = {
    getConnects: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
})

const mapActionsToProps = {
    getConnects
}

export default connect(mapStateToProps, mapActionsToProps)(Connections)

