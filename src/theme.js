import {createMuiTheme} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#CD72B4',
      },
      secondary: {
        main: green[500],
      },
    },
  });

export default theme