import React, { Component } from 'react';

//MaterialUI Components
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import '../../stylesheets/discover-card.css';

class DiscoverCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            fullName: this.props.data.fullName, 
            userHandle: this.props.data.userHandle, 
            bio: this.props.data.bio, 
            zipcode: this.props.data.zipcode, 
            tags: this.props.data.tags,
            mediaImages: this.props.data.mediaImages,
            profileImageUrl: this.props.data.imageUrl
        }
    }

    render(props)
    {
        let tags = []
        this.state.tags.forEach(tag =>
        {
            tags.push(<p>{tag}</p>); 
        })
        return(
            <div className="discover-card">
                <div className="discover-container">
                    <Grid container>
                        <Grid sm={1} xs={3} className="grid-object">
                            <img src={this.state.profileImageUrl} className="profile-image"/>
                        </Grid>
                        <Grid sm={7} xs={9} className="grid-object" align="left">
                            <div className="left-padding">
                                <p className="title">{this.state.fullName}</p>
                                <p className="handle">@{this.state.userHandle}</p>
                            </div>
                        </Grid>
                        <Grid sm={4} xs={12}className="grid-object" align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onMessage}
                            >
                            Message
                        </Button>
                        </Grid>


                    </Grid>
                </div>
            </div>
        )
    }
}

export default DiscoverCard