import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import {Button, Input, ButtonInput}   from 'react-bootstrap'
import auth from './auth'
import ReactDOM from 'react-dom'; 
var ButtonInputExample = React.createClass({
  getInitialState() {
    return {
      disabled: true,
      style: null,
      auth:false,
    };
  },

  resetValidation() {
    this.setState({
      disabled: true,
      style: null
    });
  },

  validationState() {
    let user_length = this.refs.user.getValue().length;
    let pwd_length = this.refs.pwd.getValue().length;
    let style = 'danger';



    if (user_length > 8 && pwd_length >8 ) style = 'success';
    else if (user_length > 5 && pwd_length > 5 ) style = 'warning';

    let disabled = style !== 'success';
  
    return { style, disabled };
  },



  handleChange() {
    this.setState( this.validationState() );
  },


  handleSubmit(event) {
    event.preventDefault();
    const email = this.refs.user.getValue()
    const pass = this.refs.pwd.getValue()
    console.info("email=" + email + " pass="+pass);
    auth.login(email, pass, (loggedIn) => {
    if (!loggedIn){
      console.info("Username or password error!");
      return;
    }
        
    this.setState({ auth: true});
    this.props.callbackParent_try(email);
    console.info("login success");
/*
      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
*/
    })
  },
  
  render() {
    console.info("ButtonInputExample this.props.user: " + this.props.user);
    return (
      <div>
      {( this.props.user)&&
        <h1>{this.props.user} login success</h1>  
      ||
        <form onSubmit={this.handleSubmit} ref="loginForm">
          <Input type="text" ref="user"  label="User name"/>
          <Input type="password" ref="pwd"  label="Password" onChange={this.handleChange}/>
          <ButtonInput type="reset" value="Reset" bsStyle="info" onClick={this.resetValidation} />
          <ButtonInput type="submit" value="Submit" bsStyle={this.state.style} bsSize="large" disabled={this.state.disabled} />
        </form>
      }
      </div>
    );
  }
});



var Trigger = React.createClass({

  getDefaultProps:function(){
    return {
      visable: false,
    }
  },  
  
  handleClose(){        
    this.props.callbackParent(false);
  },

  onChildChanged_try: function(newState) {
    console.info("Trigger newState: " + newState);
    this.props.callbackParent_root(newState);       
  },

  render() {
    //let close = () => this.setState({ visable: false});
    console.info("props.user: "+ this.props.user);
    
    return (
      <div className="modal-container" style={{height: 500}}>                

        <Modal
          show={this.props.visable}
          onHide={this.handleClose}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Welcome back</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modalBody">                       
            <ButtonInputExample user={this.props.user} callbackParent_try={this.onChildChanged_try}  />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} onChange={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});


export default Trigger;