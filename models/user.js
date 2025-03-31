const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSh = new schema({
    email:{
        type:String,
        required:true
    },
    //username and passward feild automatically added by passportLocalMongoose
});

userSh.plugin(passportLocalMongoose);//why this written
//it automaticall hasihing salting the username and password

module.exports= mongoose.model('User',userSh);