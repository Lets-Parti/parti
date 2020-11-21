import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './common/App.css';
import App from './common/App';

const element = <h1>Hello World</h1>;
console.log(element); 

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);



