import React from 'react';
import '../../stylesheets/common.css'
import '../../stylesheets/discover.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

//Components
import DiscoverCard from '../../components/discover-components/discover-card'

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

    render() {

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

        return (
            <Grid align="center">
                <div className="page-content">
                    <p className="title">Discover</p>
                    <p className="lightText">What service are you looking for?</p>
                    <div className="discoverSelect">
                        <Select
                            options={StaticData.options}
                            styles="width:100px;"
                            id="select"
                            value={this.state.service}
                            onChange={this.handleChangeSelect.bind(this, "service")}
                        />
                    </div>
                    {dataDisplay}
                </div>
            </Grid>
        )
    }
}

Discover.propTypes = {
    discover: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    discover
}


export default connect(mapStateToProps, mapActionsToProps)(Discover)
