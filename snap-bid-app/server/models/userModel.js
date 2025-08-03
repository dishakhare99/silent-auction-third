import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema, model} = mongoose;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
});

// Static register method (arrow function won't work as we use "this" keyword)
userSchema.statics.register = async function (userName, password) {
    if (!userName){
        throw Error('Username cannot be blank');
    }
    if (!password){
        throw Error('Password cannot be blank');
    }
    if (password.length < 3){
        throw Error('Password cannot be less than 3 characters');
    }

    const exists = await this.findOne({userName});
    if (exists){
        throw Error('Username already exists');
    }

    // generate salt and hass the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user in DB
    const user = await this.create({userName, password: passwordHash});

    return user;
}

// Static login method (arrow function won't work as we use "this" keyword)
userSchema.statics.login = async function (userName, password) {
    if (!userName){
        throw Error('Username cannot be blank');
    }
    if (!password){
        throw Error('Password cannot be blank');
    }

    // find user
    const user = await this.findOne({userName});
    if(!user){
        throw Error('User not found');
    }

    // confirm password
    const comparision = await bcrypt.compare(password, user.password);
    if (!comparision){
        throw Error('Wrong credentials');
    }
    return user;
}

const UserModel = model('User', userSchema);
export default UserModel;