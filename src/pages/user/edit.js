import React from 'react';

//Stylesheets
import '../../stylesheets/common.css'
import '../../stylesheets/account-edit.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';

//Redux
import { connect } from 'react-redux'
import { updateUserProfile } from '../../redux/actions/userActions'
import PropTypes from 'prop-types'

class AccountEdit extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            errors: {},
            onUpdateProfile: false
        }
        this.onUpdateProfile = this.onUpdateProfile.bind(this); 
        this.eventChange = this.eventChange.bind(this); 
        this.onSubmitProfile = this.onSubmitProfile.bind(this); 
    }   

    eventChange(event)
    {
        let user = this.state.user; 
        user[event.target.name] = event.target.value; 
        this.setState({
            user
        })
    }

    onUpdateProfile()
    {
        this.setState({
            onUpdateProfile: true, 
            user: this.props.user.user
        });
    }

    onSubmitProfile()
    {
        this.props.updateUserProfile(this.state.user, this.state.user.type); 
    }

    render()
    {   
        console.log(this.state)

        let userData = null
        let userDataForm = null
        let buttonDisplay = this.state.onUpdateProfile ? 
            <Button
                variant="contained"
                color="primary"
                onClick={this.onSubmitProfile}
                >
                Submit
            </Button>
        :
        <Button
            variant="outlined"
            color="primary"
            onClick={this.onUpdateProfile}
            >
            Update Profile
        </Button>

        if(this.props.user.user)
        {
            let user = this.props.user.user
            if(user.type === 'client')
            {
                let joinedDate = user.createdAt.split('T')[0]
                userData = 
                <div>
                    <img className="profile-image" src={user.imageUrl}/>
                    <p className="user-handle">{user.userHandle}</p>
                    <p className="full-name">{user.fullName}</p>
                    <p className="user-info"><LocationOnIcon fontSize="small" />{user.zipcode}</p>
                    <p className="user-info"><EventIcon fontSize="small" />Joined {joinedDate}</p>
                </div>
            }else if(user.type === 'service')
            {
                let joinedDate = user.createdAt.split('T')[0]
                userData = 
                <div>
                    <img className="profile-image" src={user.imageUrl}/>
                    <p className="user-handle">@{user.userHandle}</p>
                    <p className="full-name">{user.fullName}</p>
                    <p className="user-info"><LocationOnIcon fontSize="small" />{user.zipcode}</p>
                    <p className="user-info"><EventIcon fontSize="small" />Joined {joinedDate}</p>
                </div>
            }
        }

        if(this.state.onUpdateProfile)
        {
            if(this.state.user.type === 'client')
            {
                userDataForm = 
                <div className="edit-form">
                    <TextField
                        label="Full Name" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='fullName'
                        onChange={this.eventChange}
                        value={this.state.user.fullName}
                        helperText={this.state.errors.fullName}
                        error={this.state.errors.fullName ? true : false}
                        />
                    <div className="divider" />
                    <TextField
                        label="Zipcode" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='zipcode'
                        onChange={this.eventChange}
                        value={this.state.user.zipcode}
                        helperText={this.state.errors.zipcode}
                        error={this.state.errors.zipcode ? true : false}
                        />
                </div>
            }else if(this.state.user.type === 'service')
            {
                userDataForm = 
                <div className="edit-form">
                    <TextField
                        label="Company Name" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='fullName'
                        onChange={this.eventChange}
                        value={this.state.user.fullName}
                        helperText={this.state.errors.fullName}
                        error={this.state.errors.fullName ? true : false}
                        />
                    <div className="divider" />
                    <TextField
                        label="Zipcode" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='zipcode'
                        onChange={this.eventChange}
                        value={this.state.user.zipcode}
                        helperText={this.state.errors.zipcode}
                        error={this.state.errors.zipcode ? true : false}
                        />
                    <div className="divider" />
                    <TextField
                        label="Bio" 
                        variant="outlined" 
                        size="small" 
                        fullWidth='true'
                        name='bio'
                        multiline
                        rows={5}
                        onChange={this.eventChange}
                        value={this.state.user.bio}
                        helperText={this.state.errors.bio}
                        error={this.state.errors.bio ? true : false}
                        />
                </div>
            }
        }


        return(
            <Grid align="center">
            <div className="page-content">
                <div className="profile-container" >
                    {userData}
                    {userDataForm}
                    {buttonDisplay}
                </div>
            </div>
            </Grid>
        )
    }
}

AccountEdit.propTypes = {
    user: PropTypes.object.isRequired,
    updateUserProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    updateUserProfile
}

export default connect(mapStateToProps, mapActionsToProps)(AccountEdit)