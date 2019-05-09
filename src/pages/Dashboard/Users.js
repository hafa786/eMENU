import { Modal, Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Input } from 'reactstrap';
import generateData from './generateDataUser';
import StripedTable from './StripedTableUsers';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn, ButtonGroup} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './style.css'
const data = generateData.getData()


export default class UserSection extends React.Component {
    constructor () {
        super();
        this.state = { 
          name: '',
          email: '',
          password: '',
          passwordAgain: '',
          userTypes:'',
          data:  generateData.getData() //generateData(500, false)
        }
      }

    createCustomButtonGroup = props => {
        return (
        <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
            { props.showSelectedOnlyBtn }
            { props.exportCSVBtn }
            { props.insertBtn }
            { props.deleteBtn }
            
        </ButtonGroup>
        );
    }

    name(value){
        this.setState({name: value.target.value});
    }
    email(value){
        this.setState({email: value.target.value});
    }
    schoolName(value){
      this.setState({schoolName: value.target.value});
    }
    password(value){
        this.setState({password: value.target.value});
    }
    passwordAgain(value){
        this.setState({passwordAgain: value.target.value});
    }
    userTypes(value){
      this.setState({userTypes: value.target.value});
    }
    save_user(){
      //save data to backend
      const errormessagebox = document.querySelector("#error-message");
      const successmessagebox = document.querySelector("#success-message");
      var uname = this.state.name;
      var school = this.state.schoolName;
      var email = this.state.email;
      var pass = this.state.password;
      var repass = this.state.passwordAgain;
      let type = this.state.userTypes;
      
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
      else if (!type){
        errormessagebox.innerHTML = "please select user type";
      }
      else{
      let final_email=email+'@'+school_domains[school]
      //console.log(final_email);
        let encodedpass = Buffer.from(pass).toString('base64')
        let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/signup/'+uname+'/'+final_email+'/'+school+'/'+encodedpass+'/'+type+'/').then(data => {
          console.log(data);
          if (data){
            errormessagebox.innerHTML = "";
            successmessagebox.innerHTML = "User has been registered successfully.";
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
        //this.setState({password: '', name: '', email: ''});
    }

    removeItem = itemId => {
        this.setState({
            data: data.filter(item => item.id !== itemId)
        });
    }
    deleteSelectedUser(cell, row, rowIndex){
      let regis_message_p = document.querySelector("#delete_user_message");
      var r = window.confirm("Are you sure to remove this user?");
      if (r == true) {
        let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/delete_user/'+(row.id).toString()).then(data => {
          console.log(data);
          if (data){
            regis_message_p.innerHTML = "Your user has been deleted.";
          }else {
            regis_message_p.innerHTML = "Cancelled";
          }
        })
        );
      } else {
        regis_message_p.innerHTML = "You have cancelled it.";
      }
    }
    onClickUserView(cell, row, rowIndex){
      let food_viewHtml = document.querySelector("#user_view_details");
      let results =  fetch("http://localhost:5000/single_user/"+(row.id).toString()).then(response => response.json()).then(data =>{
        for (let j=0; j < data.length; j++){
              let html = '<b>Name: </b>'+data[j].name + '<br></br><b>Email: </b>'+data[j].email + '<br></br><b>Type: </b>'+data[j].types + '<br></br>';
              html += '<b>Added Data: </b>' + data[j].dated;
              food_viewHtml.innerHTML = html;
          }
        });
     }
    onClickProductSelected(cell, row, rowIndex){
      //let regis_message = document.querySelector("#regis_message");
      //regis_message.innerHTML = 'Product #'+ row.id;
        console.log('Product #', row.id);
       }
     
       cellButton(cell, row, enumObject, rowIndex) {
         //alert(row)
        
         return (
            <button 
               type="button" 
               style={{height: '30px', paddingTop: '3px'}}
               className={ `btn btn-primary` }
               onClick={() => 
               this.onClickProductSelected(cell, row, rowIndex)}
            >
            Edit 
            </button>
         )
      }
      viewButton(cell, row, enumObject, rowIndex) {
        //alert(row)
       //let regis_message = document.querySelector("#regis_message");
       //regis_message.innerHTML = rowIndex;
        return (
           <button 
              type="button" 
              style={{height: '30px', paddingTop: '3px'}}
              className={ `btn btn-success` }
              onClick={() => 
              this.onClickUserView(cell, row, rowIndex)}
           >
           View 
           </button>
        )
     }
     deleteButton(cell, row, enumObject, rowIndex) {
      //alert(row)
     //let regis_message = document.querySelector("#regis_message");
     //regis_message.innerHTML = rowIndex;
      return (
         <button 
            type="button" 
            style={{height: '30px', paddingTop: '3px'}}
            className={ `btn btn-danger` }
            onClick={() => 
            this.deleteSelectedUser(cell, row, rowIndex)}
         >
         Delete 
         </button>
      )
   }

    render() {

    const { data } = this.state;
    const options = {
      sizePerPage: 10,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      btnGroup: this.createCustomButtonGroup

    };
    const selectRow = {
        mode: 'checkbox'
      };
        
      return (
        <div style={{marginLeft: '20px'}}>
            <div style={{marginBottom: '15px', height: '100%', float: 'left', width: '100%'}}>
            <h5 id="error-message" style={{color: "red"}}></h5>
            <h5 id="success-message" style={{color: "green"}}></h5>
            <i id="delete_user_message" style={{color: "red"}}></i>
            <div id="user_view_details"></div>
            <h3>Lisää käyttäjä</h3>
            <div className="dashBoardInputs" >
                Nimi
                <Input 
                style={{width: '90%'}}
                onChange={this.name.bind(this)}
                value={this.state.name}
                />
            </div>

            <div className="dashBoardInputs">
                Sähköposti '@domain.com'
                <Input 
                style={{width: '90%'}}
                onChange={this.email.bind(this)}
                value={this.state.email}
                />
            </div>
            <div className="dashBoardInputs">
              Koulu
              <select placeholder="School name" 
                    style={{width: '90%'}}
                    className="loginInputs"
                    onChange={this.schoolName.bind(this)}
                    >
                    <option value="">Select your School</option>
                    <option value='1'>Imatra North</option>
                    <option value='2'>Imatra South</option>
              </select>
            </div>

            <div className="dashBoardInputs" >
                Salasana
                <Input 
                type="password"
                style={{width: '90%'}}
                onChange={this.password.bind(this)}
                value={this.state.password}
                />
            </div>
            <div className="dashBoardInputs" >
                Salasana uudelleen
                <Input 
                type="password"
                style={{width: '90%'}}
                onChange={this.passwordAgain.bind(this)}
                value={this.state.passwordAgain}
                />
            </div>

            <div className="dashBoardInputs" >
                Admin 
                {/* <input type="checkbox" onChange={this.userTypes.bind(this)}  value="admin"/> */}
                <select 
                    style={{width: '90%'}}
                    className="loginInputs"
                    onChange={this.userTypes.bind(this)}
                    >
                    <option value="">User type</option>
                    <option value='admin'>Admin</option>
                    <option value='student'>Student</option>
              </select>
            </div>

            <div className="dashBoardInputs" >
                <Button 
                onClick={this.save_user.bind(this)}
                style={{marginTop:'15px'}}
                >
                    Tallenna
                </Button>
            </div>
            </div>

            <div className="content">
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  pagination={true}
                  selectRow={ selectRow }
                  options={options}
                    deleteRow
                    exportCSV
                    >
                  <TableHeaderColumn
                    dataField='id'
                    isKey
                    width="50px"
                    dataSort>
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='name'
                    width="15%"
                    filter={ { type: 'TextFilter'} }
                    dataSort>
                    Nimi
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='email'
                    width="15%"
                    dataSort>
                    Sähköposti
                  </TableHeaderColumn>
                  <TableHeaderColumn
                        dataField='button'
                        dataFormat={this.cellButton.bind(this)}
                  />
                  <TableHeaderColumn
                    dataField='button'
                    dataFormat={this.viewButton.bind(this)}
                  />
                  <TableHeaderColumn
                    dataField='button'
                    dataFormat={this.deleteButton.bind(this)}
                   />
                  <TableHeaderColumn width="20%"></TableHeaderColumn>
                </BootstrapTable>
              </div>
            
        </div>
      );
    }
  }
  
  