const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema({
  author: String,
  title: {
    type: String,
    required: true,
  },
  publisher: String,
  language: String,
  pages: Number,
  year: Number
});

let Book = mongoose.model("Book" , BookSchema);

module.exports = Book;
