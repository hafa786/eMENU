
var mysql = require('mysql');
var sql_create_db = "CREATE DATABASE eMENU"; 
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "emenu",
//   // port: "3306"
// });
var connection = mysql.createConnection({
  host: "10.55.96.3",
  user: "root",
  password: "t1LdMuauiqNLKDli",
  database: "emenu",
  // port: 3306
});
// developing connection
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// create database
function create_database(){
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query(sql_create_db, function (err, result) {
      if (err) console.log(err.sqlMessage);
      console.log("Table created");
    });
  });
}
// create table
function create_table(){
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE users (ID INT(11) AUTOINCREAEN,email VARCHAR(255), password VARCHAR(255), type VARCHAR(255), dated VARCHAR(255) )";
    connection.query(sql, function (err, result) {
      if (err) console.log(err.sqlMessage);
      console.log("Table created");
    });
  });
}
// insert in table
function insert(){
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (username, password, type , dated) VALUES ('hafiz', 'hafiz12345','admin','12.2.2019')";
    connection.query(sql, function (err, result) {
      if (err) console.log(err.sqlMessage);
      console.log("Table created");
    });
  });
}
// update table
function update(){
    console.log("Connected!");
    var sql = "UPDATE users SET username = 'Canyon 123' WHERE username = 'hafiz'";
    connection.query(sql, function (err, result) {
      if (err) console.log(err.sqlMessage);
      console.log("Table created");
    });
}
// select data
function select(user_id){
  console.log("************************");
  console.log(user_id);
  connection.query("SELECT * FROM users where ID = ? AND password = ? ", [user_id,'123456'], function (err, result) {
    if (err) throw err;
    console.log("Table Records");
    console.log(result)
  });
}

// delete data
function deleted(){
    var sql = '';
    connection.query(sql, function (err, result) {
      if (err) console.log(err.sqlMessage);
      console.log("Table created");
    });
  //});
}

// ************************************ users /////////////////////////////
function studentexist(email){
  console.log("************************");
    // console.log(date.toString());
    // console.log(schoolID.toString());
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("SELECT ID from users WHERE email = ?", [email], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve([true]);
      }); 
    })
}

function insert_student(name,email,passw,school,type){
  console.log("************************");
    // console.log(date.toString());
    // console.log(schoolID.toString());
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("INSERT INTO users (email, password, name,school_ID, status, types , dated) VALUES (?, ?,?,?,'1',?,?)", [email, passw,name,school,type,dated], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve("student has been registered.");
      }); 
    })
}


// select data http://localhost:8081/login/1/123456/
function login(email, password){
  console.log("************************");
  console.log(email);
  return new Promise((resolve,reject ) => {
    connection.query("SELECT * FROM users WHERE email = ? AND password = ? ", [email, password], function (err,result) {
      if (err) return reject(err.message);
      //console.log('from db.js', result);
      resolve(result);
    }); 
  })
}

function getuserslist(){
  console.log("************************");
    // console.log(date.toString());
    // console.log(schoolID.toString());
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM users", function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

function changePassword(user_ID, newPassword){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    //var newPass = (Buffer.from(newPassword)).toString('base64');
    //console.log("newpass",newPass);
    return new Promise((resolve,reject )=>{
      connection.query("UPDATE users SET password = ?  WHERE ID = ? ", [newPassword, user_ID], function (err,result) {
        if (err) return reject(err.message);
        console.log(result.affectedRows + " record(s) updated");
        resolve(result.affectedRows + " record(s) updated");
      }); 
    })
}

function deleteUser(user_ID){
  console.log("************************");
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM users WHERE ID = ? ", [user_ID], function (err,result) {
        if (err) return reject(err.message);
        console.log(result.affectedRows + " record(s) updated");
        resolve(result.affectedRows + " record(s) updated");
      }); 
    })
}
// get single food.
function get_single_user(userID){
  console.log("************************");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM users where ID = ? ", [userID.toString()], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js: get_single_user  ', result);
        resolve(result);
      }); 
    })
}
// ******************************************************* foods /////////////////////////////

