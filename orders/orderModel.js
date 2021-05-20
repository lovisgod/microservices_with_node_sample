const mongoose = require('mongoose');

// create a model which is a reference to our collection


mongoose.model('Order', {
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    initialDate: {
        type:Date,
        require: true,
    },
    deliveryDate: {
        type:Date,
        require: true
    }
})