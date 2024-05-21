import mongoose ,{Schema,Document} from "mongoose";
import { PaymentOption } from "../enums/paymentOption.enum";

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
        refreshToken?: String;
}

export interface IDriver extends IUser {}

export interface IAdmin extends IUser {}
 
export interface ICab extends Document {
  Cabtype: Schema.Types.ObjectId,
    numberPlate: string;
    driver: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    location?: {
      type?: string;
      coordinates?: [number, number];
    };
    distanceInKm: number;
  totalCharge?: number;
  pickupFrom: string;
  dropTo: string;
  paymentOption: PaymentOption;
}

// CabType interface
export interface ICabType extends Document {
    name: string;
    description?: string;
    vehicle?: string;
    pricePerKm: number;
}

