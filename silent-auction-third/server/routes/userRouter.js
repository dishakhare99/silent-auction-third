import Router from 'express';
import {loginUser, registerUser, logoutUser, checkCookie} from '../controllers/userController.js';

const userRouter = Router();

// Login
userRouter.post('/login', loginUser);

//Signup
userRouter.post('/register', registerUser);

//Logout
userRouter.post('/logout', logoutUser);

//Cookie check
userRouter.get('/check-token', checkCookie);

export default userRouter;