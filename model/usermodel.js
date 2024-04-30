const { default: mongoose } = require("mongoose");

const userscema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    phone : {
        type : Number
    },
    password : {
        type : String
    },
},{ timestamps: true })

const user = mongoose.model("user",userscema);

module.exports = user;


