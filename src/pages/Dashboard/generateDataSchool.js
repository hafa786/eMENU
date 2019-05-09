import faker from 'faker';
import React, { Component } from "react";
import EditButton from './EditButton';
export default class SchoolData extends React.Component {

  static getData () {

    let roughlist = []
    let row = null;
    let results =  fetch("http://localhost:5000/getschoolslist/").then(response => response.json()).then(data =>{
      
    for (let j=0; j < data.length; j++){
          row = {
            id: data[j].school_ID,
            name: data[j].school_name,
            domain: (data[j].domain).toString(),
          };
          roughlist.push(row);
          console.log(row);
      }
    });
    console.log(roughlist);
    if (roughlist) {
      return roughlist;
    }
    else{
      return [];
    }
  }
}
// export default () => {
//   let roughlist = []
//       let row = null;
//       let results =  fetch("http://localhost:5000/getschoolslist/").then(response => response.json()).then(data =>{
//         for (let j=0; j < data.length; j++){
//             row = {
//               id: data[j].school_ID,
//               name: data[j].school_name,
//             };
//             roughlist.push(row);
//         }
//       });
//       console.log(roughlist);
//       if (roughlist) {
//         return roughlist;
//       }
//       else{
//         return [];
//       }
//   // const data = [];
//   // for (let i = 1; i <= limit; i++) {
//   //   let row = null;
//   //   row = {
//   //     id: i,
//   //     name: "School name " + i,
//   //   };
//     // if (arrayData) {
//     //   row = [
//     //     i,
//     //     faker.name.findName(),
//     //     faker.finance.amount(),
//     //     faker.address.country(),
//     //     faker.image.avatar(),
//     //     faker.address.city(),
//     //     faker.name.jobTitle(),
//     //     faker.lorem.sentence(),
//     //     faker.random.boolean(),
//     //     faker.date.past()
//     //   ];
//     // } else {
//     //   row = {
//     //     id: i,
//     //     name: faker.name.findName(),
//     //     salary: faker.finance.amount(),
//     //     country: faker.address.country(),
//     //     avatar: faker.image.avatar(),
//     //     city: faker.address.city(),
//     //     job: faker.name.jobTitle(),
//     //     description: faker.lorem.sentence(),
//     //     active: faker.random.boolean(),
//     //     birthday: faker.date.past()
//     //   };
//     // }
//     //data.push(row);
//   //}
//   //return data;
// }