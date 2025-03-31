const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const mongoUrl  = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(() => {
    console.log("Connect to db");
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(mongoUrl);
}

const initDB = async() => {
    await listing.deleteMany({});
    //map function not change the array it create  new array
    initData.data = initData.data.map((obj) => ({...obj,owner:"67e7c9bcee7a5cfedd6ec913"}));
    await listing.insertMany(initData.data);
    console.log("data was initializesd");
};

initDB();