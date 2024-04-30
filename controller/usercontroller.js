const user = require("../model/usermodel");
const event = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { email, password, phone, name } = req.body;
        if (!name, !password, !phone, !email) return res.status(404).json({ message: "All Fieldes Are Required" });
        if (!email.includes("@")) return res.status(404).json({ message: "Please Enter Valid Email" });
        const finduser = await user.findOne({ email: email })
        if (finduser) {
            return res.status(200).json({ message: "email is already in use" })
        }
        else {
            const bpass = await bcrypt.hash(password, 10)
            const newuser = new user({
                name: name, 
                email: email,
                password: bpass,
                phone: phone,
            })
            newuser.save();
            return res.status(200).json({ message: "user registered successfully" });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(404).json({ message: "something went wrong" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(404).json({ message: "Required all Fields" });

        const finduser = await user.findOne({ email: email });

        if (!finduser) return res.status(404).json({ message: "User Not Found" });

        const chechpass = await bcrypt.compare(password, finduser.password);

        if (chechpass === true) {
            const token = jwt.sign({ _id: finduser._id }, process.env.JWT_SECRET)
            return res.status(200).json({ message: "Login Successfully", token: token });
        }
        else {
            return res.status(404).json({ message: "Password Does Not Match" });
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Something went wronging" });
    }

}

const alldata = async (req, res) => {
    try {
        const findalldata = await user.find({})
        if (findalldata) {
            return res.status(200).json({ message: "User found", data: findalldata });
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
    register,
    login,
    alldata,
}