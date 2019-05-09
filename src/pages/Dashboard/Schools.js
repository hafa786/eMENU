import { Modal, Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Input } from 'reactstrap';
import generateData from './generateDataSchool';
import { BootstrapTable, TableHeaderColumn, ButtonGroup} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './style.css';
import axios from 'axios';
const data = generateData.getData()

export default class SchoolSection extends React.Component {
    constructor () {
        super();
        this.state = { 
          name: '',
          product: '',
          data: generateData.getData()
        }
      }

    name(value){
        this.setState({name: value.target.value});
    }
    domain(value){
      this.setState({domain: value.target.value});
    }

    save(){
        //save data to backend
        //this.setState({name: '', product: ''});
      const errormessagebox = document.querySelector("#error_message_school");
      const successmessagebox = document.querySelector("#success_message_school");
      var schoolname = this.state.name;
      var domain = this.state.domain;
      if (!schoolname){
        errormessagebox.innerHTML = "Please enter school name properly";
      }
      else if (!domain){
        errormessagebox.innerHTML = "Please school domain name properly";
      }
      else{
        let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/addnewschool/'+schoolname+'/'+domain+'/1/').then(data => {
          console.log(data);
          if (data){
            errormessagebox.innerHTML = "";
            successmessagebox.innerHTML = schoolname + " has been registered successfully.";
          }else {
            errormessagebox.innerHTML = data;
            successmessagebox.innerHTML = "";
          }
        })
        );
        if (signupoutput == '{}' ){
          errormessagebox.innerHTML = signupoutput;
          successmessagebox.innerHTML = "";
        }
      }
      let regis_message_p = document.querySelector("#delete_school_message");
      var schoolview = document.getElementById("school_view");
      regis_message_p.style.display= "none";
      schoolview.style.display="none";
    }

    removeItem = itemId => {
      this.setState({
          data: data.filter(item => item.id !== itemId)
      });
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

onClickProductSelected(cell, row, rowIndex){
  var schoolview = document.getElementById("school_view");
  schoolview.style.display = "none";
  let error_message_school = document.querySelector("#error_message_school");
  error_message_school.innerHTML = 'Schools # '+ row.id;
  console.log('Product #', row.id);
 }
 onClickDeleteSchool(cell, row, rowIndex){
  let regis_message_p = document.querySelector("#delete_school_message");
  var r = window.confirm("Are you sure to remove this school?");
  if (r == true) {
    let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/delete_school/'+(row.id).toString()).then(data => {
      console.log(data);
      if (data){
        regis_message_p.innerHTML = "Your school has been deleted.";
      }else {
        regis_message_p.innerHTML = "Cancelled";
      }
    })
    );
  } else {
    regis_message_p.innerHTML = "You have cancelled it.";
  }
  let food_viewHtml = document.querySelector("#school_view");
  let hide1 = document.querySelector("#error_message_school");
  food_viewHtml.style.display = "none";
  food_viewHtml.style.display = "none";
 }
 onClickViewSchool(cell, row, rowIndex){

  let food_viewHtml = document.querySelector("#school_view");
  let hide1 = document.querySelector("#error_message_school");
  hide1.style.display = "none";
  let results =  fetch("http://localhost:5000/singleschools/"+(row.id).toString()).then(response => response.json()).then(data =>{
    for (let j=0; j < data.length; j++){
          let html = '<b>ID: </b>'+data[j].school_ID + '<br></br><b>Name: </b>'+data[j].school_name + '<br></br><b>Domain: </b>'+data[j].domain + '<br></br>';
          html += '<b>Added Data: </b>' + data[j].dated;
          food_viewHtml.innerHTML = html;
      }
    });
    var schoolview = document.getElementById("school_view");
    schoolview.style.display = "block";
 }

 cellButton(cell, row, enumObject, rowIndex) {
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
  return (
     <button 
        type="button" 
        style={{height: '30px', paddingTop: '3px'}}
        className={ `btn btn-success` }
        onClick={() => 
        this.onClickViewSchool(cell, row, rowIndex)}
     >
     View 
     </button>
  )
}

deleteButton(cell, row, enumObject, rowIndex) {
  return (
     <button 
        type="button" 
        style={{height: '30px', paddingTop: '3px'}}
        className={ `btn btn-danger` }
        onClick={() => 
        this.onClickDeleteSchool(cell, row, rowIndex)}
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
            <i id="error_message_school"></i>
            <i id="success_message_school"></i>
            <i id="delete_school_message" style={{color: "red"}}></i>
            <div id="school_view"></div>
            <h3>Lisää uusi koulu</h3>
            <div className="schoolsInput" >
                Nimi
                <Input 
                style={{width: '90%'}}
                onChange={this.name.bind(this)}
                />
            </div>
            <div className="schoolsInput"  >
                Domain
                <Input 
                style={{width: '90%'}}
                onChange={this.domain.bind(this)}
                />
            </div>

            <div className="schoolsSave" >
                <Button 
                onClick={this.save.bind(this)}
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
                  options={options}
                  deleteRow
                    exportCSV
                    selectRow={ selectRow }
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
                    dataField='domain'
                    width="15%"
                    filter={ { type: 'TextFilter'} }
                    dataSort>
                    Domain
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
  
  