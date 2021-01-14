import React from 'react';
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

import '../stylesheets/footer.css'

const footer_links = [
    {
      text: "About Us",
      link: "/about",
    },
    {
      text: "Terms and Conditions",
      link: "/terms-and-conditions",
    },
    {
      text: "Privacy Policy",
      link: "/privacy",
    },
    {
      text: "Feedback",
      link: "/feedback",
    },
    {
      text: "FAQ",
      link: "/faq",
    },
    {
      text: "Contact Us",
      link: "mailto: wearepartiapp@gmail.com",
      href: "/about"
    },
  ];

function Footer()
{
    return (
        <div>
            <Grid container align="center">
              <div className="home-footer">
                <Grid container item justify="space-evenly">
                  {footer_links.map((item) => (
                    <Grid item sm={2} xs={4}>
                      <Link href={item.link} color="inherit">
                        <p className="footer-text">{item.text}</p>
                      </Link>
                    </Grid>
                  ))}
                </Grid>

                <Box mt={1}/>
                
                <Grid item justify="space-evenly" alignItems="center">
                <p className="footer-text">
                    </p>
                    <Link href="https://www.instagram.com/parti.app/" target="_blank" className="footer-social">
                      <InstagramIcon style={{ color: "black" }}/>
                    </Link>
                    <Link href={"https://www.facebook.com/officialpartiapp"} target="_blank" className="footer-social">
                      <FacebookIcon style={{ color: "black" }}/>
                    </Link>
                    <Link href={"https://www.linkedin.com/company/partiapp/"} target="_blank" className="footer-social">
                      <LinkedInIcon style={{ color: "black" }}/>
                    </Link>
                </Grid>

                <Grid item justify="space-evenly" alignItems="center">
                  <Grid item>
                    <p className="footer-text">
                    2020 Parti LLC.
                    </p>
                  </Grid>
                  
                </Grid> 
              </div>
            </Grid>
        </div>
    )
}


export default Footer