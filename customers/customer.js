 const express = require('express');
 const mongoose = require('mongoose');
 const bodyParser = require('body-parser');
 require('./CustomerModel');


 // create an instance for the book model
 const Customer = mongoose.model("Customer");



 const app = express();

 app.use(express.json());

 mongoose.connect("mongodb://host.docker.internal:27017/customerservicedb", {
     useUnifiedTopology: true,
     useNewUrlParser: true
 }, () => {
     console.log('database connected for customer service');
 });

 app.get('/', (req, res) => {
     res.send('this is first endpoint in the customer section');
 })

 app.post('/customer', async (req, res) => {
     try {
        var customer =  {...req.body}
     var toCustomer = await new Customer(customer);
     const response = await toCustomer.save()
     await res.send({
       message: "Customer created",
       data: response._doc
   })  
     } catch (error) {
         console.log(error);
         res.send({
             message: "an error occured please try again"
         })
     }
    
 });

 app.get('/customers', async (req, res) => {
     try {
        const customers = await Customer.find({});
        res.send({
            message: "list fetched successfully",
            data: customers
        });
     } catch (error) {
        console.log(error);
        res.send({
            message: "an error occured please try again"
        })
     }
     
 });

 app.get('/customer/:id', async (req, res) => {
    try {
        const id = req.params.id;
       const customer = await Customer.findById(id);
       if (customer) {
        res.send({
            message: "Profile fetched successfully",
            data: customer
        });
       } else {
           res.status(404).send ( {
            message: "Profile not found"
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

 app.listen(5555, () => {
     console.log('book server up and running');
 })