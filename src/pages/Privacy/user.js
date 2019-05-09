import { Modal, Button } from 'react-bootstrap';
import React, { Component } from "react";
import User from './user.png';
import './style.css';


 class MyVerticallyCenteredModal extends React.Component {

    logout() {
        console.log("log out");
        //logout here
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
  
      this.state = { modalShow: false };
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
  