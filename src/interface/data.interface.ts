import mongoose ,{Schema,Document} from "mongoose";

 export interface IUser extends Document{
        userName: string,
        email: string,
        password: String,
        role: 'user' | 'admin' | 'driver',
        profile?:{
            firstName?: string,
            lastName?: string,
            age?: number
        }
        createAt: Date;
        token?: String;
}

export interface IDriver extends IUser {}

export interface IAdmin extends IUser {}
 
export interface ICab extends Document {
    type: Schema.Types.ObjectId,
    numberPlate: string;
    driver: Schema.Types.ObjectId,
    location?: {
      type?: string;
      coordinates?: [number, number];
    };
    pricePerKm: number;
}

// CabType interface
export interface ICabType extends Document {
    name: string;
    description?: string;
    vehicle?: string;
}