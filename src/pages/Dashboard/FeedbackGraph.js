import { Modal, Button } from 'react-bootstrap';
import React, { Component } from "react";
import { Input } from 'reactstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip , BarChart, Bar, Legend } from 'recharts';
// const data = [
//     {name: 'Food A', uv: 400, pv: 2400, amt: 2400},
//     {name: 'Food B', uv: 480, pv: 2100, amt: 2900},
//     {name: 'Food C', uv: 1400, pv: 1400, amt: 1400}
// ];
// const dataTwo = [
//     {vote: 7, votes: 3, pv: 2400, amt: 2400},
//     {vote: 6, votes: 2, pv: 2100, amt: 2900},
//     {vote: 5, votes: 6, pv: 1400, amt: 1400},
//     {vote: 4, votes: 7, pv: 1400, amt: 1400},
//     {vote: 3, votes: 9, pv: 1400, amt: 1400}
// ];

export default class FeedbackSection extends React.Component {
    constructor () {
        super();
        this.state = { 
            graphdata: [
                this.getGraphdata()
            ],
            graphWidth: 600,
        }
      }
    componentDidMount(){
        if(window.innerWidth < 600){
            this.setState({graphWidth: 300})
        }
    }
    async getGraphdata() {
        //fetch data
      let data_array = []
      await fetch("http://localhost:5000/votings/")
      .then(response => response.json())
      .then(data =>{
          let row = null;
          data.forEach(voting_stuff => {
            if(voting_stuff.rating === 'like' ){
              row = {
                vote: voting_stuff.vote_ID, 
                Tykkäykset: 3, 
                pv: 1400, 
                amt: 1400
              }
              data_array.push(row);
            }
            
          });

      });
      console.log(data_array);
        //add data to array graphdata
      this.setState({graphdata:data_array})
    }

    render() {
      
      return (
        <div style={{marginLeft: '20px'}}>
            {/* <div style={{float: 'left', width: '49%'}}> */}
           {/* <LineChart width={this.state.graphWidth} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart> */}
            {/* </div>
            <div style={{float: 'left', width: '49%'}}> */}
            {/* <BarChart width={this.state.graphWidth} height={300} data={dataTwo}>
                <XAxis dataKey="vote" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar type="monotone" dataKey="votes" fill="#8884d8" barSize={30} />
            </BarChart> */}
            <BarChart width={this.state.graphWidth} height={300} data={this.state.graphdata}>
                <XAxis dataKey="votes" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <Bar type="monotone" dataKey="Tykkäykset" fill="#8884d8" barSize={30} />
            </BarChart>
            {/* </div> */}
        </div>
      );
    }
  }
  
  