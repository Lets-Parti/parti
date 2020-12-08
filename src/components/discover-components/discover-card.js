import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import '../../stylesheets/event.css'

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
            tags: this.props.data.tags
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
            <div className="eventCard">
                <div className="eventWrapper">
                    <Grid align="left">
                        <h1>{this.state.fullName}</h1>
                        <p>@{this.state.userHandle}</p>
                        <p>{this.state.bio}</p>
                        <p>Tags: {tags}</p>
                        <p>Zipcode: {this.state.zipcode}</p>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default DiscoverCard