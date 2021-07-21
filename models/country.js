const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    places: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    
    },
    
})

module.exports = mongoose.model('Country', countrySchema)