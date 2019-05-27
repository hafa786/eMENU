/**
 * Restfull Api Endpoints
 */

let express = require("express");
var app = express();
var session = require('express-session')
var cookieParser = require('cookie-parser')

const database = require("../db/database");
const db = require("../db/db");

app.listen(5000,() => {
 console.log(`Example app listening on port! 5000`);
});
////////////////////// //////////// session //////////
app.use(cookieParser())
    .use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: null },
    }));
/////////////////////////////////////////////////////

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get("/names", (req, res, next) => {
    res.json(database.database._connect())
});

// ******************* read data ***********************
app.get("/read", (req, res, next) => {
    // calling the database 
    res.json(database.database._read())
});

// ******************* insert data ***********************
app.post("/insert", (req, res, next) => {
    // calling the database 
    res.json(database.database._insert())
});

// ******************* updata data ***********************
app.put("/modify", (req, res, next) => {
    // calling the database 
    res.json(database.database._modify())
});

// ******************* delete data ***********************
app.delete("/remove", (req, res, next) => {
    // calling the database 
    res.json(database.database._delete())
});

/// ********************************************************************* users////////////////
// check if email already exist
app.get("/emailexist/:email/", async (req, res, next) => {
    // calling the database 
    var email = req.params.email
    let _r = await db.checkstudentexist(email)
    console.log(_r.length);
    res.send(_r.length);
});

// sign up for the student
app.get("/signup/:name/:email/:school/:password/:type/", async (req, res, next) => {
    // calling the database 
    var student = req.params.name
    var email = req.params.email
    var password = req.params.password
    var type = req.params.type
    var school_ID = req.params.school
    let _r = await db.signup(student,email,password,school_ID,type)
    console.log(_r);
    if(_r.length > 0) {
        res.send(_r);
    }
    else {
        res.send([])
    }
});
app.post("/login/:email/:password/", async (req, res, next) => {
    // calling the database 
    var email = req.params.email;
    var pass = req.params.password;
    console.log(req.params)
    let _r = await db.getlogin(email,pass)
    //console.log(_r);
    res.send(_r);
});

app.get("/get_session_data/", async (req, res, next) => {
    console.log("**************** session ***********");
    console.log(req.session.username);
    if (req.session.loggedin) {
        console.log(req.session.username);
		res.send([req.session.username]);
	} else {
		res.send([]);
	}
	res.end();
});

// get users list
app.get("/userslist/", async (req, res, next) => {
    // calling the database 
    // var email = req.params.email
    let _r = await db.get_users()
    //console.log(_r.length);
    res.send(_r);
});

// changepassword
app.put("/changepassword/:userid/:password/", async (req, res, next) => {
    // calling the database 
    var userID = req.params.userid
    var newPassword = req.params.password
    var newPass = (Buffer.from(newPassword)).toString('base64');
    let _r = await db.changePass(userID,newPass)
    res.send(_r);
});

// single food by ID
app.get("/single_user/:userID", async (req, res, next) => {
    // calling the database
    var userID = req.params.userID;
    let _r = await db.singleuser(userID)
    res.send(_r);
});

// delete user by ID
app.delete("/delete_user/:userID", async (req, res, next) => {
    // calling the database
    var userID = req.params.userID;
    let _r = await db.remove_user(userID)
    res.send(_r);
});

//// ***************************************************** FOODS *********************** 


// add new foods - admin or food provider
app.post("/postjamixfood/:foodname/:scheduleddate/:description/:price/:school/", async (req, res, next) => {
    // calling the database 
    var fname = req.params.foodname
    var date = req.params.scheduleddate
    var descriptionrough= req.params.description
    let buff = new Buffer(descriptionrough, 'base64');  
    let descriptionrough2 = buff.toString('ascii');
    let description = decodeURI(descriptionrough2)
    var price = req.params.price
    var school_ID = req.params.school
    let de = await db.delete_food_by_date(date)
    let _r = await db.post_foods(fname,date,description,price, school_ID)
    console.log(_r);
    res.send(_r);
});

// add new foods - admin or food provider
app.post("/postfood/:foodname/:scheduleddate/:description/:price/:school/", async (req, res, next) => {
    // calling the database 
    var fname = req.params.foodname
    var date = req.params.scheduleddate
    var description = req.params.description
    var price = req.params.price
    var school_ID = req.params.school
    let _r = await db.post_foods(fname,date,description,price, school_ID)
    console.log(_r);
    res.send(_r);
});

// get foods for a single day ////
app.get("/getfood/:datex/:school/", async (req, res, next) => {
    // calling the database 
    var datex = req.params.datex
    var school = req.params.school
    let _r = await db.getsinglefood(datex, school)
    console.log(_r);
    res.send(_r);
});

// get all foods
app.get("/allfoods/", async (req, res, next) => {
    // calling the database
    let _r = await db.getallfoods()
    console.log(_r);
    res.send(_r);
});

app.post("/modifyfoods/:foodID/:schoolid/:name/:scheduleddate/:description/:price/", async (req, res, next) => {
    // calling the database
    var foodID = req.params.foodID
    var SchoolID = req.params.schoolid
    var name = req.params.name
    var scheduleddate = req.params.scheduleddate
    var description = req.params.description
    var price = req.params.price
    let _r = await db.modify_food(foodID,SchoolID,name,scheduleddate,description,price)
    res.send(_r);
});


