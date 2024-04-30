const { default: mongoose } = require("mongoose");

const eventshcema = mongoose.Schema({
    eventname : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    venue : {
        type : String,
        required : true
    },
    availableTickets : {
        type : Number,
        required : true
    },
}, { timestamps: true })

const event = mongoose.model("eventbook",eventshcema);

module.exports = event;