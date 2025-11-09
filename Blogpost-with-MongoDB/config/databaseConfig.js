const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config({path: "./config.env"});

const databaseURL = process.env.databaseURL;


const connectDatabase = async function(){
    try {
        const connection = await mongoose.connect(databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); 
        console.log("Connected to Database");
    } 
    catch (error) {
        console.log("Unable to connect to Database");
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connectDatabase };