// get all food in past 3 weeks
app.get("/pastthreeweeksfoods/", async (req, res, next) => {
    // calling the database
    var today = new Date();
    //var nextweek = today.setDate(today.setDate()+21);
    var passweek = new Date(+new Date - ((6.04e+8 * 3)));
    console.log(today,passweek);
    let _r = await db.past_foods(today,passweek)
    // console.log(_r);
    res.send(_r);
});


// get all food in future 3 weeks
app.get("/futurethreeweeksfoods/", async (req, res, next) => {
    // calling the database
    var today = new Date();
    //var nextweek = today.setDate(today.setDate()+21);
    var nextweek = new Date(+new Date + ((6.04e+8 * 3)));
    console.log(today,nextweek);
    let _r = await db.future_foods(today,nextweek)
    // console.log(_r);
    res.send(_r);
});


// remove foods
app.delete("/delete_food/:foodID", async (req, res, next) => {
    // calling the database
    var foodID = req.params.foodID;
    let _r = await db.remove_food(foodID)
    res.send(_r);
});

// single food by ID
app.get("/single_food/:foodID", async (req, res, next) => {
    // calling the database
    var foodID = req.params.foodID;
    let _r = await db.single_food(foodID)
    res.send(_r);
});

// ***************************************** feedbacks //////////////////////

// all feedbacks list
app.get("/feedbacks/", async (req, res, next) => {
    // calling feedbacks operator
    let _result= await db.all_feedback();
    console.log(_result);
    res.send(_result);
});

// all feedbacks list
app.get("/feedbacks/:user/", async (req, res, next) => {
    // calling feedbacks operator
    var user = req.params.user
    let _result= await db.single_feedback(user);
    console.log(_result);
    res.send(_result);
});

// ******************************** voting ////////////////////////////////
// single foods on date
app.get("/votings/", async (req, res, next) => {
    // calling the database 
    let _result= await db.allvoting();
    console.log(_result);
    res.send(_result);
});

// single foods on date
app.get("/votingbyuser/:user/",async (req, res, next) => {
    // calling the database 
    var user = req.params.user
    let _result= await db.singlevotingbyuser(user);
    console.log(_result);
    res.send(_result);
});

// single foods on date
app.get("/votingbyfoods/:food/", async (req, res, next) => {
    // calling the database 
    var food = req.params.food
    let _result= await db.singlevotingbyfood(food);
    console.log(_result);
    res.send(_result);
});

// single foods on date
app.delete("/removevoting/:food/:userID/", async (req, res, next) => {
    // calling the database 
    var food = req.params.food
    var user = req.params.userID
    let r_old = await db.remove_old_future_voting(food,user);
    console.log(_result);
    res.send(_result);
});

// single foods on date
app.post("/postvoting/:food/:userID/:vote/", async (req, res, next) => {
    // calling the database 
    var food = req.params.food
    var user = req.params.userID
    var vote = req.params.vote
    let r_old = await db.remove_oldvoting(food,user);
    let _result= await db.postvoting(food,user,vote);
    console.log(_result);
    res.send(_result);
});

// single foods on date
app.post("/postfuturingvoting/:food/:userID/:futurevote/:sche_date/", async (req, res, next) => {
    // calling the database 
    var food = req.params.food
    var user = req.params.userID
    var futurevote = req.params.futurevote
    var sche_date = req.params.sche_date
    let r_old = await db.remove_single_old_future_voting_by_date(user,sche_date);
    let _result= await db.post_future_voting(food,user,futurevote,sche_date);
    console.log(_result);
    res.send(_result);
});

// ******************** Schools Endpoints ////////////////////////
// get school list
app.get("/schools/:school_ID", async (req, res, next) => {
    // calling the database 
    var school_ID = req.params.school_ID
    let _result= await db.getschools(school_ID);
    //console.log(_result);
    if(_result.length > 0 ){
        res.send(_result);
    }
    else{
        res.send([]);
    }
});

// get single school details
app.get("/singleschools/:school_ID", async (req, res, next) => {
    // calling the database 
    var school_ID = req.params.school_ID
    let _result= await db.single_school(school_ID);
    //console.log(_result);
    if(_result.length > 0 ){
        res.send(_result);
    }
    else{
        res.send([]);
    }
});

// add new school
app.post("/addnewschool/:name/:domain/:status/", async (req, res, next) => {
    // calling the database 
    var name = req.params.name
    var domain = req.params.domain
    var status = req.params.status
    let _r = await db.addschool(name,domain,status)
    res.send(_r);
});

// modify the school details
app.put("/modifyschool/:ID/:name/:domain/:status/", async (req, res, next) => {
    // calling the database 
    var SchoolID = req.params.ID
    var name = req.params.name
    var domain = req.params.domain
    var status = req.params.status
    let _r = await db.edit_school(SchoolID,name,domain,status)
    res.send(_r);
});

// get the school lists
app.get("/getschoolslist/", async (req, res, next) => {
    // calling the database 
    let _r = await db.allschools()
    res.send(_r);
});

// remove school
app.delete("/delete_school/:schoolID", async (req, res, next) => {
    // calling the database
    var schoolID = req.params.schoolID;
    let _r = await db.remove_school(schoolID)
    res.send(_r);
});