import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';



const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#BAC4E7'
    }
}));

// function FooterContent()
// {
//     const classes = useStyles(); 
//     return(
//         <div>hi</div>
//     )
// }

function Footer()
{
    const classes = useStyles();
    return (
        <div>
            <BottomNavigation className={classes.footer}>
                

            </BottomNavigation>
        </div>
    )
}


export default Footer