
import { profile } from 'console';
import exp from 'constants';
import mongoose, {Schema, Document, Model} from 'mongoose'
import { setTheUsername } from 'whatwg-url';
import * as yup from 'yup'
import { ICabType } from '../interface/data.interface';

// CabType schema
const cabTypeSchema = new Schema<ICabType>({
    name: {
      type: String,
      required: true,
    },
    description: String,
    vehicle: String,
});



export const CabTypeModel: Model<ICabType> = mongoose.model('CabType', cabTypeSchema);

