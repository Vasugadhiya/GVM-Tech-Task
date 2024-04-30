const event = require("../model/eventbookmodel");

const createEvent = async (req, res) => {
    try {
        const { eventname, date, time, venue , availableTickets } = req.body;
        if (!eventname, !date, !time, !venue, !availableTickets) return res.status(404).json({ message: "All Fieldes Are Required" });
        const findevent = await event.findOne({ eventname: eventname })
        if (findevent) {
            return res.status(200).json({ message: "Event is alredy exists" })
        }
        else {
            const newevent = new event({
                eventname: eventname, 
                date: date,
                time: time,
                venue: venue, 
                availableTickets : availableTickets
            })
            newevent.save();
            return res.status(200).json({ message: "Event registered successfully" });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(404).json({ message: "something went wrong" })
    }
}



const getAllEvent = async (req, res) => {
    try {
        const findalldata = await event.find({})
        if (findalldata) {
            return res.status(200).json({ message: "Event found Success", data: findalldata });
        }
        else {
            return res.status(404).json({ message: "No Data Found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Something went wronging" });
    }
}

const getAllEventById = async (req, res) => {
    try {
        const findalldata = await event.findById(req.params.id)
        if (findalldata) {
            return res.status(200).json({ message: "Event found Success", data: findalldata });
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
    createEvent,
    getAllEvent,
    getAllEventById,
}