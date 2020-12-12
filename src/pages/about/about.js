import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AboutAaric from './about-aaric';
import AboutAnish from './about-anish';
import AboutJake from './about-jake';
import AboutMatthew from './about-matthew';
import AboutMax from './about-max';


const useStyles = makeStyles((theme) => ({
  intro: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '1.25rem',
    marginLeft: '3rem',
    marginRight: '3rem'
  },
  banner: {
    fontSize: '3rem',
    color: '#CD72B4'
  },
  text: {
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  aboutsection: {
    margin: '2rem'
  }
}));

function AboutParti(){
  const classes = useStyles(); 

  return(
    <div className={classes.intro}>
      <h1 className={classes.banner}>About Parti</h1>
      <hr></hr>
      <p className={classes.text}>We can put text in here once we figure out exactly what services Parti offers. But this is just filler text for now</p>
      {/* The line below (should be line 32) is filler text. Can delete whenever */}
      <p className={classes.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id elit vel nisl congue ullamcorper malesuada a metus. Nam placerat ut elit sit amet accumsan. Pellentesque ornare, turpis vitae vehicula interdum, ex turpis porta purus, id porttitor turpis arcu vitae diam. Proin augue justo, aliquam quis porta in, mattis id augue. Cras vel sodales orci, non efficitur justo. Nam in ipsum in erat tristique porttitor quis in ligula. Pellentesque aliquet magna turpis, non tristique mauris molestie sed. Nam consequat egestas lacinia. Nullam vestibulum turpis sed arcu facilisis accumsan. Maecenas ac feugiat arcu, a ultricies nisl. Morbi commodo dignissim gravida. Nam egestas auctor neque, id lacinia massa suscipit eu. Curabitur sed neque rhoncus, vulputate ipsum sed, efficitur metus. Nam nec molestie lorem. Sed euismod eros vitae placerat venenatis. Duis placerat laoreet mi, quis fringilla augue elementum nec. Nulla aliquam dolor ut sapien aliquet maximus. Integer ac ullamcorper massa. Aenean ac lorem tellus. Sed semper elit scelerisque lacus tristique pellentesque. Integer vitae elit non dolor iaculis varius non et arcu. Praesent eu dui condimentum, blandit elit id, lobortis ipsum. Fusce vulputate ornare eros et dignissim. Phasellus nulla lacus, eleifend et pharetra sit amet, volutpat lobortis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis volutpat velit eu magna laoreet, in lobortis quam elementum. Phasellus et sem eu justo placerat ornare eu aliquet lacus. Integer nulla eros, iaculis vel dolor nec, accumsan tempor nisi. Phasellus tempor aliquam mi nec feugiat. Aenean tincidunt, eros nec posuere varius, lectus eros faucibus lorem, vel consequat nunc dui vel nisl. Nunc dignissim ex id ipsum tincidunt, nec varius leo viverra. Aliquam porta mi eu ipsum vestibulum, ac lobortis est lobortis. Fusce sodales sollicitudin velit, non vehicula odio. Aliquam sem orci, lobortis vitae interdum a, dictum non purus. Sed posuere, urna sit amet viverra accumsan, metus dui ultrices sem, ut congue enim magna quis massa. Ut ut mauris sit amet velit posuere scelerisque. Aenean vehicula cursus augue, a aliquam felis ornare eu. In non ipsum eget nulla dapibus rhoncus id quis nunc. Phasellus quis enim non tellus auctor auctor. In id ante hendrerit, pellentesque turpis sed, aliquet magna. Vestibulum sit amet dui ante. Aenean ullamcorper eget enim sed laoreet. Nullam varius scelerisque nulla at consectetur. Nulla facilisi. Mauris sed nisl lectus. Pellentesque faucibus mi vel tincidunt molestie. Proin in erat rhoncus urna laoreet maximus vitae in est. Sed nec ultrices enim. Ut ultrices in nibh luctus consequat. Pellentesque ac egestas nunc. In nec elementum nunc. Aenean porta metus tellus, vel imperdiet ipsum rutrum nec. Nulla fringilla ultricies metus. Phasellus mattis quam massa, faucibus facilisis nunc tempus in. Cras sit amet semper est, id blandit eros. Nulla at dui tincidunt lacus gravida scelerisque non id ex. Fusce vitae egestas tortor. Cras blandit pellentesque lectus, in facilisis nulla lobortis nec. Donec nibh nulla, rutrum vel ipsum ut, eleifend consequat libero. Donec non erat neque. Duis vel dui lacinia, imperdiet elit vel, euismod dui.</p>
      <br></br>
      <h1 className={classes.banner}>About the Founders</h1>
      <hr></hr>
      <div className={classes.aboutsection}>
        <AboutAnish />
        <br></br>
        <AboutMatthew />
        <br></br>
        <AboutJake />
        <br></br>
        <AboutAaric />
        <br></br>
        <AboutMax />
        <br></br>
      </div>
    </div>
  )
}

export default AboutParti;
