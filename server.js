// Start mongoDB "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"

//Change between modes for testing, development and production
//Using either the test, dev or prod MongoDB!
//By default, run it in development mode
//The environment is set by the name of the json file located inside ./config ->thanks to config package
//The names of these .json files are custom, a real app you should use test.json, dev.json,... ;-)
//Don't forget to set this environment inside package.json!
process.env.NODE_ENV = "test-environment";
console.log("Environment mode is set to: " + process.env.NODE_ENV);


const config = require("config"); //Package working more flexible with /config files and environments
console.log("MongoDB in use: " + config.mongoDBLoc )
console.log("Environment mode is set to: " + config.util.getEnv('NODE_ENV')); //Now we can also access the env with config


//Require packages/middlewares
const express = require("express"); //Route and app handler
const bodyParser = require("body-parser"); //Parse requested data from body
const mongoose = require("mongoose"); // Connect to MongoDB database
const morgan = require("morgan"); // Log HTTP transfers
const bcrypt = require("bcrypt"); //Hash and Salt passwords
const session = require("express-session"); //Handle logged in sessions
const assert = require("assert");// Used for mocha testing
const MongoStore = require("connect-mongo")(session); //Used to store sessions in Mongo db
const helmet = require("helmet"); //Security plugin
const key = require("./config/keys.json"); //Store and import all keys from here

//Connect to mongodb using the environment location
mongoose.connect(config.mongoDBLoc);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //Show error if connection error


//Make express app
const app = express();

//Helmet is a security package
app.use(helmet());

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test-environment') {
    //Use Morgan to log HTTP transfers
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//Use bodyparser to get POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Add session settings
app.use(session({
  secret: key.sessionKey,
  name: "sessionId", //Use non-standard cookie names, this is similar to hiding X-Powered-By
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: db})
}))

//Include Login.js
const loginRoutes = require("./routes/login.js")
loginRoutes(app);



// Include dashboard.js
const bookRoutes = require("./routes/bookroutes.js");
bookRoutes.bookRoutes(app);


app.get("/admin/*", bookRoutes.validateUser, bookRoutes.accessAdmin);












//Show static folder
app.use(express.static("./public"));

//Create server
app.listen(3000);
console.log("Now listening to port 3000");

//Export server.js so it can be used for testing
module.exports = app;
