
import { profile } from 'console';
import mongoose, {Schema, Document, Model} from 'mongoose'
import { setTheUsername } from 'whatwg-url';
import * as yup from 'yup';
import { ICab } from '../interface/data.interface';
import { PaymentOption } from "../enums/paymentOption.enum";


// Cab schema
const cabSchema = new Schema<ICab>({
  Cabtype: {
      type: Schema.Types.ObjectId,
      ref: 'CabTypeModel',
      required: true,
    },
    numberPlate: {
      type: String,
      required: true,
      unique: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'DriverModel',
      required: true,
    },
    userId:{
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    location: {
      type: { 
        type: String,
        enum: ['Point'],
        default: 'Point'
       },
      coordinates: [Number],
    },
    distanceInKm:{
      type: Number,
      required: true,
    },
    totalCharge:{
      type: Number,
      default: 0,
    },
    pickupFrom: {
      type: String,
      required: true,
    },
    dropTo: {
      type: String,
      required: true,
    },
    paymentOption: {
      type: String,
      // enum: ["cash", "online"],  
      enum: Object.values(PaymentOption),
      default: PaymentOption.CASH,
      // default: "cash"
    }
  });

  // cabSchema.pre('deleteOne',{ document: true }, async function(this:any, next) {
  //   try {
  //       const cabRecord = mongoose.model<ICab>("Cab"); // Get the medicalRecords model
  //       await cabRecord.deleteMany({ userId: this._id });
  //       next();
  //   } catch (error:any) {
  //       next(error);
  //   }
  // })


export const CabModel: Model<ICab> = mongoose.model('Cab', cabSchema);

