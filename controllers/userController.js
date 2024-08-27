const User = require("../models/userModel")


const getUsers = async (rea,res)=>{

    token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if (req.user.role) {
            const users = await User.find();
            res.status(200).json(users);
        }else{
            res.status(401).send('Access Denied !!! ')
        }
        }catch(err){
            res.status(400).send('Invalid Token');
        }
}

const deleteUser = async (rea,res)=>{
    token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        if (req.user.role == "admin") {
            const user = await User.findByIdAndDelete(req.params.id);
            res.json(user);
        }else{
            res.status(401).send('Access Denied !!! ')
        }
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}


module.exports = {
    getUsers,
    deleteUser
}