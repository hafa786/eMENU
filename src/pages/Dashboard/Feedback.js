import { Modal, Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Input } from 'reactstrap';
import generateData from './generateDataFeedback';
import generateDataLikes from './generateDataLikes';
import { BootstrapTable, TableHeaderColumn, ButtonGroup} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import FeedbackGraph from './FeedbackGraph';
import FeedbackGraphLikes from './FeedbackGraphLikes'
import { Tabs, Tab } from 'react-bootstrap';
import './style.css'

const data = generateData.getData();
const dataLikes = generateDataLikes.getData();

export default class FeedbackSection extends React.Component {
    constructor () {
        super();
        this.state = { 
          name: '',
          product: '',
          data: generateData.getData(),
          dataLikes: generateDataLikes.getData(),
        }
      }

    name(value){
        this.setState({name: value.target.value});
    }
    product(value){
        this.setState({product: value.target.value});
    }

    save(){
        //save data to backend
        this.setState({name: '', product: ''});
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
  

    render() {

      const { data } = this.state;
      const options = {
        sizePerPage: 10,
        prePage: 'Previous',
        nextPage: 'Next',
        firstPage: 'First',
        lastPage: 'Last',
        hideSizePerPage: true,
      };
      const selectRow = {
        mode: 'checkbox'
      };
      
      return (
        <div >

       <div className="mobilefeedback">
            <div className="content">
              <BootstrapTable
                data={data}
                bordered={false}
                striped
                pagination={true}
                options={options}
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
                  User
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField='product'
                  width="15%"
                  dataSort>
                  Product
                </TableHeaderColumn>
                
                <TableHeaderColumn
                  dataField='rating'
                  width="30%"
                  dataSort>
                  Rating
                </TableHeaderColumn>
                <TableHeaderColumn width="20%"></TableHeaderColumn>
              </BootstrapTable>
            

            <BootstrapTable
                  data={dataLikes}
                  bordered={false}
                  striped
                  pagination={true}
                  options={options}
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
                    Food
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='product'
                    width="15%"
                    dataSort>
                    Date
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='rating'
                    width="30%"
                    dataSort>
                    Likes
                  </TableHeaderColumn>
                  <TableHeaderColumn width="20%"></TableHeaderColumn>
                </BootstrapTable>
                </div>

            <FeedbackGraph />
            <FeedbackGraphLikes />
        </div>

        <div className="browserfeedback">
          <Tabs defaultActiveKey={1}>
            <Tab eventKey={1} title="Äänet" style={{paddingTop: '0px', backgroundColor: 'white'}}>

              <div className="content">
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  pagination={true}
                  options={options}
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
                    Ruoka
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='product'
                    width="15%"
                    dataSort>
                    Pvm
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='rating'
                    width="30%"
                    dataSort>
                    Äänet
                  </TableHeaderColumn>
                  <TableHeaderColumn width="20%"></TableHeaderColumn>
                </BootstrapTable>
              </div>

            </Tab>

            <Tab eventKey={2} title="Tykkäykset" style={{paddingTop: '0px', backgroundColor: 'white'}}>

              <div className="content">
                <BootstrapTable
                  data={dataLikes}
                  bordered={false}
                  striped
                  pagination={true}
                  options={options}
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
                    Ruoka
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='product'
                    width="15%"
                    dataSort>
                    Pvm
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='rating'
                    width="30%"
                    dataSort>
                    Tykkäykset
                  </TableHeaderColumn>
                  <TableHeaderColumn width="20%"></TableHeaderColumn>
                </BootstrapTable>
              </div>

              </Tab>

            <Tab eventKey={3} title="Graafit" style={{backgroundColor: 'white'}}>
              
              <FeedbackGraphLikes />
              <FeedbackGraph />
            </Tab>
          </Tabs>
      
          </div>
           
            
            
        </div>
      );
    }
  }
  
  