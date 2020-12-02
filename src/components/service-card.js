import React from 'react';
import '../stylesheets/event.css'

class ServiceCard extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            serviceType: this.props.data.serviceType, 
            description: this.props.data.description, 
            vendorFound: this.props.data.vendorFound, 
            service: JSON.stringify(this.props.data.service)
        }
    }

    render()
    {
        let serviceStatus
        if(this.state.vendorFound)
        {
            serviceStatus = 'Vendor Found'
        }else
        {
            serviceStatus = 'Still Searching'
        }

        return(
            <div className="serviceCard">
                <p>{this.state.serviceType}</p>
                <p>{this.state.description}</p>
                <p>Status: {serviceStatus}</p>
            </div>
            
        )
    }
}

export default ServiceCard