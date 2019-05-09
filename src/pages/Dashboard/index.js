import { Tabs, Tab } from 'react-bootstrap';
import HeaderImage from 'assets/images/header.png';
import axios from 'axios-jsonp-pro';
import React, { Component } from "react";
import './tabsStyle.css';
import Calendar from 'react-calendar';
import ParempiValinta from './parempivalinta.jpeg';
import Happy from './happy.png';
import Neutral from './neutral.png';
import Sad from './sad.png';
import Saimaa from './saimaantuki.jpg';
import Header from './Header';
import Footer from './Footer';
// import { Modal, Button } from 'react-bootstrap';
import './style.css';
import { Button, Input } from 'reactstrap';
import ForkKnife from './forkKnife.png';
import MenuImage from './menu.png';
import InfoSidebar from './infoSidebar.png';
import LogoutSidebar from './logoutSidebar.png';
import UserSidebar from './userSidebar.png';
import SideBar from '../../components/SideBar';
import UserSection from './Users.js';
import ProductSection from './Products';
import SchoolSection from './Schools';
import FeedbackSection from './Feedback';

var DummyData = require('./dummyData.json');
var session_response = [];

export default class Dashboard extends Component {

  constructor () {
    super();
    this.state = { 
      todayDate: '',
      todayFoodOne: '',
      todayFoodTwo: '',
      date: new Date(),

      foodOneName: '',
      foodOneIngredients: '',
      foodOneDiets: '',

      foodTwoName: '',
      foodTwoIngredients: '',
      foodTwoDiets: '',

      menuItemOne: '',
      menuItemTwo: '',
      menuItemThree: '',
      menuItemFour: '',
      menuItemFive: '',

      secondmenuItemOne: '',
      secondmenuItemTwo: '',
      secondmenuItemThree: '',
      secondmenuItemFour: '',
      secondmenuItemFive: '',

      modalShow: false,

      usersMobile: 'usersMobileOn',
      foodsMobile: 'foodsMobileOff',
      mobileSidebar: 'mobileSidebarOff',

      usersButtonGrey: '',
      foodsButtonGrey: '',
      schoolsButtonGrey: '',
      votesButtonGrey: '',

      usersection: 'block',
      productsection: 'none',
      schoolsection: 'none',
      feedbacksection: 'none',

      usersectionTitle: 'white',
      productsectionTitle: 'black',
      schoolsectionTitle: 'black',
      feedbacksectionTitle: 'black',

      mobileFeedback: 0,

    }
  }

  onChangeDate = date => this.setState({ date })
  

  // fetch data from here https://www.jamix.fi/ruokalistapalvelu/rest/haku/menu/12345/3?lang=fi&date=20190225
  componentDidMount() {
  // const user_type = localStorage.getItem('userType');
  // if(user_type !== "admin"){
  //   this.props.history.push("/#");
  // }
  this.setState({usersMobile: 'usersMobileOn', foodsMobile: 'foodsMobileOff', mobileSidebar: 'mobileSidebarOff',
    usersButtonGrey: '#afa9aa', foodsButtonGrey: '#ed6c41', schoolsButtonGrey: '#ed6c41', votesButtonGrey: '#ed6c41'});
      
  }
  //mobile page changes
  usersMobile() {
    this.setState({
    usersButtonGrey: '#afa9aa', foodsButtonGrey: '#ed6c41', schoolsButtonGrey: '#ed6c41', votesButtonGrey: '#ed6c41',
    usersection: 'block', productsection: 'none', schoolsection: 'none', feedbacksection: 'none',});
  }
  foodsMobile() {
    this.setState({
    usersButtonGrey: '#ed6c41', foodsButtonGrey: '#afa9aa', schoolsButtonGrey: '#ed6c41', votesButtonGrey: '#ed6c41',
    usersection: 'none', productsection: 'block', schoolsection: 'none', feedbacksection: 'none',});
  }
  schoolsMobile() {
    this.setState({
    usersButtonGrey: '#ed6c41', foodsButtonGrey: '#ed6c41', schoolsButtonGrey: '#afa9aa', votesButtonGrey: '#ed6c41',
    usersection: 'none', productsection: 'none', schoolsection: 'block', feedbacksection: 'none',});
  }
  votesMobile() {
    this.setState({
      usersButtonGrey: '#ed6c41', foodsButtonGrey: '#ed6c41', schoolsButtonGrey: '#ed6c41', votesButtonGrey: '#afa9aa',
      usersection: 'none', productsection: 'none', schoolsection: 'none', feedbacksection: 'block', mobileFeedback: 1});
  }
  
  //change section
  sectionChange(value){
    if (value == 1) {
      this.setState({usersection: 'block', productsection: 'none', schoolsection: 'none', feedbacksection: 'none',
      usersectionTitle: 'white', productsectionTitle: 'black', schoolsectionTitle: 'black', feedbacksectionTitle: 'black'});
    }
    else if (value == 2) {
      this.setState({usersection: 'none', productsection: 'block', schoolsection: 'none', feedbacksection: 'none',
      usersectionTitle: 'black', productsectionTitle: 'white', schoolsectionTitle: 'black', feedbacksectionTitle: 'black'});
    }
    else if (value == 3) {
      this.setState({usersection: 'none', productsection: 'none', schoolsection: 'block', feedbacksection: 'none',
      usersectionTitle: 'black', productsectionTitle: 'black', schoolsectionTitle: 'white', feedbacksectionTitle: 'black'});
    }
    else if (value == 4) {
      this.setState({usersection: 'none', productsection: 'none', schoolsection: 'none', feedbacksection: 'block',
      usersectionTitle: 'black', productsectionTitle: 'black', schoolsectionTitle: 'black', feedbacksectionTitle: 'white'});
    }
    console.log(value)
  }
  
