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

      foodOneId:'',
      foodOneName: '',
      foodOneIngredients: '',
      foodOneDiets: '',

      foodTwoId:'',
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

      happyOpacityFirst: '1',
      neutralOpacityFirst: '1',
      sadOpacityFirst: '1',

      happyOpacitySecond: '1',
      neutralOpacitySecond: '1',
      sadOpacitySecond: '1',

      futureOptions: 'none',
      votefirstBackground: '',
      votesecondBackground: '',
      votefirstIcon: Happy,
      votesecondIcon: Happy,

      likedfirst: '',
      dislikedfirst: '',
      likedsecond: '',
      dislikedsecond: '',

    }
    function formatDate() {
      var d = new Date(),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return [year, month, day].join('-');
  }
  
    // window.onload = function name(){
      
    //   //let selecteddata = document.getElementById("show_selected_date");
    //   try{
    //     var x = document.getElementById("show_selected_date");
    //     x.style.display = "none";
    //     var mobile_show_selected_date = document.getElementById("mobile_show_selected_date");
    //     mobile_show_selected_date.style.display = "none";
    //   }
    //   catch(err){
    //     throw err;
    //   }
      
    //   let today_date = formatDate();
    //   console.log(today_date);
    //   let roughlist = [];
    //   let row = null;
    //   if(today_date){
    //     // web 
    //     let web_foodonedate = document.querySelector("#web_foodonedate");
    //     web_foodonedate.innerHTML = today_date;
    //     let web_foodtwodate = document.querySelector("#web_foodtwodate");
    //     web_foodtwodate.innerHTML = today_date;
    //     let web_foodonetitle = document.querySelector("#web_foodonetitle");
    //     let web_foodtwotitle = document.querySelector("#web_foodtwotitle");
    //     let web_foodonedescription = document.querySelector("#web_foodonedescription");
    //     let web_foodtwodescription = document.querySelector("#web_foodtwodescription");
    //     // mobile
    //     let mob_foodonedate = document.querySelector("#mob_foodonedate");
    //     mob_foodonedate.innerHTML = today_date;
    //     let mob_foodtwodate = document.querySelector("#mob_foodtwodate");
    //     mob_foodtwodate.innerHTML = today_date;
    //     let mob_foodonetitle = document.querySelector("#mob_foodonetitle");
    //     let mob_foodonedescription = document.querySelector("#mob_foodonedescription");
    //     let mob_foodtwotitle = document.querySelector("#mob_foodtwotitle");
    //     let mob_foodtwodescription = document.querySelector("#mob_foodtwodescription");
    //   fetch("http://localhost:5000/getfood/"+today_date+"/1/").then(response => response.json()).then(data =>{
    //        for (let j=0; j < data.length; j++){
    //           if(j == 0) {
    //             web_foodonetitle.innerHTML = data[j].food_name;
    //             web_foodonedescription.innerHTML = data[j].description;
    //             //mob
    //             mob_foodonetitle.innerHTML = data[j].food_name;
    //             mob_foodonedescription.innerHTML = data[j].description;
    //           }
    //           if(j == 1) {
    //             web_foodtwotitle.innerHTML = data[j].food_name;
    //             web_foodtwodescription.innerHTML = data[j].description;
    //             mob_foodtwotitle.innerHTML = data[j].food_name;
    //             mob_foodtwodescription.innerHTML = data[j].description;
    //           }
    //        }

    //    });
    //   console.log(roughlist);
      
    //   }
      
    // }
    
  }

  formatDate2(value) {
    //var d = value,
    var month = '' + (value.getMonth() + 1)
    var day = '' + value.getDate()
    var year = value.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  
  
  
  // fetch data from here https://www.jamix.fi/ruokalistapalvelu/rest/haku/menu/12345/3?lang=fi&date=20190225
  componentDidMount() {
    //examples below
    let foodID1 = this.props.foods.foodOneId;
    let foodoneName = this.props.foods.foodOneName;
    let foodoneIngredients = this.props.foods.foodOneIngredients;
    let foodoneDiets = this.props.foods.foodOneDiets;

    let foodID2 = this.props.foods.foodTwoId;
    let foodtwoName = this.props.foods.foodTwoName;
    let foodtwoIngredients = this.props.foods.foodTwoIngredients;
    let foodtwoDiets = this.props.foods.foodTwoDiets;
    
    this.setState({foodOneId:foodID1, foodOneName: foodoneName, foodOneIngredients: foodoneIngredients, foodOneDiets: foodoneDiets,
        foodTwoId:foodID2, foodTwoName: foodtwoName, foodTwoIngredients: foodtwoIngredients,foodTwoDiets: foodtwoDiets });
        
    // const monthly_web_ingrediants_one = document.querySelector("#monthly_web_ingrediants_one");
    // monthly_web_ingrediants_one.innerHTML = this.props.foods.foodOneDiets
    // const monthly_web_ingrediants_two = document.querySelector("#monthly_web_ingrediants_two");
    // monthly_web_ingrediants_two.innerHTML = this.props.foods.foodTwoDiets
        

  this.setState({todayMobile: 'todayMobileOn', monthMobile: 'monthMobileOff', mobileSidebar: 'mobileSidebarOff',
    todayButtonGrey: '#afa9aa', monthButtonGrey: '', menuButtonGrey: ''});
      
  }

  todayMobile() {
    this.setState({todayMobile: 'todayMobileOn', monthMobile: 'monthMobileOff', mobileSidebar: 'mobileSidebarOff',
    todayButtonGrey: '#afa9aa', monthButtonGrey: '', menuButtonGrey: ''});
  }
  monthMobile() {
    this.setState({todayMobile: 'todayMobileOff', monthMobile: 'monthMobileOn', mobileSidebar: 'mobileSidebarOff',
    todayButtonGrey: '', monthButtonGrey: '#afa9aa', menuButtonGrey: ''});
  }
  showMenu() {
    
    if (this.state.mobileSidebar === "mobileSidebarIsOn"){
      this.setState({mobileSidebar: 'mobileSidebarOff',
      todayButtonGrey: '', monthButtonGrey: '', menuButtonGrey: ''});
    }
    else if (this.state.mobileSidebar === "mobileSidebarOff"){
      this.setState({mobileSidebar: 'mobileSidebarIsOn',
      todayButtonGrey: '', monthButtonGrey: '', menuButtonGrey: '#afa9aa'});
    }
  }

  profilepage() {
    this.props.history.push("/Profile");
  }
  aboutpage() {
    this.props.history.push("/AboutUs");
  }

  //votes
  async votefirst(food_id,schedule_date){
    //console.log(value);
    
    //var foodid = document.getElementById("showall_monthly_web_hidden_food_id_one").textContent;
    //console.log(value);
    var userid = localStorage.getItem("userId");
    //console.log(userid);
    //console.log(value2);
    var r = window.confirm("Are you want to submit this vote?");
    if (r == true) {
      let signupoutput = await JSON.stringify(axios.get('http://localhost:5000/postfuturingvoting/'+food_id+'/'+userid+'/like/'+schedule_date+'/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been done.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }

    this.setState({ likedfirst: 'lightgreen', dislikedfirst: '', likedsecond: '', dislikedsecond: 'lightcoral',
      
    votefirstIcon: Happy, votesecondIcon: Sad})
  //   this.setState({votefirstBackground: 'lightgreen', votesecondBackground: 'lightcoral',
  // votefirstIcon: Happy, votesecondIcon: Sad})
    //here background things for voting the first one
  }
  dislike(foodid){
    //var foodid = document.getElementById("showall_monthly_web_hidden_food_id_two").textContent;
    console.log(foodid);
    var userid = localStorage.getItem("userId");
    console.log(userid);
    var r = window.confirm("Are you want to change this vote?");
    if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/removevoting/'+foodid+'/'+userid+'/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been remove.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }
    
    
    this.setState({likedfirst: '', dislikedfirst: 'lightcoral', likedsecond: 'lightgreen', dislikedsecond: '',
      
    votefirstIcon: Sad, votesecondIcon: Happy})
    // this.setState({votefirstBackground: 'lightcoral', votesecondBackground: 'lightgreen',
    // votefirstIcon: Sad, votesecondIcon: Happy})
    //here background things for voting the scond one one
  }

  //insert or update database with these voted below
  happyfirst(foodid) {
   //voted happy for first menu
  var userid = localStorage.getItem("userId");
  var r = window.confirm("Are you want to submit this rate?");
  if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postvoting/'+foodid+'/'+userid+'/3/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been done.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }
    this.setState({happyOpacityFirst: '1', neutralOpacityFirst: '0.2', sadOpacityFirst: '0.2'})
  }
  neutralfirst(foodid) {
    //voted neutral
    var userid = localStorage.getItem("userId");
  var r = window.confirm("Are you want to submit this rate?");
  if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postvoting/'+foodid+'/'+userid+'/2/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been done.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }
    this.setState({happyOpacityFirst: '0.2', neutralOpacityFirst: '1', sadOpacityFirst: '0.2'})
  }
  sadfirst(foodid) {
    //voted sad
  var userid = localStorage.getItem("userId");
  var r = window.confirm("Are you want to submit this rate?");
  if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postvoting/'+foodid+'/'+userid+'/1/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been done.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }
    this.setState({happyOpacityFirst: '0.2', neutralOpacityFirst: '0.2', sadOpacityFirst: '1'})
  }

  happysecond(foodid) {
    //voted happy for second menu
  var userid = localStorage.getItem("userId");
  var r = window.confirm("Are you want to submit this rate?");
  if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postvoting/'+foodid+'/'+userid+'/3/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been done.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }
    this.setState({happyOpacityFirst: '0.2', neutralOpacityFirst: '0.2', sadOpacityFirst: '1'})
  }
  neutralsecond(foodid) {
    //voted neutral for second menu
  var userid = localStorage.getItem("userId");
  var r = window.confirm("Are you want to submit this rate?");
  if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postvoting/'+foodid+'/'+userid+'/3/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been done.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }
    this.setState({happyOpacitySecond: '0.2', neutralOpacitySecond: '1', sadOpacitySecond: '0.2'})

  }
  sadsecond(foodid) {
    //voted sad for second menu
  var userid = localStorage.getItem("userId");
  var r = window.confirm("Are you want to submit this rate?");
  if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postvoting/'+foodid+'/'+userid+'/3/').then(data => {
        console.log(data);
        if (data){
          alert("Thanks, voting has been done.");
        }else {
          alert("cancelled");
        }
      })
      );
    } else {
      alert("cancelled");
    }
    this.setState({happyOpacitySecond: '0.2', neutralOpacitySecond: '0.2', sadOpacitySecond: '1'})
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
      
     
      <div className="card" style={{marginBottom: '0px'}}>
        <div className="content content-full-width" style={{padding: '0px'}}>
          
              
              <div id="monthly_not_available_list"></div>

              <div id="show_selected_date" className="row" style={{backgroundColor: '#ececec'}}>
                <div className="col-md-6 foodProduct" style={{width: '49%', marginLeft: '10px', paddingLeft: '10px'}}>
                
                  <div className="card" style={{border: '2px solid #a7a7a7', }}>
                  <div style={{width: '100%'}}>
                  <img src={ParempiValinta} className="parempiValintaImage" />
                    <div className="header"  style={{paddingTop: '0px'}}>
                      <div style={{width: '50%'}}>
                        <h4 id="monthly_web_foodonetitle" className="title" style={{width: '50%', color: 'black' , fontSize: '20px', marginBottom: '5px', float: 'left', marginRight: '10%'}}>Lounas</h4>
                        <p id="monthly_web_foodonedate" style={{marginBottom: '0px', float: 'left', width: '50%'}}>{this.props.foods.dateOne} </p>
                      </div>
                     
                      {this.props.mode == 'future' ? (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                        {/* <img src={this.state.votefirstIcon} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', }}  onClick={this.votefirst.bind(this)}/> */}
                        <Button
                        onClick={this.votefirst.bind(this,this.state.foodOneId,this.props.foods.dateOne)}
                        style={{color: 'black', backgroundColor: this.state.likedfirst, marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.dislike.bind(this,this.state.foodOneId)}
                        style={{color: 'black', backgroundColor: this.state.dislikedfirst}}
                        >
                          En tykkää
                        </Button>
                      </div>
                      ) : (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Arvostele ruoka</span>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.happyOpacityFirst}}  onClick={this.happyfirst.bind(this,this.state.foodOneId)}/>
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.neutralOpacityFirst}} onClick={this.neutralfirst.bind(this,this.state.foodOneId)} />
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.sadOpacityFirst}} onClick={this.sadfirst.bind(this,this.state.foodOneId)} />
                        </div>
                      ) 
                      }
                    
                      
                    </div>
                    

                    <div className="content" style={{paddingBottom: '0px'}}>
                    
                    <p id="monthly_web_ingrediants_one" style={{fontSize: '14px'}} dangerouslySetInnerHTML={{__html: this.props.foods.foodOneDiets}}>
                    {/* <b>{this.props.foods.foodOneName}</b><br></br> */}
                    {/* {} */}
                    </p>
                  </div>
                  <p id="monthly_web_foodtwodescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                    {/* {this.props.foods.foodOneName} */}
                    </p>
                    {/* <div style={{width: '100%', marginLeft: '18%'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Rate</span>
                        <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px'}} />
                        <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px'}} />
                        <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px'}} />
                    </div> */}
                    {/* <button className="btn btn-fill btn-info" style={{float:'right'}}>Vote</button> */}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 foodProductTwo" style={{width: '49%', paddingLeft: '10px', paddingRight: '0px'}}>
                  <div className="card"  style={{border: '2px solid #a7a7a7', }}>
                  <div style={{width: '100%'}}>
                  <img src={ParempiValinta} className="parempiValintaImage" />
                  
                  <div className="header"  style={{paddingTop: '0px'}}>
                      <div style={{width: '50%'}}>
                        <h4 id="monthly_web_foodtwotitle" className="title" style={{width: '50%', color: 'black' , fontSize: '20px', marginBottom: '5px', float: 'left', marginRight: '10%'}}>Lounas</h4>
                        <p id="monthly_web_foodtwodate" style={{marginBottom: '0px', float: 'left', width: '50%'}}>{this.props.foods.dateTwo} </p>
                      </div>
                    
                      {this.props.mode == 'future' ? (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                          {/* <img src={this.state.votesecondIcon} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px',}} onClick={this.votesecond.bind(this)} /> */}
                          <Button
                        onClick={this.votefirst.bind(this,this.state.foodTwoId,this.props.foods.dateTwo)}
                        style={{color: 'black', backgroundColor: this.state.likedsecond, marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.dislike.bind(this,this.state.foodTwoId)}
                        style={{color: 'black', backgroundColor: this.state.dislikedsecond}}
                        >
                          En tykkää
                        </Button>
                        </div>
                      ) : (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Arvostele ruoka</span>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.happyOpacitySecond}} onClick={this.happysecond.bind(this,this.state.foodTwoId)} />
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.neutralOpacitySecond}} onClick={this.neutralsecond.bind(this,this.state.foodTwoId)} />
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.sadOpacitySecond}} onClick={this.sadsecond.bind(this,this.state.foodTwoId)} />
                        </div>
                      ) 
                      }
                      
                      
                    </div>
                    <div className="content" style={{paddingBottom: '0px'}}>
                    <p id="monthly_web_ingrediants_two" style={{fontSize: '14px'}} dangerouslySetInnerHTML={{__html: this.props.foods.foodTwoDiets}}>
                    {/* <b>{this.props.foods.foodTwoName}</b><br></br> */}
                    {/* {this.props.foods.foodTwoDiets} */}
                    </p>
                  </div>
                    <p id="monthly_web_foodtwodescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                    {/* {this.props.foods.foodTwoName} */}
                    </p>
                    {/* <div style={{width: '100%', marginLeft: '18%'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Rate</span>
                        <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px'}} />
                        <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px'}} />
                        <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px'}} />
                    </div> */}

                    </div>
                  </div>
                </div>

              </div>
           
          {/* mobile pages */}

          

          <div className={this.state.todayMobile}>
            <div className="row" style={{backgroundColor: '#ececec'}}>
            <div style={{textAlign: 'center', color: '#ed6c41', borderBottom: '3px solid #ababab', marginBottom: '4px', width: '50%', marginLeft: '25%'}}>
              <h3 style={{marginBottom: '3px'}}><b>Tänään</b></h3>
            </div>
                  <div className="col-md-6 foodProduct" style={{width: '49%', marginLeft: '10px', paddingLeft: '10px'}}>
                    <i>{this.props.foods.foodOneName}</i>
                    <div className="card" style={{border: '2px solid #a7a7a7', marginBottom: '3px'}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 id="mob_foodonetitle"  className="title" style={{color: 'black'}}>{this.props.foods.foodOneName}</h4>
                        <p id="mob_foodonedate"> </p>
                      </div>
                      <div className="content" style={{paddingBottom: '0px', paddingTop: '0px'}}>
                      
                      <p style={{fontSize: '14px'}}>{this.state.menuItemTwo},
                      {this.state.menuItemThree},
                      {this.state.menuItemFour},
                      {this.state.menuItemFive}</p>
                    </div>
                      <p id="mob_foodonedescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                        
                      </p>

                     {this.props.mode == 'future' ? (
                        <div style={{width: '100%', textAlign: 'left'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                          {/* <img src={this.state.votefirstIcon} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', }}  onClick={this.votefirst.bind(this)}/> */}
                          <Button
                        onClick={this.votefirst.bind(this,this.state.foodOneId,this.props.foods.dateOne)}
                        style={{color: 'black', backgroundColor: this.state.likedfirst, marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.dislike.bind(this,this.state.foodOneId)}
                        style={{color: 'black', backgroundColor: this.state.dislikedfirst}}
                        >
                          En tykkää
                        </Button>
                        </div>
                      ) : (
                        <div style={{width: '100%', textAlign: 'left'}}>
                        
                            <h4 style={{marginRight: '5px', marginTop: '0px', marginBottom: '0px', float: 'left', marginLeft:'1%'}}>Arvostele ruoka</h4>
                            <img src={Happy} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.happyOpacityFirst}} onClick={this.happyfirst.bind(this,this.state.foodOneId)}/>
                            <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.neutralOpacityFirst}}  onClick={this.neutralfirst.bind(this,this.state.foodOneId)} />
                            <img src={Sad} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.sadOpacityFirst}}  onClick={this.sadfirst.bind(this,this.state.foodOneId)} />
                        
                        </div>
                      ) 
                      }
                      {/* <button className="btn btn-fill btn-info" style={{float:'right'}}>Vote</button> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 foodProductTwo" style={{width: '49%', paddingLeft: '10px', paddingRight: '0px'}}>
                    <div className="card"  style={{border: '2px solid #a7a7a7', marginBottom: '3px'}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                    
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 id="mob_foodtwotitle" className="title" style={{color: 'black'}}>{this.props.foods.foodTwoName}</h4>
                        <p id="mob_foodtwodate"> </p>
                      </div>
                      <div className="content" style={{paddingBottom: '0px', paddingTop: '0px'}}>
                      <p style={{fontSize: '14px'}}>{this.state.secondmenuItemTwo},
                      {this.state.secondmenuItemThree},
                      {this.state.secondmenuItemFour},
                      {this.state.secondmenuItemFive}</p>
                    </div>
                      <p id="mob_foodtwodescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                    
                      </p>

                      {this.props.mode == 'future' ? (
                        <div style={{width: '100%', textAlign: 'left'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                          {/* <img src={this.state.votesecondIcon} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px',}} onClick={this.votesecond.bind(this)} /> */}
                          <Button
                        onClick={this.votefirst.bind(this,this.state.foodTwoId,this.props.foods.dateTwo)}
                        style={{color: 'black', backgroundColor: this.state.likedsecond, marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.dislike.bind(this,this.state.foodTwoId)}
                        style={{color: 'black', backgroundColor: this.state.dislikedsecond}}
                        >
                          En tykkää
                        </Button>
                        </div>
                      ) : (
                        <div style={{width: '100%', textAlign: 'left'}}>
                            <h4 style={{marginRight: '5px', marginTop: '0px', marginBottom: '0px', float: 'left', marginLeft:'1%'}}>Arvostele ruoka</h4>
                            <img src={Happy} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.happyOpacitySecond}} onClick={this.happysecond.bind(this,this.state.foodTwoId)}/>
                            <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.neutralOpacitySecond}}  onClick={this.neutralsecond.bind(this,this.state.foodTwoId)}/>
                            <img src={Sad} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.sadOpacitySecond}} onClick={this.sadsecond.bind(this,this.state.foodTwoId)} />
                        </div>
                      ) 
                      }

                      </div>
                    </div>
                  </div>

                </div>
              </div>
          
        </div>

        <div className={this.state.monthMobile}>
          <div style={{textAlign: 'center', color: '#ed6c41', borderBottom: '3px solid #ababab', marginBottom: '4px', width: '75%', marginLeft: '10%'}}>
              <h3 style={{marginBottom: '3px'}}><b>Kuukauden menu</b></h3>
          </div>
          <div style={{width: '100%'}}>
            {/* <Calendar
            className="calendarStyle"
              // style={{width: '100%'}}
              onChange={this.onChangeDate.bind(this)}
              value={this.state.date}
            /> */}
            <div id="monthly_not_available_list"></div>
            <div id = "mobile_show_selected_date"> 
                <div className="col-md-6 foodProduct" style={{width: '49%', marginLeft: '10px', paddingLeft: '10px'}}>
                    <div className="card" style={{border: '2px solid #a7a7a7', marginBottom: '3px', backgroundColor: this.state.votefirstBackground}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 id="monthly_mob_foodonetitle"  className="title" style={{color: 'black'}}>Lounas</h4>
                        <p id="monthly_mob_foodonedate">{this.props.foods.dateOne}  </p>
                      </div>
                      <div className="content" style={{paddingBottom: '0px', paddingTop: '0px'}}>
                      
                      <p style={{fontSize: '14px'}}  dangerouslySetInnerHTML={{__html: this.props.foods.foodOneDiets}}>
                      {/* {this.state.menuItemTwo},
                      {this.state.menuItemThree},
                      {this.state.menuItemFour},
                      {this.state.menuItemFive} */}
                      </p>
                    </div>
                      <p id="monthly_mob_foodonedescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                        
                      </p>

                        {this.props.mode == 'future' ? (
                        <div style={{width: '100%', textAlign: 'left'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                          {/* <img src={this.state.votefirstIcon} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', }}  onClick={this.votefirst.bind(this)}/> */}
                          <Button
                        onClick={this.votefirst.bind(this)}
                        style={{color: 'black', backgroundColor: 'lightgreen', marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.dislike.bind(this)}
                        style={{color: 'black', backgroundColor: 'lightcoral'}}
                        >
                          En tykkää
                        </Button>
                        </div>
                      ) : (
                        <div style={{width: '100%', textAlign: 'left'}}>
                        
                            <h4 style={{marginRight: '5px', marginTop: '0px', marginBottom: '0px', float: 'left', marginLeft:'1%'}}>Arvostele ruoka</h4>
                            <img src={Happy} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.happyOpacityFirst}} onClick={this.happyfirst.bind(this)}/>
                            <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.neutralOpacityFirst}}  onClick={this.neutralfirst.bind(this)} />
                            <img src={Sad} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.sadOpacityFirst}}  onClick={this.sadfirst.bind(this)} />
                        
                        </div>
                      ) 
                      }
                      

                      
                      {/* <button className="btn btn-fill btn-info" style={{float:'right'}}>Vote</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 foodProductTwo" style={{width: '49%', paddingLeft: '10px', paddingRight: '0px'}}>
                    <div className="card"  style={{border: '2px solid #a7a7a7', marginBottom: '3px', backgroundColor: this.state.votesecondBackground}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                    
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 className="title" style={{color: 'black'}}>Lounas</h4>
                        <p>{this.props.foods.dateTwo} </p>
                      </div>
                      <div className="content" style={{paddingBottom: '0px', paddingTop: '0px'}}>
                      <p style={{fontSize: '14px'}} dangerouslySetInnerHTML={{__html: this.props.foods.foodTwoDiets}}>
                      {/* {this.state.secondmenuItemTwo},
                      {this.state.secondmenuItemThree},
                      {this.state.secondmenuItemFour},
                      {this.state.secondmenuItemFive} */}
                      </p>
                    </div>
                      {/* <p id="" style={{marginLeft: '10px', fontSize: '13px'}}>
                        
                      </p> */}

                      {this.props.mode == 'future' ? (
                        <div style={{width: '100%', textAlign: 'left'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                          {/* <img src={this.state.votesecondIcon} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px',}} onClick={this.votesecond.bind(this)} /> */}
                          <Button
                        onClick={this.votefirst.bind(this)}
                        style={{color: 'black', backgroundColor: 'lightgreen', marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.dislike.bind(this)}
                        style={{color: 'black', backgroundColor: 'lightcoral'}}
                        >
                          En tykkää
                        </Button>
                        </div>
                      ) : (
                        <div style={{width: '100%', textAlign: 'left'}}>
                            <h4 style={{marginRight: '5px', marginTop: '0px', marginBottom: '0px', float: 'left', marginLeft:'1%'}}>Arvostele ruoka</h4>
                            <img src={Happy} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.happyOpacitySecond}} onClick={this.happysecond.bind(this)}/>
                            <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.neutralOpacitySecond}}  onClick={this.neutralsecond.bind(this)}/>
                            <img src={Sad} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.sadOpacitySecond}} onClick={this.sadsecond.bind(this)} />
                        </div>
                      ) 
                      }

                      

                      </div>
                    </div>
                  </div>
            </div>
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
              <p style={{color: 'white'}}>Today</p>  
            </Button>
          </div>
          <div style={monthButton}>
            <Button
            style={{border: 'none'}}
            onClick={this.monthMobile.bind(this)}
            >
              <img src={ForkKnife} style={{marginTop: '5px', width: '25px'}}/>  
              <p style={{color: 'white'}}>Kuukausi</p>  
            </Button>
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