// insert foods in db.
function insert_food(foodname,scheduleddate,description,price, schoolID,){
  console.log("************************");
    // console.log(date.toString());
    // console.log(schoolID.toString());
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("INSERT INTO foods (food_name, scheduled_date, description,price,school_ID, dated) VALUES (?,?,?,?,?,?)", [foodname, scheduleddate,description,price,schoolID,dated], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve("New food has been added successfully");
      }); 
    })
}


// get food list against a single day.
function get_foodByDate(date, schoolID){
  console.log("************************");
    console.log(date.toString());
    console.log(schoolID.toString());
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM foods where scheduled_date = ? AND school_ID = ? ", [date.toString(), schoolID.toString()], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}
// Lut !12345
// get food list against a single day.
function get_allfoods(){
  console.log("************************");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM foods", function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

// get pass three weeks foods.
function get_all_pastfoods(today,endofweeks){
  console.log("************************");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM foods WHERE scheduled_date <= ? AND scheduled_date >= ?",[today,endofweeks], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

// future three weeks foods
function get_all_futurefoods(today,endofweeks){
  console.log("************************");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM foods WHERE scheduled_date >= ? AND scheduled_date <= ?",[today,endofweeks], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

function edit_foods(foodID,school,name,scheduled_date,decription,price){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("UPDATE foods SET food_name = ?, scheduled_date = ?, description = ?, price = ?, school_ID = ?, dated = ?  WHERE food_ID = ? ", [name,scheduled_date, decription,price,school,dated,foodID], function (err,result) {
        if (err) return reject(err);
        console.log(result.affectedRows + " record(s) updated");
        resolve(result.affectedRows + " record(s) updated");
      }); 
    })
}
function delete_food(foodID){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM foods WHERE food_ID = ?", [foodID], function (err,result) {
        if (err) return reject(err);
        console.log(result.affectedRows + " record(s) updated");
        resolve(result.affectedRows + " record(s) updated");
      }); 
    })
}

function delete_foodBydate(foodDate){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM foods WHERE scheduled_date = ?", [foodDate], function (err,result) {
        if (err) return reject(err);
        console.log(result.affectedRows + " record(s) updated");
        resolve(result.affectedRows + " record(s) updated");
      }); 
    })
}

// get single food.
function get_single_food(foodID){
  console.log("************************");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM foods where food_ID = ? ", [foodID.toString()], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js: get_single_food  ', result);
        resolve(result);
      }); 
    })
}

// **************************************** feedbacks ************************************
// get food list against a single day.
function allfeebacks(){
  console.log("************************");
  console.log("All feedbacks");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM feedbacks", function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

// get food list against a single day.
function singlefeedback(user){
  console.log("************************");
  console.log("All feedbacks");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM feedbacks WHERE user_ID=?",[user], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

// *********************************** voting /////////////////////////

// post voting ////////////
function add_voting(foodid,userid,vote){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("INSERT INTO votes (user_ID, food_ID, vote, dated) VALUES (?,?,?,?)", [userid,foodid,vote,dated], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve("Thanks,voting has been done.");
      }); 
    })
}

// get all_votings.
function all_voting(){
  console.log("************************");
  console.log("All votings");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT votes.vote_ID AS vote_ID,votes.vote AS voting,votes.future_vote AS rating, foods.food_name AS foodname, foods.scheduled_date AS scheduled_date FROM votes JOIN foods ON votes.food_ID = foods.food_ID", function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

// get voting list against foods.
function votingbyfood(food_id){
  console.log("************************");
  console.log("Voting by food");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM votes WHERE food_ID= ?",[food_id.toString()], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}
//7329


// get voting list against foods.
function votingbyuser(user_id){
  console.log("************************");
  console.log("Voting by user");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM votes WHERE user_ID= ?",[user_id.toString()], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

// post future voting ////////////
function add_futurevoting(foodid,userid,vote,sche_date){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("INSERT INTO votes (user_ID, food_ID,scheduled_date, future_vote, dated) VALUES (?,?,?,?,?)", [userid,foodid,sche_date,vote,dated], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve("Thanks,voting has been done.");
      }); 
    })
}

// remove old voting ////////////
function remove_old_voting(foodid,userid){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM votes WHERE food_ID = ? AND user_ID = ? AND vote != ?", [foodid,userid,''], function (err,result) {
        if (err) return reject(err);
        resolve("Old future voting has been removed");
      }); 
    })
}

