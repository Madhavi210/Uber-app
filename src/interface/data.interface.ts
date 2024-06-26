import mongoose, { Schema, Document } from "mongoose";
import { PaymentOption } from "../enums/paymentOption.enum";
import { userRole } from "../enums/user.enum";


export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  role: userRole;
  profile?: {
    firstName?: string;
    lastName?: string;
    age?: number;
  };
  createAt: Date;
  token?: string;
  refreshToken?: string;
}

export interface IDriver extends IUser {}

export interface IAdmin extends IUser {}

export interface ICab extends Document {
  Cabtype: Schema.Types.ObjectId;
  numberPlate: string;
  driver: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
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