  visitSite() {
    this.props.history.push("/Frontpage");
  }

  render() {
    
    let usersButton = {
      width: '25%', 
      border: 'none',
      backgroundColor: this.state.usersButtonGrey,
      float: 'left',
      textAlign: 'center',
      height: '60px',
      borderRight: 'solid 1px lightgrey'
    }

    let foodsButton = {
      width: '25%', 
      border: 'none',
      backgroundColor: this.state.foodsButtonGrey,
      float: 'left',
      textAlign: 'center',
      height: '60px',
      borderRight: 'solid 1px lightgrey'
    }

    let schoolsButton = {
      width: '25%', 
      border: 'none',
      backgroundColor: this.state.schoolsButtonGrey,
      float: 'left',
      textAlign: 'center',
      height: '60px',
      borderRight: 'solid 1px lightgrey'
    }

    let votesButton = {
      width: '25%', 
      border: 'none',
      backgroundColor: this.state.votesButtonGrey,
      float: 'left',
      textAlign: 'center',
      height: '60px'
    }

    return (

      <div>
      
      <div className="sidebar" style={{backgroundColor: '#ed6c41', width: '14%', height: '100%', top: '86px', maxHeight: '100%', borderRight: 'solid 2px grey'}}>
         

         <div className="sidebar-wrapper" style={{backgroundColor: '#ed6c41', height: '100%', padding: '20px'}}>
         <div style={{width: '100%', paddingLeft: '10px'}}>
            <a onClick={this.visitSite.bind(this)}><h4 style={{color: "black", marginTop: '0px', paddingBottom: '10px', borderBottom: 'solid 1px grey'}}>Vieraile sivulla</h4></a>
          </div>
          <div style={{width: '100%', paddingLeft: '10px'}}>
            <a onClick={this.sectionChange.bind(this, 1)}><h4 style={{color: this.state.usersectionTitle, marginTop: '0px', paddingBottom: '10px', borderBottom: 'solid 1px grey'}}>Käyttäjät</h4></a>
          </div>
          <div style={{width: '100%', paddingLeft: '10px'}}>
            <a onClick={this.sectionChange.bind(this, 2)}><h4 style={{color: this.state.productsectionTitle, marginTop: '0px', paddingBottom: '10px', borderBottom: 'solid 1px grey'}}>Ateriat</h4></a>
          </div>
          <div style={{width: '100%', paddingLeft: '10px'}}>
            <a onClick={this.sectionChange.bind(this, 3)}><h4 style={{color: this.state.schoolsectionTitle, marginTop: '0px', paddingBottom: '10px', borderBottom: 'solid 1px grey'}}>Koulut</h4></a>
          </div>
          <div style={{width: '100%', paddingLeft: '10px'}}>
            <a onClick={this.sectionChange.bind(this, 4)}><h4 style={{color: this.state.feedbacksectionTitle, marginTop: '0px', paddingBottom: '10px', borderBottom: 'solid 1px grey'}}>Äänet & Tykkäykset</h4></a>
          </div>
          
          
          </div> 
         
      </div>
      <Header />
      <div className="content dashboardContent" style={{minHeight: '90vh'}}>

      <div className="card" style={{marginBottom: '0px'}}>
        <div className="content content-full-width" style={{padding: '0px'}}>
        {/* specific pages here, showing the page what user wants to */}
          <div style={{display: this.state.usersection}}>
            <UserSection />
          </div>
          <div style={{display: this.state.productsection}}>
            <ProductSection />
          </div>
          <div style={{display: this.state.schoolsection}}>
            <SchoolSection />
          </div>
          <div style={{display: this.state.feedbacksection}}>
            <FeedbackSection 
              mobile={this.state.mobileFeedback}
            />
          </div>

        </div>


      </div>
      
      
      
      {/* <div className="footerDiv" style={{bottom: '0px', position: 'absolute', width: '86%'}}>
        <Footer />
      </div> */}

      
      
      

  </div>
        <div className="mobileFooterMenuDashboard">
          <div style={usersButton}>
            <Button 
            style={{border: 'none'}}
            onClick={this.usersMobile.bind(this)}
            
            >
              {/* <img src={ForkKnife} style={{marginTop: '5px', width: '25px'}}/> */}
              <p style={{color: 'white', marginTop: '10px'}}>Users</p>  
            </Button>
          </div>
          <div style={foodsButton}>
            <Button
            style={{border: 'none'}}
            onClick={this.foodsMobile.bind(this)}
            >
              {/* <img src={ForkKnife} style={{marginTop: '5px', width: '25px'}}/>   */}
              <p style={{color: 'white', marginTop: '10px'}}>Foods</p>  
            </Button>
          </div>
          <div style={schoolsButton}>
            <Button
            style={{border: 'none'}}
            onClick={this.schoolsMobile.bind(this)}
            >
              {/* <img src={ForkKnife} style={{marginTop: '5px', width: '25px'}}/>   */}
              <p style={{color: 'white', marginTop: '10px'}}>Schools</p>  
            </Button>
          </div>
          <div style={votesButton}>
            <Button
            style={{border: 'none'}}
            onClick={this.votesMobile.bind(this)}
            >
              {/* <img src={ForkKnife} style={{marginTop: '5px', width: '25px'}}/>   */}
              <p style={{color: 'white', marginTop: '10px', fontSize: '14px'}}>Votes & Likes</p>  
            </Button>
          </div>
      </div>
  </div>
    );
  }
}
