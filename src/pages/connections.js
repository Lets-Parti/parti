
import React from 'react';
import './../stylesheets/common.css'
import './../stylesheets/connect.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ConnectCard from '../components/connections-components/connect-card'

//Redux
import { connect } from 'react-redux'
import { getConnects } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'

class Connections extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            connects: [],
            isLoading: false
        }
    }

    componentDidMount()
    {
        this.props.getConnects(); 
    }

    render()
    {

        const {connects, isLoading} = this.props.data; 
        console.log(connects);
        let dataDisplay = null
        if(isLoading)
        {
            dataDisplay = <CircularProgress />
        }else
        {
            dataDisplay = []
            connects.forEach(connect => 
            {
                console.log(connect);
                dataDisplay.push(<ConnectCard data={connect}/>)    
            });
        }
        
        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <p className="title">My Connections</p>
                        <p>When you send a message from the discover page, 
                            an email will be sent to that user with your 
                            custom message and your contact information. 
                            Anyone who sent you a message or has sent a 
                            message to you will appear here with the 
                            message they sent.
                        </p>
                        <br></br>
                        <p>*Later versions of Parti will contain a 
                            more fully developed messaging system</p>
                    </div>
                    <div className="connect-messages">
                        {dataDisplay}
                    </div>
                </Grid>
            </div>
        )
    }
}

Connections.propTypes = {
    getConnects: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getConnects
}

export default connect(mapStateToProps, mapActionsToProps)(Connections)

