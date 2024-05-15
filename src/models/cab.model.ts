
import { profile } from 'console';
import mongoose, {Schema, Document, Model} from 'mongoose'
import { setTheUsername } from 'whatwg-url';
import * as yup from 'yup';
import { ICab } from '../interface/data.interface';

// Cab schema
const cabSchema = new Schema<ICab>({
    type: {
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
      ref: 'UserModel',
      required: true,
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
    pricePerKm: {
      type: Number,
      required: true,
    },
  });



export const CabModel: Model<ICab> = mongoose.model('Cab', cabSchema);

