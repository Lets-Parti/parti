import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/loginsignup.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux'
import { getUserByHandle } from '../redux/actions/dataActions'
import PropTypes from 'prop-types'

class User extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            
        }
    }   

    componentDidMount()
    {
        const handle = this.props.match.params.userhandle
        this.props.getUserByHandle(handle); 
    }

    render()
    {   const {user, isLoading} = this.props.data; 
        let userDisplay = null

        if(user && !isLoading)
        {
            userDisplay = user.userHandle
        }else
        {
            userDisplay = <CircularProgress />
        }

        return(
            <div>

                <p>{userDisplay}</p>
            </div>
        )
    }
}

User.propTypes = {
    getUserByHandle: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired, 
}

const mapStateToProps = (state) => ({
    data: state.data, 
})

const mapActionsToProps = {
    getUserByHandle
}

export default connect(mapStateToProps, mapActionsToProps)(User)