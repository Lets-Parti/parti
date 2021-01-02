import React from 'react';

//Stylesheets
import '../stylesheets/common.css'
import '../stylesheets/beta.css'

//MaterialUI Imports 
import Grid from '@material-ui/core/Grid';

//Cards for Indiana Scroll
import frame_one from '../resources/cards/frame1.png'
import frame_two from '../resources/cards/frame2.png'
import frame_three from '../resources/cards/frame3.png'
import frame_four from '../resources/cards/frame4.png'
import frame_five from '../resources/cards/frame5.png'
import frame_six from '../resources/cards/frame6.png'

import ScrollContainer from 'react-indiana-drag-scroll'
import AboutNoBio from './about/about-nobio';

import axios from 'axios';

class Beta extends React.Component
{
    constructor()
    {   
        super()
        this.state = {description: ''}
        this.eventChange = this.eventChange.bind(this)
        // this.expandMatthew = this.expandMatthew.bind(this)
        // this.expandAnish = this.expandAnish.bind(this)
        // this.expandJake = this.expandJake.bind(this)
        // this.expandAaric = this.expandAaric.bind(this)
        // this.expandMax = this.expandMax.bind(this)
    }   

    eventChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render()
    {   
        
        console.log(this.state); 
        const frames_services = [frame_one, frame_two, frame_three];
        const frames_clients = [frame_four, frame_five, frame_six]; 
        // let description;

        const Matthew_Card = (
            <div className="indiana-frame" /*onClick={this.expandMatthew}*/>
                <AboutNoBio 
                    name="Matthew Wang"
                    title="Co-Founder & Full-Stack Software Engineer"
                    from="Chandler, AZ"
                    college="Duke University"
                    num={0}
                    />
            </div>
        );

        const Anish_Card = (
            <div className="indiana-frame" /*onClick={this.expandAnish}*/>
                <AboutNoBio 
                    name="Anish Agarwal"
                    title="Co-Founder & Full-Stack Software Engineer"
                    from="Chandler, AZ"
                    college="Arizona State University"
                    num={1}
                    />
            </div>
        );
        
        const Jake_Card = (
            <div className="indiana-frame" /*onClick={this.expandJake}*/>
                <AboutNoBio 
                    name="Jake Heller"
                    title="Co-Founder & Full-Stack Software Engineer"
                    from="Miami, FL"
                    college="Duke University"
                    num={2}
                    />
            </div>
        )

        const Aaric_Card = (
            <div className="indiana-frame" /*onClick={this.expandAaric}*/>
                <AboutNoBio 
                    name="Aaric Han"
                    title="Co-Founder & Full-Stack Software Engineer"
                    from="Cary, NC"
                    college="Duke University"
                    num={3}
                    />
            </div>
        )
        const Prachi_Card = (
            <div className="indiana-frame" /*onClick={this.expandMax}*/>
                <AboutNoBio 
                    name="Prachi Agarwal"
                    title="Product (UI/UX) & Graphic Designer"
                    from="San Francisco, CA"
                    college="[blank]"
                    num={4}
                    />
            </div>
        )
        const Fiyi_Card = (
            <div className="indiana-frame" /*onClick={this.expandMax}*/>
                <AboutNoBio 
                    name="Fiyi Adebekun"
                    title="Full-Stack Software Developer"
                    from="Gilbert, AZ"
                    college="MIT"
                    num={5}
                    />
            </div>
        )

        const frames_founders = [Matthew_Card, Anish_Card, Jake_Card, Aaric_Card, Prachi_Card, Fiyi_Card]; // _h for headshot

        return(
            <div>
                <Grid align="center">
                    <div className="page-content">
                        <Grid align="center">
                            <h1>What is Parti?</h1>
                            <p className="description">Parti will help you find the most suitable professionals for your upcoming event. Our platform will connect you with the best professionals and organize all of your event needs in an all-in-one dashboard. </p>
                        </Grid>

                        <iframe className="youtube-demo" src="https://www.youtube.com/embed/R6jInZUZuKI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        
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

                        <Grid align="center">
                            <h1>Parti for Vendors</h1>
                            <p className="description">We help vendors build a brand, market, and grow. Parti enables you to reach out to events that are looking for your service. Expand your business with our direct market outreach system.</p>
                        </Grid>

                        <iframe className="youtube-demo" src="https://www.youtube.com/embed/ijRfHZt87EI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                        <Grid className="indiana-scroll" align="center">
                                <ScrollContainer className="scroll-container" horizontal hideScrollbars>
                                {frames_services.map(frame => 
                                (
                                    <div className="indiana-frame">
                                        <img src={frame} className="indiana-frame-picture" />
                                    </div>
                                ))
                                }
                                </ScrollContainer>
                        </Grid>

                        <Grid align="center">
                            <h1>About the Parti Team</h1>
                            <p className="description">As college students and young entrepreneurs, we plan to reshape the event planning process at Parti. We used our experience in the event entertainment industry as inspiration to make the event planning process as simple as possible.</p>
                        </Grid>
                        <div className="seperator" />

                        <div className="indiana-scroll-about">
                            <ScrollContainer className="scroll-container">
                            {frames_founders}
                            </ScrollContainer>
                        </div>
                        {/* <Grid align="center" border={1} sm={8} xs={12}>
                          <p className="description">{this.state.description}</p>
                        </Grid> */}
                    </div>
                </Grid>
            </div>
        )
    }
}

export default Beta