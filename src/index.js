import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import App from './App';

ReactDOM.render(
    <div>
        <Favicon url='./favicon.ico' />
        <App />
    </div>
    , 
    document.getElementById('root')
);



