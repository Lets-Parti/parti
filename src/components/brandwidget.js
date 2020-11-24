import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    button: {
        color: '#CD72B4', 
        border: '1px solid rgba(205, 114, 180, 1.0)',
        backgroundColor: 'none', 
        textTransform: 'none',
        '&:hover': {
            border: '1px solid rgba(205, 114, 180, 1.0)',
        }
      },
}));

function BrandWidget(props)
{
    const classes = useStyles();
    return(
        <Button variant="outlined" color="secondary" className={classes.button}>
            {props.text}
        </Button>
    )
}

export default BrandWidget