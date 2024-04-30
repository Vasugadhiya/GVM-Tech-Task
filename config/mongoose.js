const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("connection successfully");
}).catch((err)=>{
    console.log(`Failed to connect ${err.message}`);
})

module.exports = mongoose