const booking = require("../model/bookingTicketmodel");
const event = require("../model/eventbookmodel");
const { ObjectId } = require('mongodb')

const bookingTicket = async (req, res) => {
    try {
        const { eventId, tickets, userId } = req.body;
        if (!eventId || !tickets) return res.status(404).json({ message: "All Fields Are Required" });
        
        const findevent = await event.findById(eventId);
        if (!findevent) {
            return res.status(200).json({ message: "Event Not Found" });
        }

        if (tickets > findevent.availableTickets) {
            return res.status(200).json({ message: "Not enough tickets available" });
        }

        // Update available tickets after booking
        findevent.availableTickets -= tickets;
        await findevent.save();

        const newbooking = new booking({
            eventId: eventId, 
            tickets: tickets,
            userId: userId,
        });
        await newbooking.save();
        
        return res.status(200).json({ message: "Event Book successfully Done" });
    } catch (err) {
        console.log(err.message);
        return res.status(404).json({ message: "something went wrong" });
    }
};

const getAllBooking = async (req, res) => {
    try {
        const findalldata = await booking.find({})
        if (findalldata) {
            return res.status(200).json({ message: "Booking found Success", data: findalldata });
        }
        else {
            return res.status(404).json({ message: "No Data Found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Something went wronging" });
    }
}

const getAllBookingById = async (req, res) => {
    try {
        const findalldata = await booking.findById(req.params.id)
        if (findalldata) {
            return res.status(200).json({ message: "Booking found Success", data: findalldata });
        }
        else {
            return res.status(404).json({ message: "No Data Found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Something went wronging" });
    }
}


module.exports = {
    bookingTicket,
    getAllBooking,
    getAllBookingById,
}