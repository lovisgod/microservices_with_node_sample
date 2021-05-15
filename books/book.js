 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 require('./BookModel');


 // create an instance for the book model
 const Book = mongoose.model("Book");



 const app = express();

 app.use(bodyParser.json())
 app.use(express.json());

 mongoose.connect("mongodb://localhost:27017/bookservicedb", {
     useUnifiedTopology: true,
     useNewUrlParser: true
 }, () => {
     console.log('database connected');
 });

 app.get('/', (req, res) => {
     res.send('this is first endpoint in the book section');
 })

 app.post('/book', async (req, res) => {
     try {
        var book =  {...req.body}
     var toBook = await new Book(book);
     const response = await toBook.save()
     await res.send({
       message: "Book created",
       data: response._doc
   })  
     } catch (error) {
         console.log(error);
         res.send({
             message: "an error occured please try again"
         })
     }
    
 });

 app.get('/books', async (req, res) => {
     try {
        const books = await Book.find({});
        res.send({
            message: "list fetched successfully",
            data: books
        });
     } catch (error) {
        console.log(error);
        res.send({
            message: "an error occured please try again"
        })
     }
     
 });

 app.get('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
       const book = await Book.findById(id);
       if (book) {
        res.send({
            message: "book fetched successfully",
            data: book
        });
       } else {
           res.send ( {
            message: "Book not found"
           })
       }
       
    } catch (error) {
       console.log(error);
       res.send({
           message: "an error occured please try again"
       })
    }
    
});

 app.listen(4545, () => {
     console.log('book server up and running');
 })