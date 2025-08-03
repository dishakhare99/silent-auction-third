import jwt from 'jsonwebtoken';

const requireAdmin = (req,res)=>{

    // verify authentication
    const token = req.cookies.token;
    if (!token) {
        throw Error('No authentication token');
    }
    try {
        const {admin} = jwt.verify(token, process.env.JWT_SECRET);
        if (!admin){
            throw Error('No access to execute this action');
        }
        return admin;
    } catch (error) {
        throw Error(error.message);
    }
};

export default requireAdmin;