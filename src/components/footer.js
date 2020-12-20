import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';



const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#BAC4E7',
        height: 100
    }
}));

function Footer()
{
    const classes = useStyles();
    return (
        <div>
            <BottomNavigation className={classes.footer}>
                <p>Contact us at funpartiapp@gmail.com</p>

            </BottomNavigation>
        </div>
    )
}


export default Footer