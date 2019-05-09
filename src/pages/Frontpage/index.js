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
import ShowAll from './showAll'

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

      showAll: 'none',
      showOneDate: 'block',
      showMode: '',
      showAllDates:[],
      // showAllDates: [ {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-01',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-01'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-02',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-02'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-03',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-03'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-04',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-04'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-05',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-05'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-05',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-05'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-07',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-07'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-08',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-08'
      // },
      // {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-09',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-09'
      // }],

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
  
    window.onload = function name(){
      
      //let selecteddata = document.getElementById("show_selected_date");
      try{
        var x = document.getElementById("show_selected_date");
        x.style.display = "none";
        var mobile_show_selected_date = document.getElementById("mobile_show_selected_date");
        mobile_show_selected_date.style.display = "none";
      }
      catch(err){
        throw err;
      }
      
      let today_date = formatDate();
      console.log(today_date);
      let roughlist = [];
      let row = null;
      if(today_date){
        // web id="monthly_mob_foodtwoingrediants"
        let web_foodonedate = document.querySelector("#web_foodonedate");
        web_foodonedate.innerHTML = today_date;
        let web_foodtwodate = document.querySelector("#web_foodtwodate");
        web_foodtwodate.innerHTML = today_date;
        let web_foodonetitle = document.querySelector("#web_foodonetitle");
        let web_foodtwotitle = document.querySelector("#web_foodtwotitle");
        let web_foodoneingrediants = document.querySelector("#web_foodoneingrediants");
        let web_foodtwoingrediants = document.querySelector("#web_foodtwoingrediants");
        let web_foodonedescription = document.querySelector("#web_foodonedescription");
        let web_foodtwodescription = document.querySelector("#web_foodtwodescription");
        // mobile
        let mob_foodonedate = document.querySelector("#mob_foodonedate");
        mob_foodonedate.innerHTML = today_date;
        let mob_foodtwodate = document.querySelector("#mob_foodtwodate");
        mob_foodtwodate.innerHTML = today_date;
        let mob_foodonetitle = document.querySelector("#mob_foodonetitle");
        //let mob_foodonedescription = document.querySelector("#mob_foodonedescription");
        let mob_foodtwotitle = document.querySelector("#mob_foodtwotitle");
        let mob_foodtwodescription = document.querySelector("#mob_foodtwodescription");
        let monthly_mob_foodoneingrediants = document.querySelector("#monthly_mob_foodoneingrediants");
        let monthly_mob_foodtwoingrediants = document.querySelector("#monthly_mob_foodtwoingrediants");
      fetch("http://localhost:5000/getfood/"+today_date+"/1/").then(response => response.json()).then(data =>{
          //alert(data.length);
          if(data.length == 0){
            let foodlist_box = document.querySelector("#food_list_box");
            foodlist_box.style.display = "none"
            foodlist_box.innerHTML = "<h3 style='padding:50px'>No food list available</h3>"
            foodlist_box.style.display = "block"
          }
          
          else{
            for (let j=0; j < data.length; j++){
              if(j == 0) {

                web_foodonetitle.innerHTML = "Lounas";
                web_foodoneingrediants.innerHTML = data[j].description;
                web_foodonedescription.innerHTML = data[j].food_name;
                //mob
                mob_foodonetitle.innerHTML = 'Lounas';
                web_foodtwoingrediants.innerHTML = data[j].description;
                //mob_foodonedescription.innerHTML = data[j].food_name;
              }
              if(j == 1) {
                web_foodtwotitle.innerHTML = data[j].food_name;
                web_foodtwodescription.innerHTML = data[j].description;

                mob_foodtwotitle.innerHTML = data[j].food_name;
                mob_foodtwodescription.innerHTML = data[j].description;
              }
           }
           if (data.length == 1){
            let foodProductTwo = document.querySelector(".foodProductTwo");
            foodProductTwo.style.display = "none"
            }
          }
          

       });
      console.log(roughlist);
      
      }
      
    }
    
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
  
  // onChangeDate = date => this.setState({ date })
  onChangeDate(date) {
    // console.log(date)
    let tody = new Date();
    // console.log(tody)
    this.setState({showAll: 'none', showOneDate: 'block', likedfirst: '', dislikedfirst: '', likedsecond: '', dislikedsecond: ''})

    this.setState({votefirstBackground: '', votesecondBackground: '',
    votefirstIcon: Happy, votesecondIcon: Happy})
    if(tody < date){
      // console.log("future chosen")
      this.setState({futureOptions: 'block'})
    }
    else {
      this.setState({futureOptions: 'none'})
    }
    var month = '' + (tody.getMonth() + 1);
    var day = '' + tody.getDate()
    var year = tody.getFullYear()
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var final_today = year + '-' + month + '-'+ day;

    var months = '' + (date.getMonth() + 1);
    var days = '' + date.getDate()
    var years = date.getFullYear()
    if (months.length < 2) months = '0' + months;
    if (days.length < 2) days = '0' + days;
    var final_todays = years + '-' + months + '-'+ days;
    
    //alert(final_todays);
    if (final_todays){
        // web
        var x = document.getElementById("show_selected_date");
        var monthly_not_available_list = document.getElementById("monthly_not_available_list");
        x.style.display = "block";
        // mob 
        var mobile_show_selected_date = document.getElementById("mobile_show_selected_date");
        mobile_show_selected_date.style.display = "block";

        // hidden ids monthly_mob_hidden_food_id_one
        let hidden_food_id_one = document.querySelector("#hidden_food_id_one");
        let hidden_food_id_two = document.querySelector("#hidden_food_id_two");
        let monthly_mob_hidden_food_id_one = document.querySelector("#monthly_mob_hidden_food_id_one");
        let monthly_mob_hidden_food_id_two = document.querySelector("#monthly_mob_hidden_food_id_two");

        let monthly_web_foodonedate = document.querySelector("#monthly_web_foodonedate");
        monthly_web_foodonedate.innerHTML = final_todays;
        let monthly_web_foodtwodate = document.querySelector("#monthly_web_foodtwodate");
        monthly_web_foodtwodate.innerHTML = final_todays;
        let monthly_web_foodonetitle = document.querySelector("#monthly_web_foodonetitle");
        let monthly_web_foodtwotitle = document.querySelector("#monthly_web_foodtwotitle");
        let monthly_web_foodonedescription = document.querySelector("#monthly_web_foodonedescription");
        let monthly_web_foodtwodescription = document.querySelector("#monthly_web_foodtwodescription");
        // mobile
        let monthly_mob_foodonedate = document.querySelector("#monthly_mob_foodonedate");
        monthly_mob_foodonedate.innerHTML = final_todays;
        let monthly_mob_foodtwodate = document.querySelector("#monthly_mob_foodtwodate");
        monthly_mob_foodtwodate.innerHTML = final_todays;
        let monthly_mob_foodonetitle = document.querySelector("#monthly_mob_foodonetitle");
        let monthly_mob_foodonedescription = document.querySelector("#monthly_mob_foodonedescription");
        let monthly_mob_foodtwotitle = document.querySelector("#monthly_mob_foodtwotitle");
        let monthly_mob_foodtwodescription = document.querySelector("#monthly_mob_foodtwodescription");
      fetch("http://localhost:5000/getfood/"+final_todays+"/1/").then(response => response.json()).then(data =>{
           
        if(data.length && (data.length == 2 || data.length == 1) ){
          monthly_not_available_list.style.display = "none";
            for (let j=0; j < data.length; j++){
              if(j == 0 && data[j]) {
                hidden_food_id_one.innerHTML = data[j].food_ID;
                monthly_web_foodonetitle.innerHTML = data[j].food_name;
                monthly_web_foodonedescription.innerHTML = data[j].description;
                //mob
                monthly_mob_hidden_food_id_one.innerHTML = data[j].food_ID;
                monthly_mob_foodonetitle.innerHTML = data[j].food_name;
                monthly_mob_foodonedescription.innerHTML = data[j].description;
              }
              if(j == 1 && data[j]) {
                hidden_food_id_two.innerHTML = data[j].food_ID;
                monthly_web_foodtwotitle.innerHTML = data[j].food_name;
                monthly_web_foodtwodescription.innerHTML = data[j].description;
                // mob
                monthly_mob_hidden_food_id_one.innerHTML = data[j].food_ID;
                monthly_mob_foodtwotitle.innerHTML = data[j].food_name;
                monthly_mob_foodtwodescription.innerHTML = data[j].description;
              }
           }
        }
        else {
          x.style.display = "none";
          mobile_show_selected_date.style.display ="none";
          monthly_not_available_list.style.display = "block";
          monthly_not_available_list.innerHTML = "<h3 style='padding:50px'>No food list available</h3>"
        }
       });
    }
    // if (JSON.stringify(tody) == JSON.stringify(date) ) {
    //   alert(JSON.stringify(tody))
    //   //alert(date)
    // }
    // this.setState({ date })
  }
  
  // fetch data from here https://www.jamix.fi/ruokalistapalvelu/rest/haku/menu/12345/3?lang=fi&date=20190225
  componentDidMount() {


    // const user_type = localStorage.getItem('userType');
    // if(user_type == 'admin' || user_type !== 'student'){
    //   window.location.href = "http://localhost:3000/#/";
    // }
    // console.log(process.env.REACT_APP_BACKEND_URL)
    let that = this;
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds
    if (month < 10){
      month = "0" + month;
    }
    if (date < 10){
      date = "0" + date;
    }
    let todayFoodUrl = `https://www.jamix.fi/ruokalistapalvelu/rest/haku/menu/12345/3?lang=fi&date=${year + '' + month + '' + date}`;
    console.log(todayFoodUrl)
   
    // axios.get(todayFoodUrl)
    //     .then(res => {  
    //     console.log(res)
    // });

    console.log(DummyData)
    let foodOneName = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[0].name;
    let foodOneIngredients = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[0].ingredients;
    let foodOneDiets = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[0].diets;

    let foodTwoName = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[2].name;
    let foodTwoIngredients = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[2].ingredients;
    let foodTwoDiets = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[2].diets;

    let menuItemOne = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[0].name;
    let menuItemTwo = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[1].name;
    let menuItemThree = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[2].name;
    let menuItemFour = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[3].name;
    let menuItemFive = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[0].menuItems[4].name;

    let secondmenuItemOne = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[1].menuItems[0].name;
    let secondmenuItemTwo = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[1].menuItems[1].name;
    let secondmenuItemThree = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[1].menuItems[2].name;
    let secondmenuItemFour = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[1].menuItems[3].name;
    let secondmenuItemFive = DummyData[0].menuTypes[1].menus[0].days[0].mealoptions[1].menuItems[4].name;

    this.setState({menuItemOne: menuItemOne, menuItemTwo: menuItemTwo,
      menuItemThree: menuItemThree, menuItemFour: menuItemFour, menuItemFive: menuItemFive,
      secondmenuItemOne: secondmenuItemOne, secondmenuItemTwo: secondmenuItemTwo,
      secondmenuItemThree: secondmenuItemThree, secondmenuItemFour: secondmenuItemFour, secondmenuItemFive: secondmenuItemFive,
      });
    // this.setState();
   
    // for (let i = 0; i < DummyData) {

    // }

    // axios.get(todayFoodUrl)
    // .catch(function (error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     // console.log(error.response.data);
    //     // console.log(error.response.status);
    //     // console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   // console.log(error.config);
    // });

    // let that = this;
  let url = todayFoodUrl

  // axios.jsonp(todayFoodUrl)
  // .then(function (response) {
  //   console.log("joo");
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log("swds");
  //   console.log(error);
  // });

  // fetchJsonp(todayFoodUrl)
  // .then(function(response) {
  //   return response.json()
  // }).then(function(json) {
  //   console.log('parsed json', json)
  // }).catch(function(ex) {
  //   console.log('parsing failed', ex)
  // })

  // fetch(url, {            
  //       method: 'GET',
  //   })
  // .then(function(response) {
  //   console.log(response)
  //   if (response.status >= 400) {
  //     throw new Error("Bad response from server");
  //   }
  //   return response.json();
  // })
  // .then(function(data) {
  //   console.log("dataa")
  //   console.log(data) 
  // });

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

  //**************** */future voting
  votefirst(){
    this.setState({ likedfirst: 'lightgreen', dislikedfirst: '', likedsecond: '', dislikedsecond: 'lightcoral',
      
    votefirstIcon: Happy, votesecondIcon: Sad})
    var foodid = document.getElementById("hidden_food_id_one").textContent;
    var userid = localStorage.getItem("userId");
    var r = window.confirm("Are you want to submit this vote?");
    if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postfuturingvoting/'+foodid+'/'+userid+'/like/').then(data => {
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
    //console.log(x);
    //here background things for voting the first one
  }
  votesecond(){
    this.setState({likedfirst: '', dislikedfirst: 'lightcoral', likedsecond: 'lightgreen', dislikedsecond: '',
      
    votefirstIcon: Sad, votesecondIcon: Happy})
    var foodid = document.getElementById("hidden_food_id_two").textContent;
    var userid = localStorage.getItem("userId");
    var r = window.confirm("Are you want to submit this vote?");
    if (r == true) {
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postfuturingvoting/'+foodid+'/'+userid+'/like/').then(data => {
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
    //console.log(x2);
    //here background things for voting the scond one one
  }

  //insert or update database with these voted below
  happyfirst() {
   //voted happy for first menu
    var foodid = document.getElementById("hidden_food_id_one").textContent;
    var userid = localStorage.getItem("userId");
    alert(foodid);
    var r = window.confirm("Are you want to submit this vote?");
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
  neutralfirst() {
    //voted neutral
    var foodid = document.getElementById("hidden_food_id_one").textContent;
    var userid = localStorage.getItem("userId");
    alert(foodid);
    var r = window.confirm("Are you want to submit this vote?");
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
  sadfirst() {
    //voted sad
    var foodid = document.getElementById("hidden_food_id_one").textContent;
    var userid = localStorage.getItem("userId");
    alert(foodid);
    var r = window.confirm("Are you want to submit this vote?");
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

  happysecond() {
    //voted happy for second menu
    var foodid = document.getElementById("hidden_food_id_two").textContent;
    var userid = localStorage.getItem("userId");
    alert(foodid);
    var r = window.confirm("Are you want to submit this vote?");
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
    
    this.setState({happyOpacitySecond: '1', neutralOpacitySecond: '0.2', sadOpacitySecond: '0.2'})
  }
  neutralsecond() {
    //voted neutral for second menu
    var foodid = document.getElementById("hidden_food_id_two").textContent;
    var userid = localStorage.getItem("userId");
    alert(foodid);
    var r = window.confirm("Are you want to submit this vote?");
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
    this.setState({happyOpacitySecond: '0.2', neutralOpacitySecond: '1', sadOpacitySecond: '0.2'})

  }
  sadsecond() {
    //voted sad for second menu
    var foodid = document.getElementById("hidden_food_id_two").textContent;
    var userid = localStorage.getItem("userId");
    alert(foodid);
    var r = window.confirm("Are you want to submit this vote?");
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

    this.setState({happyOpacitySecond: '0.2', neutralOpacitySecond: '0.2', sadOpacitySecond: '1'})
  }

  async showAllPast(){
    // showAllDates: [ {
      //   foodOneName: 'meal 1', foodOneIngredients: 'ingredients 1', foodOneDiets: 'diets 1', dateOne: '2019-01-01',
      //   foodTwoName: 'meal 2', foodTwoIngredients: 'ingredients 2', foodTwoDiets: 'diets 2', dateTwo: '2019-01-01'
      // }],
    let generatePastArray = [];
    let row1 = null;
    let row2 = null;
    await fetch("http://localhost:5000/pastthreeweeksfoods/").then(response => response.json()).then(data =>{
      //console.log(data.length);
        for (let j=0; j < data.length; j++){
          //console.log(data.length);
          if( (j % 2 !== 0) && data[j]){
            row1 = {
              'foodOneId': data[j].food_ID,
              'foodOneName': data[j].food_name,
              'foodOneIngredients': '',
              'foodOneDiets': data[j].description,
              'dateOne':(data[j].scheduled_date).replace("T21:00:00.000Z","")
            }
          }
          if( (j % 2 == 0) && data[j]){
            
            row2 = {
              'foodTwoId': data[j].food_ID,
              'foodTwoName': data[j].food_name,
              'foodTwoIngredients': '',
              'foodTwoDiets': data[j].description,
              'dateTwo':(data[j].scheduled_date).replace("T21:00:00.000Z","")
            }
          }  
          if(row1 !==null && row2 !==null){
            let row = {...row1, ...row2};
            generatePastArray.push(row);
            row = null;
            row1 = null;
            row2 = null;
          }
            //console.log(row1.length);
            
          
        }
       }); 
       console.log(generatePastArray);
       //this.setState({showAllDates:generatePastArray})
    // if(this.state.showAll === "none"){
      this.setState({showAll: 'block', showOneDate: 'none', showMode: 'past', showAllDates: generatePastArray })
    // }
    // else {
    //   this.setState({showAll: 'none', showOneDate: 'block', showMode: 'past'})
    // }
  }

  async showAllFuture(){
    let generateFutureArray = [];
    let row1 = null;
    let row2 = null;
    let counter = 0;
    await fetch("http://localhost:5000/futurethreeweeksfoods/").then(response => response.json()).then(data =>{
      for (let j=0; j < data.length; j++){
        //console.log(data.length);
        if( (j % 2 !== 0) && data[j]){
          row1 = {
            'foodOneId': data[j].food_ID,
            'foodOneName': data[j].food_name,
            'foodOneIngredients': '',
            'foodOneDiets': data[j].description,
            'dateOne':(data[j].scheduled_date).replace("T21:00:00.000Z","")
          }
        }
        if( (j % 2 == 0) && data[j]){
          
          row2 = {
            'foodTwoId': data[j].food_ID,
            'foodTwoName': data[j].food_name,
            'foodTwoIngredients': '',
            'foodTwoDiets': data[j].description,
            'dateTwo':(data[j].scheduled_date).replace("T21:00:00.000Z","")
          }
        }  
        if(row1 !==null && row2 !==null){
          let row = {...row1, ...row2};
          generateFutureArray.push(row);
          row = null;
          row1 = null;
          row2 = null;
        }
          //console.log(row1.length);
          
        
      }
       }); 
       console.log(generateFutureArray);
    // if(this.state.showAll === "none"){
      this.setState({showAll: 'block', showOneDate: 'none', showMode: 'future', showAllDates:generateFutureArray})
    // }
    // else {
    //   this.setState({showAll: 'none', showOneDate: 'block', showMode: 'future'})
    // }
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
      <div className="content" style={{padding: '0px', minHeight: '100vh'}}>
      
      <Header />
    
     
      <div className="card" style={{marginBottom: '0px'}}>
        <div className="content content-full-width" style={{padding: '0px'}}>
          <Tabs defaultActiveKey={1} className="browserPages">
            <Tab eventKey={1} title="Tänään" className="tabStyle" style={{paddingTop: '0px'}}>

              <img src={HeaderImage} className="headerImage"  />
              
              <div id="food_list_box" className="row" style={{backgroundColor: '#ececec'}}>
                <div className="col-md-6 foodProduct" style={{width: '49%', marginLeft: '10px', paddingLeft: '10px'}}>
                  <div className="card" style={{border: '2px solid #a7a7a7'}}>
                  <div style={{width: '100%'}}>
                  <img src={ParempiValinta} className="parempiValintaImage" />
                    <div className="header"  style={{paddingTop: '0px'}}>
                      <div style={{width: '50%'}}>
                        <h4 id="web_foodonetitle" className="title" style={{width: '50%', color: 'black' , fontSize: '20px', marginBottom: '5px', float: 'left', marginRight: '10%'}}></h4>
                        <p id="web_foodonedate" style={{marginBottom: '0px', float: 'left', width: '50%'}}> </p>
                      </div>
                      <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Arvostele ruoka</span>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.happyOpacityFirst}}  onClick={this.happyfirst.bind(this)}/>
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.neutralOpacityFirst}} onClick={this.neutralfirst.bind(this)} />
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.sadOpacityFirst}} onClick={this.sadfirst.bind(this)} />
                      </div>
                      
                    </div>
                    

                    <div className="content" style={{paddingBottom: '0px'}}>
                    
                    <p id="web_foodoneingrediants" style={{fontSize: '14px'}}>
                    {/* {this.state.menuItemTwo}<br></br>
                    {this.state.menuItemThree}<br></br>
                    {this.state.menuItemFour}<br></br> */}
                    {/* {this.state.menuItemFive} */}
                    </p>
                  </div>
                    <p id="web_foodonedescription" style={{marginLeft: '10px', fontSize: '16px'}}>
                       
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
                  <div className="card"  style={{border: '2px solid #a7a7a7'}}>
                  <div style={{width: '100%'}}>
                  <img src={ParempiValinta} className="parempiValintaImage" />
                  
                  <div className="header"  style={{paddingTop: '0px'}}>
                      <div style={{width: '50%'}}>
                        <h4 id="web_foodtwotitle" className="title" style={{width: '50%', color: 'black' , fontSize: '20px', marginBottom: '5px', float: 'left', marginRight: '10%'}}></h4>
                        <p id="web_foodtwodate" style={{marginBottom: '0px', float: 'left', width: '50%'}}> </p>
                        <p id="web_foodtwoingrediants" style={{fontSize: '14px'}}></p>
                      </div>
                      <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Arvostele ruoka</span>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.happyOpacitySecond}} onClick={this.happysecond.bind(this)} />
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.neutralOpacitySecond}} onClick={this.neutralsecond.bind(this)} />
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.sadOpacitySecond}} onClick={this.sadsecond.bind(this)} />
                      </div>
                      
                    </div>
                    <div className="content" style={{paddingBottom: '0px'}}>
                    {/* <p style={{fontSize: '14px'}}>{this.state.secondmenuItemTwo}<br></br>
                    {this.state.secondmenuItemThree}<br></br>
                    {this.state.secondmenuItemFour}<br></br>
                    {this.state.secondmenuItemFive}</p> */}
                  </div>
                  <br></br><br></br><br></br><br></br><br></br>
                    <p id="web_foodtwodescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                        
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
            

            </Tab>

            <Tab eventKey={2} title="Kuukausi" className="tabSyle">
            <div style={{textAlign: 'center', color: '#ed6c41', borderBottom: '3px solid #ababab', marginBottom: '4px', width: '50%', marginLeft: '25%'}}>
                <h3 style={{marginBottom: '3px', marginTop: '0px'}}><b>Kuukauden menu</b></h3>
            </div>
              <div style={{width: '100%'}}>
                <Calendar
                  className="calendarStyle"
                  onChange={this.onChangeDate.bind(this)}
                  value={this.state.date}
                />
              </div>
              <div id="monthly_not_available_list"></div>

               <Button 
              onClick={this.showAllPast.bind(this)}
              style={{margin: '5px'}}
              >
                Näytä viimeiset 3 viikkoa
              </Button>

              <Button 
              onClick={this.showAllFuture.bind(this)}
              >
                Näytä tulevat 3 viikkoa
              </Button>

              <div style={{display: this.state.showAll}}>
                {/* loop through dates here */}
                    {this.state.showAllDates.map(data =>
                    <ShowAll 
                      //send date to showall file, so that can find the foods for the date
                      foods={data} 
                      mode={this.state.showMode}
                      //or just send the food data straight to the ShowAll file
                      //data={data}
                    />
                   )} 
              </div>

              <div id="show_selected_date" className="row" style={{backgroundColor: '#ececec', display: this.state.showOneDate}}>
              <i id='hidden_food_id_one' style={{display:'none'}}></i>  
                <div className="col-md-6 foodProduct" style={{width: '49%', marginLeft: '10px', paddingLeft: '10px'}}>
                  <div className="card" style={{border: '2px solid #a7a7a7', backgroundColor: this.state.votefirstBackground}}>
                  <div style={{width: '100%'}}>
                  <img src={ParempiValinta} className="parempiValintaImage" />
                    <div className="header"  style={{paddingTop: '0px'}}>
                      <div style={{width: '50%'}}>
                        <h4 id="monthly_web_foodonetitle" className="title" style={{width: '50%', color: 'black' , fontSize: '20px', marginBottom: '5px', float: 'left', marginRight: '10%'}}></h4>
                        <p id="monthly_web_foodonedate" style={{marginBottom: '0px', float: 'left', width: '50%'}}></p>
                        
                      </div>
                      {this.state.futureOptions == 'block' && this.state.showAll == 'none' ? (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                        <Button
                        onClick={this.votefirst.bind(this)}
                        style={{color: 'black', backgroundColor: this.state.likedfirst, marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.votesecond.bind(this)}
                        style={{color: 'black', backgroundColor: this.state.dislikedfirst}}
                        >
                          En tykkää
                        </Button>
                        {/* <img src={this.state.votefirstIcon} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', }}  onClick={this.votefirst.bind(this)}/> */}
                        
                      </div>
                      ) : (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Arvostele ruoka</span>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.happyOpacityFirst}}  onClick={this.happyfirst.bind(this)}/>
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.neutralOpacityFirst}} onClick={this.neutralfirst.bind(this)} />
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.sadOpacityFirst}} onClick={this.sadfirst.bind(this)} />
                        </div>
                      ) 
                      }
                      
                      
                    </div>
                    

                    <div className="content" style={{paddingBottom: '0px'}}>
                    
                    <p style={{fontSize: '14px'}}>
                    
                    </p>
                  </div>
                    <p id="monthly_web_foodonedescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                       
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
                <i id='hidden_food_id_two' style={{display:'none'}}></i>
                  <div className="card"  style={{border: '2px solid #a7a7a7', }}>
                  <div style={{width: '100%'}}>
                  <img src={ParempiValinta} className="parempiValintaImage" />
                  
                  <div className="header"  style={{paddingTop: '0px'}}>
                      <div style={{width: '50%'}}>
                        <h4 id="monthly_web_foodtwotitle" className="title" style={{width: '50%', color: 'black' , fontSize: '20px', marginBottom: '5px', float: 'left', marginRight: '10%'}}></h4>
                        <p id="monthly_web_foodtwodate" style={{marginBottom: '0px', float: 'left', width: '50%'}}> </p>
                      </div>
                      {this.state.futureOptions == 'block'  && this.state.showAll == 'none' ? (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                        <Button
                        onClick={this.votesecond.bind(this)}
                        style={{color: 'black', backgroundColor: this.state.likedsecond, marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.votefirst.bind(this)}
                        style={{color: 'black', backgroundColor: this.state.dislikedsecond}}
                        >
                          En tykkää
                        </Button>
                          {/* <img src={this.state.votesecondIcon} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px',}} onClick={this.votesecond.bind(this)} /> */}
                          
                        </div>
                      ) : (
                        <div style={{width: '100%', marginLeft: '18%', paddingTop: '20px'}}>
                          <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Arvostele ruoka</span>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.happyOpacitySecond}} onClick={this.happysecond.bind(this)} />
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.neutralOpacitySecond}} onClick={this.neutralsecond.bind(this)} />
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '10px', marginBottom: '5px', opacity: this.state.sadOpacitySecond}} onClick={this.sadsecond.bind(this)} />
                        </div>
                      ) 
                      }
                      
                      
                    </div>
                    <div className="content" style={{paddingBottom: '0px'}}>
                    <p id="monthly_web_foodtwoingrediants"  style={{fontSize: '14px'}}>{this.state.secondmenuItemTwo}<br></br>
                    {this.state.secondmenuItemThree}<br></br>
                    {this.state.secondmenuItemFour}<br></br>
                    {this.state.secondmenuItemFive}</p>
                  </div>
                    <p id="monthly_web_foodtwodescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                        
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
            </Tab>
 
            <Tab eventKey={3} title="Tietoa meistä" className="tabSyle">

                  <div className="card"  style={{border: '2px solid #a7a7a7', width: '90%', marginLeft: '5%'}}>
                    <div className="header">
                      <h4 className="title" style={{textAlign: 'center'}}>Tietoa meistä</h4>
                    </div>
                    <div style={{margin: '50px'}}>
                      <p>
                                  
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.            
  
                      </p>
                      <div style={{textAlign: 'center'}}>
                        <img src={Saimaa} style={{marginTop: '5px', width: '40%'}}/>  
                      </div>
                    </div>


                    </div>
                 
            </Tab>

            
          </Tabs>

          {/* mobile pages */}

          

          <div className={this.state.todayMobile}>
            <div className="row" style={{backgroundColor: '#ececec'}}>
            <div style={{textAlign: 'center', color: '#ed6c41', borderBottom: '3px solid #ababab', marginBottom: '4px', width: '50%', marginLeft: '25%'}}>
              <h3 style={{marginBottom: '3px'}}><b>Tänään</b></h3>
            </div>
                  <div className="col-md-6 foodProduct" style={{width: '49%', marginLeft: '10px', paddingLeft: '10px'}}>
                    <div className="card" style={{border: '2px solid #a7a7a7', marginBottom: '3px'}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 id="mob_foodonetitle"  className="title" style={{color: 'black'}}></h4>
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

                      <div style={{width: '100%', textAlign: 'left'}}>
                        
                          <h4 style={{marginRight: '5px', marginTop: '0px', marginBottom: '0px', float: 'left', marginLeft:'1%'}}>Arvostele ruoka</h4>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.happyOpacityFirst}} onClick={this.happyfirst.bind(this)}/>
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.neutralOpacityFirst}}  onClick={this.neutralfirst.bind(this)} />
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.sadOpacityFirst}}  onClick={this.sadfirst.bind(this)} />
                       
                      </div>
                      {/* <button className="btn btn-fill btn-info" style={{float:'right'}}>Vote</button> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 foodProductTwo" style={{width: '49%', paddingLeft: '10px', paddingRight: '0px'}}>
                    <div className="card"  style={{border: '2px solid #a7a7a7', marginBottom: '3px'}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                    
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 id="mob_foodtwotitle" className="title" style={{color: 'black'}}></h4>
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

                      <div style={{width: '100%', textAlign: 'left'}}>
                          <h4 style={{marginRight: '5px', marginTop: '0px', marginBottom: '0px', float: 'left', marginLeft:'1%'}}>Arvostele ruoka</h4>
                          <img src={Happy} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.happyOpacitySecond}} onClick={this.happysecond.bind(this)}/>
                          <img src={Neutral} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.neutralOpacitySecond}}  onClick={this.neutralsecond.bind(this)}/>
                          <img src={Sad} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px', opacity: this.state.sadOpacitySecond}} onClick={this.sadsecond.bind(this)} />
                      </div>

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
            <Calendar
            className="calendarStyle"
              // style={{width: '100%'}}
              onChange={this.onChangeDate.bind(this)}
              value={this.state.date}
            />
            <div id="monthly_not_available_list"></div>
            <div id = "mobile_show_selected_date" style={{display: this.state.showOneDate}}> 
                <div className="col-md-6 foodProduct" style={{width: '49%', marginLeft: '10px', paddingLeft: '10px'}}>
                <i id='monthly_mob_hidden_food_id_one' style={{display:'none'}}></i>
                    <div className="card" style={{border: '2px solid #a7a7a7', marginBottom: '3px', backgroundColor: this.state.votefirstBackground}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 id="monthly_mob_foodonetitle"  className="title" style={{color: 'black'}}></h4>
                        <p id="monthly_mob_foodonedate"> </p>
                      </div>
                      <div className="content" style={{paddingBottom: '0px', paddingTop: '0px'}}>
                      
                      <p id="monthly_mob_foodoneingrediants"  style={{fontSize: '14px'}}>{this.state.menuItemTwo},
                      {this.state.menuItemThree},
                      {this.state.menuItemFour},
                      {this.state.menuItemFive}</p>
                    </div>
                      <p id="monthly_mob_foodonedescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                        
                      </p>

                      {this.state.futureOptions == 'block'  && this.state.showAll == 'none' ? (
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
                        onClick={this.votesecond.bind(this)}
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
                  <i id='monthly_mob_hidden_food_id_two' style={{display:'none'}}></i>  
                    <div className="card"  style={{border: '2px solid #a7a7a7', marginBottom: '3px', backgroundColor: this.state.votesecondBackground}}>
                    <div style={{width: '100%'}}>
                    <img src={ParempiValinta} className="parempiValintaImage" />
                    
                      <div className="header" style={{paddingTop: '0px'}}>
                        <h4 id="monthly_mob_foodtwotitle" className="title" style={{color: 'black'}}></h4>
                        <p id="monthly_mob_foodtwodate"> </p>
                      </div>
                      <div className="content" style={{paddingBottom: '0px', paddingTop: '0px'}}>
                      <p id="monthly_mob_foodtwoingrediants"  style={{fontSize: '14px'}}>{this.state.secondmenuItemTwo},
                      {this.state.secondmenuItemThree},
                      {this.state.secondmenuItemFour},
                      {this.state.secondmenuItemFive}</p>
                    </div>
                      <p id="monthly_mob_foodtwodescription" style={{marginLeft: '10px', fontSize: '13px'}}>
                        
                      </p>

                      {this.state.futureOptions == 'block'  && this.state.showAll == 'none' ? (
                        <div style={{width: '100%', textAlign: 'left'}}>
                        <span style={{marginRight: '10px', marginTop: '0px', marginBottom: '0px', fontSize: '20px'}}>Äänestä</span>
                          {/* <img src={this.state.votesecondIcon} style={{width: '35px', height: '35px', marginRight: '5px', marginBottom: '5px',}} onClick={this.votesecond.bind(this)} /> */}
                          <Button
                        onClick={this.votesecond.bind(this)}
                        style={{color: 'black', backgroundColor: 'lightgreen', marginRight: '5px'}}
                        >
                          Tykkää
                        </Button>
                        <Button
                        onClick={this.votefirst.bind(this)}
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
