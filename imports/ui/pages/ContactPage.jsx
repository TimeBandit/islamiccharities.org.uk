import React from 'react';
import { Redirect } from 'react-router'

/*
Server name: smtp-mail.outlook.com
Port: 587
Encryption method: STARTTLS
*/
const ContactPage = () => {
  // ref placeholders
  let name = null,
    email = null,
    message = null;

  function buttonPress(e) {
    console.log(`form elements: ${name.value}, ${email.value}, ${message.value}`);
    Meteor.call('sendEmail', name.value, email.value, message.value);
  };

  function submitForm(e) {
    e.preventDefault()
    console.log(`form elements: ${name.value}, ${email.value}, ${message.value}`);
    Meteor.call('sendEmail', name.value, email.value, message.value);
    setTimeout(function() {
      window.location.replace("/thankyou");
    }, 2000);
  };

  return (
    <div className="ui middle aligned center aligned grid">
		  <div className="column" style={{maxWidth: "450px", margin: "6rem auto"}}>
		    <h1 className="ui header" style={{textAlign: "left", marginBottom: "2rem"}}>
	          Contact us 👳
	          <div className="sub header">
	              Questions, comments or suggestions, we want to hear from you.
	          </div>
	      </h1>
		    <form className="ui large form" onSubmit={submitForm}>
		      <div className="ui stacked segment">
		        <div className="field">
		          <div className="ui left icon input">
		            <i className="user icon"></i>
		            <input type="text" name="name" placeholder="Name" ref={(input) => { name = input; }}/>
		          </div>
		        </div>
		        <div className="field">
		          <div className="ui left icon input">
		            <i className="at icon"></i>
		            <input type="text" name="email" placeholder="Email" ref={(input) => { email = input; }}/>
		          </div>
		        </div>
		        <div className="field" style={{textAlign: "left"}}>
					    <label>Message:</label>
					    <textarea ref={(input) => { message = input; }}></textarea>
					  </div>
					  <button className="ui button ui fluid large teal submit button" type="submit">Send</button>
		        {/*<div className="ui fluid large teal submit button" onClick={buttonPress}>Send</div>*/}
		      </div>
		      <div className="ui error message"></div>
		    </form>
		  </div>
		</div>
  )
};

export default ContactPage;
