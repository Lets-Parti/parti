import React from 'react';
import nothing_img from '../resources/images/nothing_found.png'
import '../stylesheets/common.css'

function ErrorNotFound() {

  const nothingFound = 
  <div>
      <img src={nothing_img} className="nothingImg" alt="Nothing Found"/>
  </div>
  
  return (
    <center>
      <div className="page-content">
          {nothingFound}
          <p>404 Page Not Found.</p>
      </div>
    </center>
  )
}

export default ErrorNotFound;
