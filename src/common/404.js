import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/navbar';

const useStyles = makeStyles((theme) => ({

}));

function ErrorNotFound() {
  const classes = useStyles(); 

  return (
    <div>
        <Navbar />
        <p>404 not found error!</p>
    </div>
  )
}

export default ErrorNotFound;