const User = require("../../models/userModel");
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');


const signIn = async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json('Email Incorrect !!!')

    isCorrectPass = await bcrypt.compare(req.body.password, user.password); 
    if(!isCorrectPass) return res.status(400).json("Password Incorrect !!!")

    let token = jwt.sign({_id : user._id,role:user.role}, process.env.JWT_SECRET ,{expiresIn: "1h"})
    res.status(200).json({ _id: user._id,role: user.role,token });   
}

const signUp = async (req,res) =>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json("All fields are required !!!")
    }
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json('User already exists' );
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store hashed password
        });

        // Save the user to the database
        await newUser.save();

        // Respond with the newly created user (excluding password)
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                verified: newUser.verified,
                role: newUser.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}


// const forgetPassword = async(req,res)=>{
//     const user = User.findOne({email})
//     if(!user) return res.status(400).json('Email Incorrect !!!')
    
// }


module.exports = {
    signIn,
    signUp,

}