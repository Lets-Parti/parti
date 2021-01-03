import React from "react";

//Stylesheets
import "../stylesheets/info.css";

//Images
import contract_creation from "../resources/faq/contract_creation.png"
import event_connects from "../resources/faq/event_connects.png"
import event_contract from "../resources/faq/event_contract.png"
import event_creation from "../resources/faq/event_creation.png"
import event_id from "../resources/faq/event_id.png"
import event_sample from "../resources/faq/event_sample.png"
import event_status from "../resources/faq/event_status.png"
import vendor_creation from "../resources/faq/vendor_creation.png"
import vendor_listing from "../resources/faq/vendor_listing.png"


class FAQ extends React.Component {
  render() {
    return (
      <div className="info-page">
        <div className="info-banner">
          <p className="info-title">
            <b>FAQ</b>
          </p>
        </div>

        <div className="info-desc">
        <p><b>General: </b></p>

<p><i>What is parti?</i><br/>
Parti connects event hosts with vendors, making the event planning process effortless. Learn more about Parti here 
</p>
<p><i>Who can I reach out to for questions? </i><br/>
Email us at wearepartiapp@gmail.com
</p>
<p><i>Is my information and login credentials secure? </i><br/>
Your info and login credentials are secure and encrypted by Google Cloud 
</p>
<p><i>I have feedback or a feature recommendation I want to provide</i><br/>
Provide feedback <a href="/feedback">here</a>. We would love to hear from you. 
</p>
<p><b>For Customers: </b></p>
<p><i>Features: </i>
<ul>
<li><a href="/events">Events</a>: Helps you keep track of your event details, vendors you request, and who you’ve hired. </li>
<li><a href="/contracts">Contracts</a>: Agreements between you and the vendors you hire for your event are kept in contracts</li>
<li><a href="/discover">Discover</a>: Find vendors for your upcoming event. </li>
<li><a href="/connections">Connects</a>: Keep track of vendors you’ve reached out to and the vendors that have reached out to you. </li>
</ul></p>
<p><i>How do I get started? </i><br/>

After you’ve signed up, start by creating an event. Provide basic information about your event and the services that you are requesting for your event. The more details you provide, the better we can match you with local vendors.
<img src={event_creation} alt="Creating an Event"/>
Once you have created an event, local vendors will be able to see your event and reach out. Vendors cannot see your personal contact info, but you will be notified via email if they reach out. 
</p>

<p><i>Is my contact info shared?</i><br/>
Your contact information is never shared without your permission. Vendors cannot see your personal contact info, but you will be notified via email if they reach out. 
<br/><br/>
Your contact information is shared to a vendor when you send a message via connect. 
</p>

<p><i>How do I create a contract with a vendor? </i><br/>
After finding a vendor you want to hire, you will need to provide the vendor with your event’s Event ID (found in your events page). Your vendor needs this ID to create a contract.
<img src={event_id} alt="Event ID"/>

After your vendor creates a contract, visit your contracts page to view contract details. You can choose to either accept or cancel the contract

</p>

<p><i>How do I view my event status? </i><br/>

You can view your event status in the events page. 
<img src={event_status} alt="Event Status"/>

The (question) icon means you haven’t found a vendor

<img src={event_contract} alt="Event Confirmed"/>

The (check) icon means you are confirmed with a vendor and the contract is active. 
</p>

<p><b>For Vendors: </b></p>

<p>Join Parti as a vendor <a href="/signup/vendor">here</a></p>

<p><i>Features: </i>
<ul>
<li><a href="/discover-events">Find Events</a>: Find events that are looking for your service and reach out to the host</li>
<li><a href="/account/edit">Profiles</a>: Build your brand so customers can find you. </li>
<li><a href="/contracts">Contracts</a>: Agreements between you and your clients are kept in contracts</li>
<li><a href="/connections">Connects</a>: Keep track of vendors you’ve reached out to and the vendors that have reached out to you. </li>
</ul></p>


<p><i>How do I get started? </i><br/>

Join Parti as a vendor here

Upon creating an account, visit your profile and start building your brand. Upload a profile picture, write a bio, create tags, and upload media. 

Click on your username to view your profile from your customer’s perspective. 


</p>
<p><i>How do I find events? </i><br/>

Go to the find events page. This page shows you who is looking for your service. Hosts will provide details about what they are looking for. You can use the info they provide to determine whether you want to do the event. 
<img src={event_sample} alt="Host Event Listing"/>

A (question) icon means they haven’t found a vendor. You can then reach out to the host. 

</p>
<p><i>How do I reach out to customers?</i><br/>
When you find an event you like, you can message the host. 

<img src={event_connects} alt="Messaging a Host"/>
Write a message detailing what you can provide and why your service is a good fit for the event. It’s like your cover letter! The host will be notified via email and will be provided with your contact information. 
<br/><br/>
The event host will contact you if they are interested in your service. 

</p>
<p><i>How do I create a contract? </i><br/>
Contracts help keep track of the agreements made between you and your customer. After your customer hires you, your customer will need to provide you with an Event ID. 
<br/><br/>
Visit the create contracts page to get started 
<img src={contract_creation} alt="Creating a Contract"/>

Specify the fees that you and your customer have agreed upon. 
<img src={vendor_creation} alt="Contract Fees"/>

After you create a contract, it will show up on your contracts page. Let your customer know you’ve created a contract. When your customer signs the contract, you’re all set!


</p>
<p><i>Tags and Social Media Links </i><br/>

Tags detail what services you can provide. You can have 1 or more tags. Tags enable customers to find you. 
<br/><br/>
Provide links to your social media. Social media links will show up on your profile page. 
<img src={vendor_listing} alt="Vendor Tags"/>


Edit your tags and social media here 
</p>

        </div>
      </div>
    );
  }
}

export default FAQ;
