import { Modal, Button } from 'react-bootstrap';
import React, { Component } from "react";
import User from './user.png';
import './style.css';
import { Input } from 'reactstrap';
import axios from 'axios';

 class MyVerticallyCenteredModal extends React.Component {
  constructor () {
    super();
    this.state = { 
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    }
  }
    logout() {
        //logout here
      localStorage.setItem('userType',null);
      localStorage.setItem('username',null);
      //this.props.history.push("/Frontpage");
      window.location.href = "http://localhost:3000/#/";
    }
    // changePassword(){
    //   // change password here
      
    // }

    oldPassword(value){
      this.setState({oldPassword: value.target.value})
    }

    newPassword(value){
      this.setState({newPassword: value.target.value})
    }

    newPasswordAgain(value){
      this.setState({newPasswordAgain: value.target.value})
    }

    changePassword(){
      // console.log(this.state.oldPassword)
      // console.log(this.state.newPassword)
      // console.log(this.state.newPasswordAgain)
      //here password change to backend
      // const errormessagebox = document.querySelector("#errormessagebox")
      // var currentPass = localStorage.getItem('password');
      // errormessagebox.innerHTML = currentPass;
      const errormessagebox = document.querySelector("#errormessageboxchangepass")
      const successmessagebox = document.querySelector("#successmessageboxchangepass")
      var currentPass = localStorage.getItem('password');
      var userId = localStorage.getItem('userId');
      var oldPass  = (Buffer.from(this.state.oldPassword)).toString('base64');
      if(this.state.oldPassword.length === 0){
        errormessagebox.innerHTML = "Sorry, please enter field correctly - Old password";
      }
      if(this.state.newPassword.length === 0){
        errormessagebox.innerHTML = "Sorry, please enter field correctly - New password";
      }
      if(this.state.newPasswordAgain.length === 0){
        errormessagebox.innerHTML = "Sorry, please enter field correctly - New Password Again";
      }
      else if(oldPass !== currentPass){
        errormessagebox.innerHTML = "Sorry, old password is inncorrect";
      }
      else if(this.state.newPassword !== this.state.newPasswordAgain)
      {
        errormessagebox.innerHTML = "Sorry,new passwords do not match.";
      }
      else{
        //errormessagebox.innerHTML = currentPass;
        var newPass = this.state.newPasswordAgain;
        axios.get('http://localhost:5000/changepassword/'+userId+'/'+newPass+'/').then(data => {
        console.log(data);
        if (data){
          errormessagebox.innerHTML = "";
          localStorage.setItem('password',(Buffer.from(newPass)).toString('base64'));
          successmessagebox.innerHTML = "Your password has been changed successfully.";
        }else {
          errormessagebox.innerHTML = "email already exist";
          successmessagebox.innerHTML = "";
        }
      })
      }
    }

    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              User settings
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4></h4>
            <Button 
            style={{backgroundColor: '#ed6c41', color: 'white'}}
            onClick={this.logout.bind(this)}
            >
                Log out
            </Button>
            <br></br>
            <br></br>
            <h4>Change password</h4>
            <i id="successmessageboxchangepass" style={{color: "green"}}></i>
            <i id="errormessageboxchangepass" style={{color: "red"}}></i>
            <p>Old password</p>
            <Input type="password" onChange={this.oldPassword.bind(this)} />
            <p>New password</p>
            <Input type="password" onChange={this.newPassword.bind(this)} />
            <p>New password again</p>
            <Input type="password" onChange={this.newPasswordAgain.bind(this)} />
            <Button 
            style={{backgroundColor: '#ed6c41', color: 'white', marginTop: '5px'}}
            onClick={this.changePassword.bind(this)}
            >
                Change Password
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  
  export default class App extends React.Component {
    constructor(...args) {
      super(...args);
  
      this.state = { 
        modalShow: false,
        oldPass: '',
        newPass: '',
        newPassAgain: ''
      };
    }
  
    render() {
      let modalClose = () => this.setState({ modalShow: false });
  
      return (
          <div>
            {/* <Button
                // variant="primary"
                onClick={() => this.setState({ modalShow: true })}
            > */}
            <img className="userImage" src={User}
            onClick={() => this.setState({ modalShow: true })}
            />
            {/* </Button> */}
    
            <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={modalClose}
            />
            
          </div>
      );
    }
  }
  