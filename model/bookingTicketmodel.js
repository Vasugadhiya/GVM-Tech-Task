const { default: mongoose } = require("mongoose");

const bookingshcema = mongoose.Schema({
    eventId : {
        type : mongoose.Schema.Types.ObjectId,
        //type : String,
        ref : "eventbook",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        //type : String,
        ref : "user",
        required : true
    },
    tickets : {
        type : Number,
        required : true
    },
}, { timestamps: true })

const booking = mongoose.model("ticketBooking",bookingshcema);

module.exports = booking;