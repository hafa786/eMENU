import React, { Component } from "react";
import { Button, Input } from 'reactstrap';

import Imatra from './imatra.png';
import Saimaa from './saimaantuki.jpg';
import Key from './key.png';
import User from './user.png';
import Unchecked from './uncheckedcheckbox.png';
import Checked from './checkedcheckbox.png';
import './style.css';
import Logo from './logobig.png';
import ApiData from './apiData';
import axios from 'axios';
var session = require('express-session')

export default class Login extends Component {

  constructor () {
    super();
    this.state = { 
      username: '',
      password: '',
      checkbox: Unchecked,
    }
  }
  login() {
    this.username,
    console.log("login here");
    var usern = this.state.username;
    var passw = this.state.password;
    let encodedpass = Buffer.from(passw).toString('base64')
    const errormessagebox = document.querySelector("#errormessagebox")
    let html = [];
    let row = [];
    fetch("http://localhost:5000/login/"+usern+"/"+encodedpass+"/")
      .then(response => response.json())
      .then(data =>{
          data.forEach(user => {
            //row = [user.name,user.name, user.types]
            html.push(user.name);
            html.push(user.types);
            html.push(user.password);
            html.push(user.ID);
            html.push(user.dated);
            
          });
          if (html){
            if (html[1] == "admin"){
              localStorage.setItem('userType',html[1]);
              localStorage.setItem('username',html[0]);
              localStorage.setItem('password',html[2]);
              localStorage.setItem('userId',html[3]);
              this.props.history.push("/Dashboard");
            }
            if (html[1]== "student"){
              localStorage.setItem('userType',html[1]);
              localStorage.setItem('username',html[0]);
              localStorage.setItem('password',html[2]);
              localStorage.setItem('userId',html[3]);
              this.props.history.push("/Frontpage");
            }
          }
          // alert(html[1])
          // if (data.length > 0){
          //   this.props.history.push("/Frontpage");
          // }
          else{
            errormessagebox.innerHTML = "Wrong username or password.";
          }
      });
    //let login = ApiData.login(); 
    // let login = axios.get('localhost:8081/login/1/MTIzNDU2/').then(data => {
    //   console.log(data);
    // }); 
    //console.log(login)
  //  this.props.history.push("/Dashboard");
}

  username(value) {
    this.setState({username: value.target.value});
    // console.log(value.target.value);
  }

  password(value) {
    this.setState({password: value.target.value});
    // console.log(value.target.value);
  }

  checkboxchecked() {
    if(this.state.checkbox == Unchecked) {
        this.setState({checkbox: Checked});
    }
    else {
        this.setState({checkbox: Unchecked});
    }
      
  }

  signUp() {
    this.props.history.push("/Signup");
  }

  render() {
   
    return (
        <div className="card" style={{height: '100%'}}>
        <div className="cornerRedTop">
        </div>
        <div className="mobileCornerGreyTop">
        </div>
        
        <img src={Logo} className="menuLogo" />
        <div className="header">
          
        </div>
        <div className="content" style={{marginTop: '10%'}}>
        
          <form>
           
            <div className="row">
              <div className="col-md-6" style={{borderRight: 'solid 1px #ed6c41'}}>
                <div className="form-group">
                <div className="loginImagesDiv">
                <img src={Imatra} className="loginImages"  />
                {/* <img src={Saimaa} className="loginImages"  /> */}
                </div>
                </div>
              </div>
              <div className="col-md-6 mobileLogin">
                <div className="form-group">
                <h3 className="title" style={{color: "black"}}>Aloita tästä!</h3>
                    <div style={{width: '100%', height: '100%'}}>
                  <div id="errormessagebox" style={{color: "red"}}></div>
                  <label></label>
                  <div className="inputsLogin">
                    <img src={User} className="fa fa-search" style={{marginTop: '5px', width: '25px', float: 'left', opacity: '0.4'}}/>
                    <Input placeholder="Käyttäjänimi" 
                    style={{width: '50%', fontSize: '20px'}}
                    className="loginInputs"
                    onChange={this.username.bind(this)}
                    />
                  </div>
                    
                  <label></label>
                  <div className="inputsLogin">
                    <img src={Key} className="fa fa-search" style={{marginTop: '5px', width: '25px', float: 'left', opacity: '0.4' }}/>
                    <Input placeholder="Salasana"
                    style={{width: '50%', fontSize: '20px'}}
                    type="password" 
                    className="loginInputs"
                    onChange={this.password.bind(this)}
                    />    
                  </div>

                  <div style={{width: '100%', height: '100%', marginTop: '20px', marginBottom: '40px', fontSize: '20px'}}>
                    <img src={this.state.checkbox} onClick={this.checkboxchecked.bind(this)} style={{marginTop: '5px', width: '15px', float: 'left', opacity: '0.4'}}/> 
                    <div style={{float: 'left', height: '100%', marginTop: '3px', marginLeft: '10px', fontSize: '14px'}}>
                        Tallenna salasana
                    </div>
                  </div>

                  </div>

                    <div style={{width: '100%', height: '40px'}}>
                        <div style={{width: '30%', float: 'left'}}>
                            <Button 
                            onClick={this.login.bind(this)}
                            style={{backgroundColor: "#ed6c41", color: 'white', marginTop: '10px', width: '100% !important'}}
                            >
                                Kirjaudu sisään
                            </Button>
                        </div>
                        
                    </div>
                    <div style={{width: '100%', height: '100%', marginTop: '30px'}}>
                        <a >
                            <h5>Unohtuiko salasana?</h5>
                        </a>
                    </div>
                    <div style={{width: '100%', height: '100%', marginTop: '10px'}}>
                        <a >
                            <h5 onClick={this.signUp.bind(this)}>Tarvitsetko tunnukset? Luo ne tästä</h5>
                        </a>
                    </div>

                    </div>
              </div>
            </div>

            <div className="footerTexts">
            
       <a  href="#/privacy"><h5>Yksityisyys</h5></a>
       <a href="#/terms"> <h5>Käyttöehdot</h5> </a>
       <a href="#/faq">  <h5>FAQ</h5> </a>
            </div>
            

            {/* <div className="clearfix"></div> */}
          </form>
          
        </div>
        {/* <div style={{width: '100%', height: '100%'}}> */}
            <img src={Imatra} className="loginImagesMobileImatra"  />
            {/* <img src={Saimaa} className="loginImagesMobileSaimaa"  /> */}
        {/* </div> */}
        <div className="mobileCornerGreyBottom">
        </div>
      </div>
    );
  }
}