// remove old voting ////////////
function remove_oldfuture_voting(foodid,userid){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM votes WHERE food_ID = ? AND user_ID = ? AND future_vote != ?", [foodid,userid,''], function (err,result) {
        if (err) return reject(err);
        resolve("Old future voting has been removed");
      }); 
    })
}


// remove old voting ////////////
function remove_old_single_futurevoting_bydate(userid,sche_date){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM votes WHERE user_ID = ? AND scheduled_date = ?", [userid,sche_date], function (err,result) {
        if (err) return reject(err);
        resolve("Old future voting has been removed");
      }); 
    })
}


// remove old voting ////////////
function remove_old_single_future_voting_byfood(foodid,userid){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM votes WHERE food_ID = ? AND user_ID = ? AND scheduled_date = ?", [foodid,userid,sche_date], function (err,result) {
        if (err) return reject(err);
        resolve("Old future voting has been removed");
      }); 
    })
}

/// ************************** Schools ***************************
function getschool(school_ID){
  console.log("************************");
  console.log("Schools list");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT domain FROM schools WHERE school_ID = ? ",[school_ID], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

function getsingleschool(school_ID){
  console.log("************************");
  console.log("Schools list");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM schools WHERE school_ID = ? ",[school_ID], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

function allschools(){
  console.log("************************");
  console.log("Schools list");
    return new Promise((resolve,reject )=>{
      connection.query("SELECT * FROM schools", function (err,result) {
        if (err) return reject(err.message);
        console.log('from db.js', result);
        resolve(result);
      }); 
    })
}

function add_newschool(name,domain,status){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("INSERT INTO schools (school_name, domain, status, dated) VALUES (?,?,?,?)", [name, domain,status,dated], function (err,result) {
        if (err) return reject(err);
        console.log('from db.js', result);
        resolve("Schools has been registered.");
      }); 
    })
}

function modifyschool(ID,name,domain,status){
  console.log("************************");
    var dated = (new Date()).toLocaleDateString();
    return new Promise((resolve,reject )=>{
      connection.query("UPDATE schools SET school_name = ?,domain = ?, status = ?, dated = ?  WHERE school_ID = ? ", [name, domain,status,dated,ID], function (err,result) {
        if (err) return reject(err);
        console.log(result.affectedRows + " record(s) updated");
        resolve("Schools has been modified.");
      }); 
    })
}
function deleteSchool(school_ID){
  console.log("************************");
    return new Promise((resolve,reject )=>{
      connection.query("DELETE FROM schools WHERE school_ID = ? ", [school_ID], function (err,result) {
        if (err) return reject(err.message);
        console.log(result.affectedRows + " record(s) updated");
        resolve(result.affectedRows + " record(s) updated");
      }); 
    })
}

module.exports = {
    read : select,
    update: update,
    delete: deleted,
    insert: insert,
    // foods
    post_foods : insert_food,
    getsinglefood: get_foodByDate,
    getallfoods: get_allfoods,
    modify_food:edit_foods,
    past_foods: get_all_pastfoods,
    future_foods: get_all_futurefoods,
    remove_food: delete_food,
    single_food:get_single_food,
    delete_food_by_date:delete_foodBydate,
    // feedbacks
    all_feedback: allfeebacks,
    single_feedback:singlefeedback,
    // voting
    postvoting:add_voting,
    allvoting:all_voting,
    singlevotingbyfood:votingbyfood,
    singlevotingbyuser:votingbyuser,
    post_future_voting : add_futurevoting,
    remove_old_future_voting : remove_oldfuture_voting,
    remove_oldvoting: remove_old_voting,
    remove_single_old_future_voting: remove_old_single_future_voting_byfood,
    remove_single_old_future_voting_by_date: remove_old_single_futurevoting_bydate,
    // users
    signup: insert_student,
    get_users:getuserslist,
    getlogin:login,
    checkstudentexist:studentexist,
    changePass:changePassword,
    singleuser:get_single_user,
    remove_user: deleteUser,
    // schools
    getschools:getschool,
    allschools:allschools,
    addschool:add_newschool,
    edit_school: modifyschool,
    single_school:getsingleschool,
    remove_school:deleteSchool,
}