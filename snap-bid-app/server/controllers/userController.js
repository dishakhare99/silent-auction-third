import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';


// Token creator
const createToken = (_id, userName, admin) => {
    return jwt.sign({_id: _id, userName: userName, admin: admin}, process.env.JWT_SECRET, {expiresIn:'1d'});
}

// Login User
const loginUser = async (req,res) => {

    const {userName, password} = req.body;
    try {
        const user = await UserModel.login(userName, password);
        const admin = user.admin;
        const token = createToken(user._id, user.userName, admin);
        const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie('token', token, { 
            // domain: 'https://snap-bid-app.vercel.app',
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', 
            secure: true, 
            // sameSite: 'Strict',
            sameSite: 'None',
            expires: expireDate
        });
        res.status(200).json({userName});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Register user
const registerUser = async (req,res) => {
    const {userName, password} = req.body;
    try {
        const user = await UserModel.register(userName, password);
        const admin = user.admin;
        const token = createToken(user._id, user.userName, admin);
        const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie('token', token, { 
            // domain: 'https://snap-bid-app.vercel.app',
            httpOnly: true, 
            // secure: process.env.NODE_ENV === 'production', 
            secure: true, 
            // sameSite: 'Strict',
            sameSite: 'None',
            expires: expireDate
        });
        res.status(200).json({userName});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Logout user
const logoutUser = (req,res)=>{
    res.clearCookie('token', {
        // domain: 'https://snap-bid-app.vercel.app',
        httpOnly: true, 
        // secure: process.env.NODE_ENV === 'production', 
        secure: true, 
        // sameSite: 'Strict',
        sameSite: 'None',
    });
    res.status(200).json({message: "Logged out..."});
}

//Check Cookie
const checkCookie = (req,res)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ auth: false, admin: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ auth: true, admin: decoded.admin });
    } catch (error) {
        res.status(401).json({ auth: false, admin: false });
    }
}

export {loginUser, registerUser, logoutUser, checkCookie};

