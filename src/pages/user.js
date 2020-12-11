import React from 'react';

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

        }
    }

    // componentDidMount()
    // {
    //     const handle = this.props.match.params.userhandle
    //     this.props.getUserByHandle(handle);
    // }

    render()
    {
        // const {user, isLoading} = this.props.data;
        // let userDisplay = null

        // if(user && !isLoading)
        // {
        //     userDisplay = user.userHandle
        // }else
        // {
        //     userDisplay = <CircularProgress />
        // }

        return(
            <div className="userContainer">
                    <Grid container spacing={3}>
                        {/* First Row */}
                        <Grid item className="grid-item-userinfo" sm={2} xs={4} align="center">
                            <img className="profile-image" src={profileImage} />
                        </Grid>
                        <Grid item className="grid-item-userinfo" sm={6} xs={8}>
                            <p className="company-name">808Hertz Entertainment</p>
                            <p className="user-handle">@808hertz</p>
                        </Grid>
                        <Grid item className="grid-item-messagebutton" align="center" sm={4} xs={12}>
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
                            <img className="bigpicture-section" src={testImage}></img>
                        </Grid>
                        <Grid container className="grid-item-smallpictures" sm={6} xs={12} alignItems="center" justify="center">
                          <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                            <img className="smallpicture-section" src={testImage}></img>
                          </Grid>
                          <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                            <img className="smallpicture-section" src={testImage}></img>
                          </Grid>
                          <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                            <img className="smallpicture-section" src={testImage}></img>
                          </Grid>
                          <Grid item className="grid-item-smallpictures" sm={6} xs={3}>
                            <img className="smallpicture-section" src={testImage}></img>
                          </Grid>
                        </Grid>


                        {/* Third Row */}
                        <Grid item className="grid-item-description" sm={6} xs={12}>
                          <div className="reviews-section">
                            <h1 className="banner">Review</h1>
                            <hr></hr>
                            <p>This is placeholder for a review</p>
                            <p>This is second review</p>
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
