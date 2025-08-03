import jwt from 'jsonwebtoken';

const requireAuth = (req,res)=>{

    // verify authentication
    const token = req.cookies.token;
    if (!token) {
        throw Error('No authentication token');
    }
    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
        return _id;
    } catch (error) {
        throw Error("Authentication token is invalid");
    }
};

export default requireAuth;