const express = require('express');

const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const eventcontroller = require("../controller/eventcontroller");
const bookingcontroller = require("../controller/bookingcontroller");
const { verify } = require("../middleware/verify");

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/alldata", verify, usercontroller.alldata);


router.post("/createEvent", eventcontroller.createEvent);
router.get("/allEvent", verify, eventcontroller.getAllEvent);
router.get("/getAllEventById/:id", verify, eventcontroller.getAllEventById);

router.post("/bookingTicket", bookingcontroller.bookingTicket);
router.get("/getAllBooking", verify, bookingcontroller.getAllBooking);
router.get("/getAllBookingById/:id", verify, bookingcontroller.getAllBookingById);







module.exports = router