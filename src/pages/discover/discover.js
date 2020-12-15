import React, {useState} from 'react';
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
            serviceTag: [],
            discover_cards: [],
            isLoading: false
        }
    }

    componentDidMount() 
    {
        const query = {
            serviceTags: ''
        }
        this.props.discover(query);
    }

    handleChangeSelect(name, value) {
         this.setState({
             [name]: value,
         })
         
         if(value)
         {
            let tagsArray = []
            value.forEach(val =>
           {
               tagsArray.push(val.value); 
           })
            const query = {
                serviceTags: tagsArray.join()
            }
           this.props.discover(query);
         }else
         {
             const query = {
                 serviceTags: ''
             }
             this.props.discover(query);
         }
     }

    render() {
        console.log(this.state); 
        let chipfield = null
        const { discover, isLoading } = this.props.data;

        let dataDisplay
        if (isLoading) {
            dataDisplay = <CircularProgress />
        } else {
            dataDisplay = []
            discover.forEach(serviceTag => {
                dataDisplay.push(<DiscoverCard data={serviceTag} />);
            })
        }

        return (
            <Grid align="center">
                <div className="page-content">
                    <p className="title">Discover</p>
                    <p className="lightText">What service(s) are you looking for?</p>
                    <div className="discoverSelect">
                        <Select 
                            isMulti
                            options={StaticData.options}
                            styles="width:100px;"
                            id="select"
                            onChange={this.handleChangeSelect.bind(this, "serviceTag")}
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
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    // tags1: state.tags1,
    data: state.data
})

const mapActionsToProps = {
    discover
}


export default connect(mapStateToProps, mapActionsToProps)(Discover)
