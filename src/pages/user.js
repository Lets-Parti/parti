import React from 'react';
import { Redirect } from 'react-router';


//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/user.css'
import profileImage from '../resources/images/no_img.jpg'
import testImage from './test-imgs/test_img.jpg'

//MaterialUI Imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

//Material UI Icons
import MessageIcon from '@material-ui/icons/Message';

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
          errors: {},
        }
    }

    componentDidMount()
    {
        const handle = this.props.match.params.userhandle
        this.props.getUserByHandle(handle);
    }

    render()
    {
        const {user, isLoading} = this.props.data;
        let userDisplay = null
        let userHandle = null
        let userProfileImage = null
        let fullProfile = null
        let imageGallery = null

        if(user && !isLoading) {
            userDisplay = user.fullName
            userHandle = user.userHandle
            userProfileImage = user.imageUrl
            imageGallery = user.mediaImages
            fullProfile =
            <Grid container spacing={3}>
                {/* First Row */}
                <Grid item className="grid-item-userinfo" sm={2} xs={4} align="center">
                    <img className="profile-image" src={userProfileImage} />
                </Grid>
                <Grid item className="grid-item-userinfo" sm={8} xs={8}>
                    <p className="company-name">{userDisplay}</p>
                    <p className="user-handle">@{userHandle}</p>
                </Grid>
                <Grid item className="grid-item-messagebutton" align="center" sm={2} xs={12}>
                    <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MessageIcon />}
                    >
                            Message
                    </Button>
                </Grid>

                {/* Second Row */}
                <Grid item className="grid-item-bigpicture" sm={6} xs={12}>
                    <img className="bigpicture-section" src={imageGallery[0]}></img>
                </Grid>
                <Grid container className="grid-item-smallpictures" sm={6} xs={12} alignItems="center" justify="center">
                  <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                    <img className="smallpicture-section" src={imageGallery[1]}></img>
                  </Grid>
                  <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                    <img className="smallpicture-section" src={imageGallery[2]}></img>
                  </Grid>
                  <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                    <img className="smallpicture-section" src={imageGallery[3]}></img>
                  </Grid>
                  <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                    <img className="smallpicture-section" src={imageGallery[4]}></img>
                  </Grid>
                </Grid>


                {/* Third Row */}
                <Grid item className="grid-item-description" sm={6} xs={12}>
                  <div className="reviews-section">
                    <p>Description</p>
                  </div>
                </Grid>
                <Grid item className="grid-item-request" sm={6} xs={12}>
                  <p>REQUEST QUOTE DROPDOWN</p>
                </Grid>

                {/* Fourth Row */}
                <Grid item className="grid-item-reviews" sm={12} xs={12}>
                  <div className="reviews-section">
                    <h1 className="banner">Review</h1>
                    <hr></hr>
                    <p>This is placeholder for a review</p>
                    <p>This is second review</p>
                  </div>
                </Grid>
            </Grid>
        } else {

            // fullProfile =
            // <Redirect to="/404" />
        }


        return(
            <div className="userContainer">
              {fullProfile}
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
