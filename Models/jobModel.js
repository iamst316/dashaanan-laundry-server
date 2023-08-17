const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: String,
    department: String,
    location: String,
    pay: Number,
    applicants: [
        {
            name: String
        }
    ],
    closed: Boolean
    
},{ typeKey: '$type' });


module.exports = mongoose.model("Job", jobSchema);