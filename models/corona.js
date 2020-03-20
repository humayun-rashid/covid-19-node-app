const mongoose = require('mongoose')

const coronaSchema = new mongoose.Schema (
{
    country:{
        type:String,
        required: true
    },
    total:{
        type:String,
        required: true
    },
    confirmed:{
        type:String,
        required: true
    },
    recovered:{
        type:String,
        required: true
    },
    deaths:{
        type:String,
        required: true
    },
    lastUpdate:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }

    

})

module.exports = mongoose.model ('Corona',coronaSchema)