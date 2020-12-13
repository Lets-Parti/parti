import React from 'react';
import '../../stylesheets/common.css'
import '../../stylesheets/discover.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


//Components
import DiscoverCard from '../../components/discover-components/discover-card'
import Chips from 'react-chips'; // added
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


//Redux
import { connect } from 'react-redux'
import { discover } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

//Select
import Select from 'react-select'
import StaticData from '../../static/static-data'

class Discover extends React.Component {
    constructor() {
        super()
        this.state = {
            service: '',
            discover_cards: [],
            isLoading: false
        }
      this.onChangeChips = this.onChangeChips.bind(this); // added from accountedit.js 
    }

    componentDidMount() 
    {
        const query = {
            service: ''
        }
        this.props.discover(query);
    }

    handleChangeSelect(name, value) {
         this.setState({
             [name]: value
         })
         const query = {
             service: value.value
         }
         this.props.discover(query);
     }

    // added from accountedit.js 
    onChangeChips(chips)
    {
        let user = this.state.user; 
        user.tags = chips
        this.setState({
            user
        })
    }
    // added from accountedit.js 

    render() {

        let chipfield = null

        const { discover, isLoading } = this.props.data;

        let dataDisplay
        if (isLoading) {
            dataDisplay = <CircularProgress />
        } else {
            dataDisplay = []
            discover.forEach(service => {
                dataDisplay.push(<DiscoverCard data={service} />);
            })
        }

        let chip_options = [];
        StaticData.options.forEach(option =>
        {
            chip_options.push(option.value);
        });

        // added from accountedit.js
        chipfield =
        <Chips
        value={this.state.user.tags}
        onChange={this.onChangeChips}
        suggestions={chip_options}
        /> 
        // added from accountedit.js

        return (
            <Grid align="center">
                <div className="page-content">
                    <p className="title">Discover</p>
                    <p className="lightText">What service are you looking for?</p>
                    <div className="discoverSelect">
                        {/* <Select
                            options={StaticData.options}
                            styles="width:100px;"
                            id="select"
                            value={this.state.service}
                            onChange={this.handleChangeSelect.bind(this, "service")}
                        />  */}
                        {chipfield}  
                    </div>
                    {dataDisplay}
                </div>
            </Grid>
        )
    }
}

Discover.propTypes = {
    discover: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
 //   user: PropTypes.object.isRequired // add
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    discover
}


export default connect(mapStateToProps, mapActionsToProps)(Discover)
