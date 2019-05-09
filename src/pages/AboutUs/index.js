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

      todayMobile: 'todayMobileOn',
      monthMobile: 'monthMobileOff',
      mobileSidebar: 'mobileSidebarOff',

      todayButtonGrey: '',
      monthButtonGrey: '',
      menuButtonGrey: '',

    }
  }

  onChangeDate = date => this.setState({ date })
  
  ////////////////// session work in progress /////
  session_response = axios.get('localhost:8081/login/1/MTIzNDU2/').then(data => {console.log(data);}); 
  if(session_response) {
    this.props.history.push("/Dashboard");
  }
///////////////// work in progress

  // fetch("http://localhost:5000/get_session_data/").then(response => response.json())
  // .then(data =>{
  //     if (data.length > 0){
  //       this.props.history.push("/Dashboard");
  //     }
  //     else{
  //       this.props.history.push("/Login");
  //       //errormessagebox.innerHTML = "Wrong username or password.";
  //     }
  // });
  

  // fetch data from here https://www.jamix.fi/ruokalistapalvelu/rest/haku/menu/12345/3?lang=fi&date=20190225
  componentDidMount() {
    

  this.setState({todayMobile: 'todayMobileOn', monthMobile: 'monthMobileOff', mobileSidebar: 'mobileSidebarOff',
    todayButtonGrey: '', monthButtonGrey: '', menuButtonGrey: ''});
      
  }

  todayMobile() {
    this.setState({todayMobile: 'todayMobileOn', monthMobile: 'monthMobileOff', mobileSidebar: 'mobileSidebarOff',
    todayButtonGrey: '#afa9aa', monthButtonGrey: '', menuButtonGrey: ''});
    this.props.history.push("/Frontpage");
  }
  monthMobile() {
    this.setState({todayMobile: 'todayMobileOff', monthMobile: 'monthMobileOn', mobileSidebar: 'mobileSidebarOff',
    todayButtonGrey: '', monthButtonGrey: '#afa9aa', menuButtonGrey: ''});
  }
  showMenu() {
    
    if (this.state.mobileSidebar === "mobileSidebarOn"){
      this.setState({mobileSidebar: 'mobileSidebarOff',
      todayButtonGrey: '', monthButtonGrey: '', menuButtonGrey: ''});
    }
    else if (this.state.mobileSidebar === "mobileSidebarOff"){
      this.setState({mobileSidebar: 'mobileSidebarOn',
      todayButtonGrey: '', monthButtonGrey: '', menuButtonGrey: '#afa9aa'});
    }
  }

  
  profilepage() {
    this.props.history.push("/Profile");
  }
  aboutpage() {
    this.props.history.push("/AboutUs");
  }

  render() {
    
    let todayButton = {
      width: '33%', 
      border: 'none',
      backgroundColor: this.state.todayButtonGrey,
      float: 'left',
      textAlign: 'center',
      height: '60px',
      borderRight: 'solid 1px lightgrey'
    }

    let monthButton = {
      width: '33%', 
      border: 'none',
      backgroundColor: this.state.monthButtonGrey,
      float: 'left',
      textAlign: 'center',
      height: '60px',
      borderRight: 'solid 1px lightgrey'
    }

    let menuButton = {
      width: '33%', 
      border: 'none',
      backgroundColor: this.state.menuButtonGrey,
      float: 'left',
      textAlign: 'center',
      height: '60px'
    }

    return (
      <div>
      <div className="content" style={{padding: '0px', backgroundColor: '#ececec'}}>
      
      <Header />
    
      <div className="card"  style={{border: '2px solid #a7a7a7', width: '90%', marginLeft: '5%'}}>
          <div className="header">
            <h4 className="title" style={{textAlign: 'center'}}>About us</h4>
          </div>
          <div style={{margin: '50px'}}>
            <p>
            What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.            </p>
          </div>

        </div>

      <div className="footerDiv">
        <Footer />
      </div>

      
      

  </div>


  <div className={this.state.mobileSidebar}>
  <div style={{width: '100%', marginLeft: '5px', color: 'white'}} onClick={this.profilepage.bind(this)}>
      <img src={UserSidebar} style={{marginTop: '5px', width: '25px'}} /> Profile
  </div>
  <div style={{width: '100%', marginLeft: '5px', color: 'white'}} onClick={this.aboutpage.bind(this)}>
    <img src={InfoSidebar} style={{marginTop: '5px', width: '25px'}} /> About
  </div>
  <div style={{width: '100%', marginLeft: '5px', color: 'white'}}>
    <img src={LogoutSidebar} style={{marginTop: '5px', width: '25px'}} /> Log out
  </div>
  </div>

  <div className="mobileFooterMenu">
    <div style={todayButton}>
      <Button 
      style={{border: 'none'}}
      onClick={this.todayMobile.bind(this)}
      
      >
        <img src={ForkKnife} style={{marginTop: '5px', width: '25px'}}/>
        <p style={{color: 'white'}}>Frontpage</p>  
      </Button>
    </div>
    <div style={monthButton}>
      {/* <Button
      style={{border: 'none'}}
      onClick={this.monthMobile.bind(this)}
      >
        <img src={ForkKnife} style={{marginTop: '5px', width: '25px'}}/>  
        <p style={{color: 'white'}}>Monthly</p>  
      </Button> */}
    </div>
    <div style={menuButton}>
      <Button
      style={{border: 'none'}}
      onClick={this.showMenu.bind(this)}
      >
        <img src={MenuImage} style={{marginTop: '5px', width: '25px'}}/>  
        <p style={{color: 'white'}}>Menu</p>  
      </Button>
    </div>
  </div>
  </div>
  
    );
  }
}
