const Book = require("../models/book.js")
const mongoose = require("mongoose");

function bookRoutes(app) {

  // Check if user is logged in based on session to access /admin




  // Get all books
  app.get("/get-books", function(req, res) {
    Book.find().collation({locale: "simple"}).sort({author: 1}).then(function(data) {
      res.status(200).send({status: true, msg: "Books on the way!", books: data});

    })
  })

  // Adding new books to db
  app.post("/admin/add-book", function(req, res) {
    if (req.body.title !== null) {
      let newBook = new Book({
        author: req.body.author,
        title: req.body.title,
        publisher: req.body.publisher,
        language: req.body.language,
        pages: req.body.pages,
        year: req.body.year
      });

      newBook.save(function(err, result) {
        console.log(result);
        if (err) {
          console.log(err);
          res.status(500).send({
            status: false,
            msg: "Book not saved, error: " + err
          });
        } else {
          res.status(200).send({status: true, msg: "Book sucessfully saved"});
        }
      })
    }
  });

//Remove book
  app.delete("/admin/remove-book", function(req, res) {
    Book.findOneAndRemove({
      _id: req.body.id
    }, function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({
          status: false,
          msg: "Book not removed, error: " + err
        });
      } else {
        res.status(200).send({status: true, msg: "Book sucessfully removed"});
      }
    })

  });

  //Logout from session
  app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        console.log("Error destroying session: " + err)
        return res.status(500).send({
          status: false,
          msg: "Error logging out, error: " + err
        });
      } else {
        console.log("Session destroyed!")
        return res.clearCookie('connect.sid', {path: '/'}).status(200).redirect("/");
      }
    })
  })


  //END
};

function accessAdmin(req,res,next){
  console.log("Validated");
  next();
}

//Validate user based on session key
function validateUser(req, res, next) {
  console.log(req.session.email)
  if (req.session.email !== undefined) {
    console.log("User is verified to access");
    next();
  } else {
    console.log("Failed: User not verified, redirect to 404");
    return res.redirect("/404.html");
  }
}

module.exports = {bookRoutes, accessAdmin, validateUser};
