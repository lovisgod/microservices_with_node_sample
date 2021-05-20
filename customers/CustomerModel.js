const mongoose = require('mongoose');

// create a model which is a reference to our collection


mongoose.model('Customer', {
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type:String,
        require: false,
    }
})