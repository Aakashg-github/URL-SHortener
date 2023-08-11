const {v4 : uuidv4} = require('uuid');
const User = require("../models/user");
const { setuser } = require('../service/auth');

const signup = async (req,res)=> {
    const {name,email,password} = req.body;

    try{
        const existinguser = await User.findOne({email : email}); 
        if(existinguser){
            return res.render('login');
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message : "something went wrong"});
    }
    
    await User.create({
        name,
        email,
        password
    });

    return res.redirect('/url/home');
}

const login = async (req,res)=> {
    const {email,password} = req.body;
    
    const user = await User.findOne({email : email});
    if(!user)
        return res.render('signup',{error : "INVALID USER OR PASSWORD"});

    const sessionId = uuidv4();
    setuser(sessionId,user);
    res.cookie('uid',sessionId);
    return res.redirect('/url/home');
}

module.exports = {
    signup,
    login
}