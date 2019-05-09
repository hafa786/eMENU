import { Modal, Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Input } from 'reactstrap';
import generateData from './generateDataProduct';
import { BootstrapTable, TableHeaderColumn, ButtonGroup} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './style.css';
import axios from 'axios';
import { round } from 'gl-matrix/src/gl-matrix/vec3';
const data = generateData.getData()

export default class ProductSection extends React.Component {
    constructor () {
        super();
        this.state = {
          selected_date:'',
          nameFood: '',
          product: '',
          data: generateData.getData() //generateData(500, false)
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

    nameFood(value){
        this.setState({nameFood: value.target.value});
    }
    product(value){
        this.setState({product: value.target.value});
    }
    schedule_date(value){
      this.setState({schedule_date: value.target.value});
    }
    schoolName(value){
      this.setState({schoolname: value.target.value});
    }
    selected_date(value){
      this.setState({selected_date:value.target.value});
    }
    async import_jamix(){
      // var selecteddate = this.state.selected_date;
      // var filtered_date = selecteddate.replace("-",'').replace("-","");
      // alert(filtered_date);
      let row = null;
      let today_menu_data = [];
      await fetch("https://www.jamix.fi/ruokalistapalvelu/rest/haku/menu/12345/3").then(response => response.json()).then(data =>{ 
        console.log(data[0].menuTypes[0].menus[0].days.length);
        for (let i=0;  i<data[0].menuTypes[0].menus[0].days.length; i++) {
          let date_date =data[0].menuTypes[0].menus[0].days[i].date.toString();
          console.log(data[0].menuTypes[0].menus[0].days[i]);
          //console.log(data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems.slice(-1));
          let namepart = data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems.slice(-1);
          let ingredientsroughhh = '';
          let dietsdadds = '';
          let fname = ''; 
          let description = '';
          for (let k=0; k<data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems.length; k++){
            if (data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems[k].name !=''){
              description += '<h6>'+ data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems[k].name + '</h6>';
            }
            if (data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems[k].diets != '' || data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems[k].diets !="***"){
              description += data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems[k].diets;
            }
            if(data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems[k].ingredients != ''){
              description += data[0].menuTypes[0].menus[0].days[i].mealoptions[0].menuItems[k].ingredients + '';
            }
          }
          row = {
            "date" : date_date.slice(0, 4) + '-' + date_date.slice(4, 6) + '-' + date_date.slice(6, 8),
            "food_name": 'Launas',
            "Descriptoion": description
          }
          today_menu_data.push(row);
        }
      });
      console.log(today_menu_data);
      const import_food_message = document.querySelector("#import_food_message");
      for (let i=0; i < today_menu_data.length; i++) {
        let foodname = today_menu_data[i].food_name
        let selecteddate = today_menu_data[i].date
        let Descriptoion = today_menu_data[i].Descriptoion
        var foodDescription1 = encodeURI(Descriptoion);
        let buff = new Buffer(foodDescription1);  
        let foodDescription = buff.toString('base64');
        var URi = 'http://localhost:5000/postjamixfood/'+foodname+'/'+selecteddate+'/'+foodDescription+'/free/1/';
        let add_menu =  await axios.post(URi).then(data => {
              console.log(data.data);
              import_food_message.innerHTML =data.data ;
            });
      }

    }
    addFoods(){
        //save data to backend
      const errormessagebox = document.querySelector("#add_food_message_error");
      const successmessagebox = document.querySelector("#add_food_message_success");
      var foodname = this.state.nameFood;
      var school = this.state.schoolname;
      var foodDescription = this.state.product;
      var scheduledData = this.state.schedule_date;
      if (!foodname){
        errormessagebox.innerHTML = "Please enter food name properly" + foodname + " |";
      }
      else if (!school){
        errormessagebox.innerHTML = "Please school name properly";
      }
      else if (!foodDescription){
        errormessagebox.innerHTML = "Please enter the food description";
      }
      else if (!scheduledData){
        errormessagebox.innerHTML = "please select scheduled Data";
      }
      else{
        let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/postfood/'+foodname+'/'+scheduledData+'/'+foodDescription+'/free/'+school+'/').then(data => {
          console.log(data);
          if (data){
            errormessagebox.innerHTML = "";
            successmessagebox.innerHTML = foodname + " has been registered successfully.";
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
        //this.setState({name: '', product: ''});
    }

    removeItem = itemId => {
      this.setState({
          data: data.filter(item => item.id !== itemId)
      });
  }


onClickRemoveProduct(cell, row, rowIndex){
  let regis_message_p = document.querySelector("#delete_food_message");
  var r = window.confirm("Are you sure to remove this food?");
  if (r == true) {
    let signupoutput =  JSON.stringify(axios.get('http://localhost:5000/delete_food/'+(row.id).toString()).then(data => {
      console.log(data);
      if (data){
        regis_message_p.innerHTML = "Your foods has been deleted.";
      }else {
        regis_message_p.innerHTML = "Cancelled";
      }
    })
    );
  } else {
    regis_message_p.innerHTML = "You have cancelled it.";
  }
 }
 onClickProductView(cell, row, rowIndex){
  let food_viewHtml = document.querySelector("#food_view");
  let results =  fetch("http://localhost:5000/single_food/"+(row.id).toString()).then(response => response.json()).then(data =>{
    for (let j=0; j < data.length; j++){
          let html = '<b>Name: </b>'+data[j].food_name + '<br></br><b>Description: </b>'+data[j].description + '<br></br><b>Schedule Date: </b>'+data[j].scheduled_date + '<br></br>';
          html += '<b>Added Data: </b>' + data[j].dated;
          food_viewHtml.innerHTML = html;
      }
    });
 }

 onClickProductSelected(cell, row, rowIndex){
  let regis_message_p = document.querySelector("#delete_food_message");
  regis_message_p.innerHTML = 'Foods # '+ row.id;
  console.log('Product #', row.id);
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
        this.onClickProductView(cell, row, rowIndex)}
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
        this.onClickRemoveProduct(cell, row, rowIndex)}
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
            <i id="add_food_message_success" style={{color: "green"}}></i>
            <i id="add_food_message_error" style={{color: "red"}}></i>
            <i id="delete_food_message" style={{color: "red"}}></i>
            <i id="view_food_message" style={{color: "red"}}></i>
            <div id="food_view"></div>
            <h3>Lisää uusi ateria</h3>
            <div className="foodsInputtwenty" >
                Otsikko
                <Input 
                style={{width: '90%'}}
                onChange={this.nameFood.bind(this)}
                value={this.state.name}
                />
            </div>
            <div className="foodsInputtwenty" >
                Pvm
                <Input type="date"
                style={{width: '90%'}}
                onChange={this.schedule_date.bind(this)}
                value={this.state.schedule_date}
                />
            </div>
            <div className="foodsInputtwenty" >
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
            <div className="foodsInputdesc" >
                Kuvaus
                <textarea rows="3" 
                className="form-control" 
                placeholder="Here is your description" 
                onChange={this.product.bind(this)}
                value={this.state.product}
                style={{width: '90%'}}
                />
            </div>

            {/* <div style={{float: 'left', width: '20%'}}>
                Image
                <input type="file" />
            </div> */}

            <div className="foodsInputsave" >
                <Button 
                onClick={this.addFoods.bind(this)}
                style={{marginTop:'15px'}}
                >

                    Tallenna
                </Button>
            </div>

            </div>
            <div style={{marginBottom: '15px', height: '100%', float: 'left', width: '100%'}}>
              <h4>Import Menu</h4><br></br>
              <i id="import_food_message" style={{color: "green"}}></i><br></br>
              {/* <div className="foodsInputtwenty" >
                Date
                <Input type="date"
                style={{width: '90%'}}
                onChange={this.selected_date.bind(this)}
                value={this.state.selected_date}
                />
              </div> */}
              <div className="foodsInputsave" >
                <Button 
                onClick={this.import_jamix.bind(this)}
                style={{marginTop:'15px'}}
                >
                    Import
                </Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
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
                    dataField='scheduled_date'
                    width="15%"
                    dataSort>
                    Pvm
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
  
  