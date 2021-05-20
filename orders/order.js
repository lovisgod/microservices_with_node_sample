 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 const axios = require('axios');
 require('./orderModel');


 // create an instance for the book model
 const Order = mongoose.model("Order");



 const app = express();

 app.use(express.json());

 mongoose.connect("mongodb://localhost:27017/orderservicedb", {
     useUnifiedTopology: true,
     useNewUrlParser: true
 }, () => {
     console.log('database connected for order service');
 });

 app.get('/', (req, res) => {
     res.send('this is first endpoint in the order section');
 })

 app.post('/order', async (req, res) => {
     try {
        var order =  {
            customerId: mongoose.Types.ObjectId(req.body.customerId),
            bookId: mongoose.Types.ObjectId(req.body.bookId),
            initialDate: req.body.initialDate,
            deliveryDate: req.body.deliveryDate
        }
     var toOder = await new Order(order);
     const response = await toOder.save()
     await res.send({
       message: "Order made",
       data: response._doc
   })  
     } catch (error) {
         console.log(error);
         res.send({
             message: "an error occured please try again"
         })
     }
    
 });

 app.get('/orders', async (req, res) => {
     try {
        const orders = await Order.find({});
        res.send({
            message: "list fetched successfully",
            data: orders
        });
     } catch (error) {
        console.log(error);
        res.send({
            message: "an error occured please try again"
        })
     }
     
 });

 app.get('/order/:id', async (req, res) => {
    try {
        const id = req.params.id;
       const order = await Order.findById(id);
       if (order) {
           const customer = await axios.get(`http://localhost:5555/customer/${order.customerId}`);
           const book = await axios.get(`http://localhost:4545/books/${order.bookId}`);
           console.log(customer);
           console.log(book);
        res.send({
            message: "order fetched successfully",
            data: {
                book: book.data.data,
                customer: customer.data.data,
                order
            }
        });
       } else {
           res.status(404).send ( {
            message: "order not found"
           })
       }
       
    } catch (error) {
       console.log(error);
       res.status(500).send({
           message: "an error occured please try again"
       })
    }
    
});

app.delete('/customer/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const deleted = await Customer.findOneAndRemove(id);
        console.log(deleted)
        if (deleted) {
            res.send({
                message: "Profile deleted successfully"
            })
        } else {
            res.status(404).send({
                message:"Profile not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "An error occured please trya again"
        })
    }
})

 app.listen(7777, () => {
     console.log('book server up and running');
 })