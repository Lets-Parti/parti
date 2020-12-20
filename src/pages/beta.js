import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/beta.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//Cards for Indiana Scroll
import frame_one from '../resources/cards/frame1.png'
import frame_two from '../resources/cards/frame2.png'
import frame_three from '../resources/cards/frame3.png'
import frame_four from '../resources/cards/frame4.png'
import frame_five from '../resources/cards/frame5.png'
import frame_six from '../resources/cards/frame6.png'

import ScrollContainer from 'react-indiana-drag-scroll'

import AboutAaricnobio from './about/about-aaricnobio';
import AboutAnishnobio from './about/about-anishnobio';
import AboutJakenobio from './about/about-jakenobio';
import AboutMatthewnobio from './about/about-matthewnobio';
import AboutMaxnobio from './about/about-maxnobio';

import axios from 'axios';

class Beta extends React.Component
{
    constructor()
    {   
        super()
        this.state = {
            fullName: '', 
            email: '', 
            phone: '', 
            company: '',
            isSubmitted: false, 
        }
        this.eventChange = this.eventChange.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
    }   

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmitForm()
    {
        let dataSentToDB = {
            fullName: this.state.fullName, 
            email: this.state.email, 
            phone: this.state.phone, 
            company: this.state.company
        }

        axios.post('/beta', JSON.stringify(dataSentToDB),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res =>
        {
            this.setState({
                isSubmitted: true
            })
        })
        .catch(err =>
        {
            alert('Oops. Something went wrong ;(');
        })
    }

    render()
    {
        console.log(this.state); 
        const frames_services = [frame_one, frame_two, frame_three];
        const frames_clients = [frame_four, frame_five, frame_six]; 

        let button = this.state.isSubmitted ? 
        <p>Thank you for joining Parti!</p> 
        : 
        <Button
            variant="contained"
            color="primary"
            onClick={this.onSubmitForm}
            >
            Join Beta
        </Button>

        return(
            <div>
                <Grid align="center">
                    <div className="page-content-beta">
                        <div className="beta-section-one"> 
                            <p className="beta-title">A platform for all your event needs</p>
                            <p className="lightText">Beta available <b>January 4th, 2021</b></p>
                            <div className="seperator" />
                            <div className="seperator" />
                            <div className="beta-form">
                                <TextField
                                    label="Email" 
                                    variant="outlined" 
                                    size="small" 
                                    name='email'
                                    fullWidth
                                    onChange={this.eventChange}
                                    value={this.state.email}
                                    />
                                <div className="seperator" />
                            {button}
                            </div>     
                        </div> 
                        <Grid className="indiana-scroll" align="center">
                            <h1>What is Parti?</h1>
                            <p className="description">Parti will help you find the most suitable professionals for your upcoming event. Our platform will connect you with the best professionals and organize all of your event needs. </p>
                        </Grid>
                        
                        <Grid className="indiana-scroll" align="center">
                            <ScrollContainer className="scroll-container" horizontal hideScrollbars >
                            {frames_clients.map(frame => 
                            (
                                <div className="indiana-frame">
                                    <img src={frame} className="indiana-frame-picture" />
                                </div>
                            ))
                            }
                            </ScrollContainer>
                        </Grid>

                        <Grid className="indiana-scroll" align="center">
                            <h1>Parti for Professionals</h1>
                            <p className="description">We help professionals like you build a brand, market, and grow your business. Parti allows you to discover events looking for your service and initiate communication with clients.</p>
                            <div className="indiana-scroll">
                                <ScrollContainer className="scroll-container" horizontal hideScrollbars>
                                {frames_services.map(frame => 
                                (
                                    <div className="indiana-frame">
                                        <img src={frame} className="indiana-frame-picture" />
                                    </div>
                                ))
                                }
                                </ScrollContainer>
                            </div>
                        </Grid>

                        <Grid className="indiana-scroll" align="center">
                            <h1>About the Parti Team</h1>
                            <p className="description">As college students and young entrepreneurs, we plan to reshape the event planning process at Parti. We used our experience in the event entertainment industry as inspiration to make the event planning process as streamlined as possible.</p>

                        </Grid>
                    </div>

                    <div>
                        <Grid>
                            <AboutMatthewnobio />
                        </Grid>
                        <br></br>
                            <AboutAnishnobio />
                        <br></br>
                            <AboutJakenobio />
                        <br></br>
                            <AboutAaricnobio />
                        <br></br>
                            <AboutMaxnobio />
                        <br></br>
                    </div>
                </Grid>
            </div>
        )
    }
}

export default Beta