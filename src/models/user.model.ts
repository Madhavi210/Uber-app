//Users model 
import { profile } from 'console';
import mongoose, {Schema, Document, Model} from 'mongoose'
import { setTheUsername } from 'whatwg-url';
import * as yup from 'yup'
import { IUser, IAdmin, IDriver } from '../interface/data.interface';

    const userSchema = new Schema<IUser>({
        userName: {
            type:String,
            required: true,
            unique: true,
        },
        email: {
            type:String,
            required: true,
            unique: true,
        }, 
        password: {
            type:String,
            required: true,
        },
        role: {
            type: String,
            enum : ["user", "admin", "driver"],
            default: "user"
        },
        profile:{
            firstName: String,
            lastName: String,
            age: Number,
        },
        createAt: {
            type: Date,
            default: Date.now,
        },
        token:{
            type: String
        },
        refreshToken: {
            type: String,
        },
    },{timestamps: true});

//user schema
export const UserModel: Model<IUser> = mongoose.model('User', userSchema);

// Admin schema
export const AdminModel: Model<IAdmin> = mongoose.model('Admin', userSchema);

// Driver schema
export const DriverModel: Model<IDriver> = mongoose.model('Driver', userSchema);



