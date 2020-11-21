import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white', 
        border: 'none',
        backgroundColor: '#CD72B4', 
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#CD72B4'
        }
      },
}));

function ButtonFill(props)
{
    const classes = useStyles();
    return(
        <Button variant="contained" color="secondary" className={classes.button}>
            {props.text}
        </Button>
        
    )
}

export default ButtonFill
