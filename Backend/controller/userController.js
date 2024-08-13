const Users = require('../models/usermodel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getUser = async (req, res) => {
    const {email,password,name} = req.body;
    const checker = await Users.findOne({email})
    if(!checker)
        {
            res.status(400).json({message:"User not found"})
        }
    const pass = await bcrypt.compare(password,checker.password)
    if(!pass){
        res.status(400).json({message:"User not found"})
    }
    const token = jwt.sign({
        user_id:checker.id},
        "service_Token",{expiresIn:"1h"}
    )
    res.status(201).json(token)
}

const postUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const check = await Users.findOne({ email });

        if (!check) {
            const user = new Users({
                name,
                email,
                password
            });
            await user.save();
            res.status(201).json({ message: "User created successfully", user });
        } else {
            res.status(400).json({ message: "User with this email already exists" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Users.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedpassword = await bcrypt.hash(password,15)
        const updatedUser = await Users.findOneAndUpdate(
            { name },
            { email, hashedpassword }, 
            { new: true } 
        );
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (e) {
        res.status(500).json({ message: "An error occurred", error: e.message });
    }
};

module.exports = { getUser, postUser, updateUser};
