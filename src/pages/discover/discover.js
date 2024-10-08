import React from 'react';
import '../../stylesheets/common.css'
import '../../stylesheets/discover.css'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
//Components
import DiscoverCard from '../../components/discover-components/discover-card'

//Redux
import { connect } from 'react-redux'
import { discover } from '../../redux/actions/dataActions'
import PropTypes from 'prop-types'

//Select
import Select from 'react-select'
import StaticData from '../../static/static-data'

//images 
import nothing_img from '../../resources/images/nothing_found.png'

//Analytics
import {firebaseAnalytics} from '../../utils/firebase'
import { Link } from '@material-ui/core';

class Discover extends React.Component {
    constructor() {
        super()
        this.state = {
            serviceTag: [], 
            discover_cards: [],
            page: 1, 
            isLoading: false
        }
        this.handlePageChange = this.handlePageChange.bind(this); 
    }

    componentDidMount() 
    {
        firebaseAnalytics.logEvent('discover_visited');
        let URLQuery = this.props.match.params.query;
        let query; 
        
        if(URLQuery)
        {
            query = {
                serviceTags: URLQuery
            }
            let serviceTag = []; 
            serviceTag.push({value: URLQuery, label: URLQuery}); 
            this.setState({serviceTag});
        }else
        {
            query = {
                serviceTags: ''
            }
        }
        this.props.discover(query, this.state.page);
    }

    handleChangeSelect(name, value) {
         this.setState({
             [name]: value,
             page: 1
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
           this.props.discover(query, 1);
         }else
         {
             const query = {
                 serviceTags: ''
             }
             this.props.discover(query, 1);
         }
     }

    handlePageChange(event, page)
    {
        let value = this.state.serviceTag; 
        if(value && value.length > 0)
        {
           let tagsArray = []
           value.forEach(val =>
           {
               tagsArray.push(val.value); 
           })
           const query = {
               serviceTags: tagsArray.join()
           }
          this.props.discover(query, page);
        }else
        {
            const query = {
                serviceTags: ''
            }
            this.props.discover(query, page);
        }
        this.setState({
            page: page
        })  
    }

    render() {
        const { discover, isLoading } = this.props.data;
        
        const nothingFound = 
        <div>
            <img src={nothing_img} className="nothingImg" alt="Nothing Found"/>
            <p>None found.</p>
        </div>

        let dataDisplay
        if (isLoading) {
            dataDisplay = <CircularProgress />;
        } else {
            dataDisplay = []
            if(discover.length === 0)
            {
                dataDisplay.push(nothingFound); 
            }else
            {
                discover.forEach(queryTags => {
                    dataDisplay.push(<DiscoverCard data={queryTags} />);
                })
            }
        }

        return (
            <Grid align="center">
                <div className="discover-page-content">
                    <p className="title">Vendors</p>
                    <p className="lightText">What service(s) are you looking for?</p>
                    <div className="discoverSelect">
                        <Select 
                            isMulti
                            options={StaticData.options}
                            styles="width:100px;"
                            id="select"
                            value={this.state.serviceTag}
                            onChange={this.handleChangeSelect.bind(this, "serviceTag")}
                        /> 
                        </div>
                    <div class="separator" />
                    <div class="separator" />
                    <div class="separator" />
                    <Link href="/signup/vendor">
                        Vendor? List yourself here.
                    </Link>
                    {dataDisplay}
                    <div className="pagination">
                        <Pagination count={10} 
                            page={this.state.page} 
                            onChange={this.handlePageChange} 
                            size="medium"
                            color="primary"
                        />
                    </div>
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
