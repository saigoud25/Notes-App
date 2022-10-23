const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const router = express.Router();

//Have to add notes to the user
router.get('/signin', async (req, res) => {
    try {
        
        const { email, password } = req.body;
        
        console.log("here");

        console.log(`${email} ${password}`);

        const oldUser = await User.findOne({ email });

        if(!oldUser) {
            return res.status(404).json({ message: "User Not Found..." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid Credentials..." });
        }

        res.status(200).json({ user_id: oldUser._id, message:"Sign In successfull..." })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const oldUser = await User.findOne({ email });

        console.log(oldUser);
        console.log(email +" "+ password +" "+ name);
        if(oldUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const arr = new Array();

        const result = await User.create({ email, password: hashedPassword, name , notes: arr});

        res.status(201).json({ user_id: result._id, message: "Signup successfull.." });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
});

//A testing route
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.send(users);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;