require("dotenv").config();

const express = require("express");
app = express();
const port = process.env.PORT || 3000;
require("./config/mongoose")
const userrouter = require("./router/userrouter");
const passport = require("passport");

app.use(passport.initialize());
require("./config/passport")

app.use(express.json());
app.use(userrouter)

app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})





