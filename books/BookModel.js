const mongoose = require('mongoose');

// create a model which is a reference to our collection


mongoose.model('Book', {
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type:Number,
        require: false,
    },
    publisher: {
        type: String,
        require: false
    }
})