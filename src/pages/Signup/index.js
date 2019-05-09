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
import axios from 'axios'

export default class Login extends Component {

  constructor () {
    super();
    this.state = { 
      name: '',
      schoolName: '',
      email: '',
      password: '',
      passwordAgain: '',
      checkbox: Unchecked,
    }
  }

  signUp() {
      console.log("signup here");
    //   let login = ApiData.login();
    const errormessagebox = document.querySelector("#error-message");
    const successmessagebox = document.querySelector("#success-message");
    var uname = this.state.name;
    var school = this.state.schoolName;
    var email = this.state.email;
    var pass = this.state.password;
    var repass = this.state.passwordAgain;
    let school_domains = {
      1:"student.imatra.fi",
      2:"student.imatra.fi"
    }
    if (!uname){
      errormessagebox.innerHTML = "Please enter username properly";
    }
    else if (!school){
      errormessagebox.innerHTML = "Please school name properly";
    }
    else if (!email || email.indexOf("@") !== -1 ){
      errormessagebox.innerHTML = "Please enter email properly without @example.com";
    }
    else if (!pass){
      errormessagebox.innerHTML = "Please enter password properly";
    }
    else if (!repass){
      errormessagebox.innerHTML = "Please enter re-password properly";
    }
    else if ( pass !== repass){
      errormessagebox.innerHTML = "Please enter matched password";
    }
    else{
    let final_email=email+'@'+school_domains[school]
    //console.log(final_email);
      let encodedpass = Buffer.from(pass).toString('base64')
      let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/signup/'+uname+'/'+final_email+'/'+school+'/'+encodedpass+'/'+'student/').then(data => {
        console.log(data);
        if (data){
          errormessagebox.innerHTML = "";
          successmessagebox.innerHTML = "Student has been registered successfully.";
        }else {
          errormessagebox.innerHTML = "email already exist";
          successmessagebox.innerHTML = "";
        }
      })
      );
      console.log("ressssssssssss",signupoutput);
      if (signupoutput == '{}' ){
        errormessagebox.innerHTML = "email already exist";
        successmessagebox.innerHTML = "";
      }
    }
  }

  name(value) {
    this.setState({name: value.target.value});
    // console.log(value.target.value);
  }

  schoolName(value) {
    this.setState({schoolName: value.target.value});
  }

  email(value) {
    this.setState({email: value.target.value});
  }

  password(value) {
    this.setState({password: value.target.value});
    // console.log(value.target.value);
  }
  passwordAgain(value) {
    this.setState({passwordAgain: value.target.value});
  }

  checkboxchecked() {
    if(this.state.checkbox == Unchecked) {
        this.setState({checkbox: Checked});
    }
    else {
        this.setState({checkbox: Unchecked});
    }
      
  }
  login() {
    this.props.history.push("/Login");
  }

  toFrontPage() {
    this.props.history.push("/");
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
                <h3 className="title" style={{color: "black"}}>Let's get started!</h3>
                    <div style={{width: '100%', height: '100%'}}>
                  <div id="error-message" style={{color: "red"}}></div>
                  <div id="success-message" style={{color: "green"}}></div>
                  <label></label>
                  <div class="inputsLogin">
                    <img src={User} class="fa fa-search" style={{marginTop: '5px', width: '25px', float: 'left', opacity: '0.4'}}/>
                    <Input placeholder="Käyttäjänimi" 
                    style={{width: '50%', fontSize: '20px'}}
                    className="loginInputs"
                    onChange={this.name.bind(this)}
                    />
                  </div>

                  <label></label>
                  <div class="inputsLogin">
                    <img src={User} class="fa fa-search" style={{marginTop: '5px', width: '25px', float: 'left', opacity: '0.4'}}/>
                    <select placeholder="Koulu" 
                    style={{width: '50%'}}
                    className="loginInputs"
                    onChange={this.schoolName.bind(this)}
                    >
                    <option value="">Valitse koulu</option>
                    <option value='1'>Imatra North</option>
                    <option value='2'>Imatra South</option>
                    </select>
                  </div>
                  <label></label>
                  <div class="inputsLogin">
                    <img src={User} class="fa fa-search" style={{marginTop: '5px', width: '25px', float: 'left', opacity: '0.4'}}/>
                    <Input placeholder="Sähköpostiosoite ilman @example.com" 
                    style={{width: '50%', fontSize: '20px'}}
                    className="loginInputs"
                    onChange={this.email.bind(this)}
                    /><span id="add-domain-name"></span>
                  </div>
                    
                  <label></label>
                  <div class="inputsLogin">
                    <img src={Key} class="fa fa-search" style={{marginTop: '5px', width: '25px', float: 'left', opacity: '0.4' }}/>
                    <Input placeholder="Salasana"
                    style={{width: '50%', fontSize: '20px'}}
                    type="password" 
                    className="loginInputs"
                    onChange={this.password.bind(this)}
                    />    
                  </div>

                  <label></label>
                  <div class="inputsLogin">
                    <img src={Key} class="fa fa-search" style={{marginTop: '5px', width: '25px', float: 'left', opacity: '0.4' }}/>
                    <Input placeholder="Salasana uudelleen"
                    style={{width: '50%', fontSize: '20px'}}
                    type="password" 
                    className="loginInputs"
                    onChange={this.passwordAgain.bind(this)}
                    />
                  </div>

                  </div>

                    <div style={{width: '100%', height: '60px'}}>
                        <div style={{width: '30%', float: 'left'}}>
                            <Button 
                            onClick={this.signUp.bind(this)}
                            style={{backgroundColor: "#ed6c41", color: 'white', marginTop: '10px', width: '100% !important'}}
                            >
                                Luo tunnukset
                            </Button>
                        </div>
                        
                    </div>

                    <div style={{width: '100%', height: '60px'}}>
                        <div style={{width: '30%', float: 'left'}}>
                            <Button 
                            onClick={this.toFrontPage.bind(this)}
                            style={{backgroundColor: "#7b7c84", color: 'white', marginTop: '10px', width: '100% !important'}}
                            >
                                Takaisin kirjaudu sisään -sivulle
                            </Button>
                        </div>  
                           
                    </div>


                    </div>
              </div>
            </div>

            <div className="footerTexts">
                <h5>Yksityisyys</h5>
                <h5>Käyttöehdot</h5>
                <h5>FAQ</h5>
            </div>
            

            {/* <div className="clearfix"></div> */}
          </form>
          
        </div>
        <div style={{width: '100%', height: '100%'}}>
            <img src={Imatra} className="loginImagesMobileImatra"  />
            {/* <img src={Saimaa} className="loginImagesMobileSaimaa"  /> */}
        </div>
        
      </div>
    );
  }
}
