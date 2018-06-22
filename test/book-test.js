// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

//During the test the env variable is set to test
//Disables HTTP logs of morgan
process.env.NODE_ENV = 'test-environment';

const mongoose = require("mongoose");

//Import codes
const Book = require("../models/book.js");
const bookRoutes = require("./routes/bookroutes.js");
const server = require("../server.js");

//Parent test block, usually linked to the name of this whole test file

describe("Books Test", function() {
  before(function(done) { //Before the test, empty the books database
    Book.remove({}, function(err) {
      done;
    })
  });

  /*
  * Test the /GET route/request
  */

  describe("GET Book requests", function(){
      if("Get all the books" , function(done){

      })

  })

  //END of BOOKS TEST
}
