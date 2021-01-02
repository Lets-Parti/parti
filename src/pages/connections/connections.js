
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
        const nothingFound = 
        <div>
            <img src={nothing_img} className="nothingImg"/>
            <p>None found.</p>
        </div>

        const {connects, isLoading} = this.props.data; 
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
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    getConnects
}

export default connect(mapStateToProps, mapActionsToProps)(Connections)

