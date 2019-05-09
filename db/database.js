const db = require("./db");

const database = {
     _connect : function(){
        console.log('in connect func')
        return [
            {name: "Tony", email: "bac@abc.com"},
            {name: "Tony 2", email: "bac@abc.com"},
            {name: "Tony 3", email: "bac@abc.com"},
            {name: "Tony 4", email: "bac@abc.com"}]
    },
    _read(user_id){
        //db.read();
        //console.log(db.read());
        res = db.read(user_id);
        return res.toString();
    },
    _login(user,pass){
        //db.read();
        //console.log(db.read());
        // console.log('From database.js',db.getlogin(user,pass));
        return db.getlogin(user,pass);
    },
     _insert(){
        db.insert();
        return [
            {name: "insert"}
        ]
    },
     _delete(){
        db.delete();
        return [
            {name: "delete"}
        ]
    },
     _modify(){
        db.update();
        return [
            {name: "modify"}
        ]
     
    },
    _getfoodofday(datex,schoolID){
        db.getsinglefood(datex,schoolID);

    },
    _getfoods(){
        db.getallfoods();
    },
    _getfeebacks(){
        db.all_feedback();
    },
    _getvotings(){
        console.log(db.allvoting());
        //console.log(result);
        console.log("************************");
    },
    _getfoodsvotings(food_id){
        db.singlevotingbyfood(food_id);
    },
    _getuservotings(user_id){
        db.singlevotingbyuser(user_id);
    }
}

module.exports = {
    database : database
}