const User = require("../models/user.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

module.exports = function loginRoutes(app) {

  //Login existing User
  app.post("/login", function(req,res){
    User.findOne({email: req.body.email}, function(err,user){
      if(err){
        console.log(err);
      }
      else{
        bcrypt.compare(req.body.password, user.password, function(err,result){
          if(result === true){
            console.log("User verified: " + req.session);
            req.session.email = user.email;
            return res.status(200).json({status: true, msg: "User verified"});
          }
          else{
            console.log("Error during verification: " + err)
            return res.status(500).json({status: false, msg: "User or password are invalid"});
          }
        })
      }
    })
  })


  //Register new user request
  app.post("/register", function(req, res) {
    let newUser = new User({email: req.body.email, password: req.body.password})

    newUser.save(function(err, result) {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(500).send({
          status: false,
          msg: "Registration failed, error: " + err
        });
      } else {
        res.status(200).send({status: true, msg: "Registration sucessfull"});
      }
    })
  })

}
