import express, {Request, Response} from 'express'
import mongoose from 'mongoose';
import {CabTypeModel}  from '../models/cabType.model';
import { cabTypeValidationSchema } from '../validate/yupValidation';
import { ICabType } from '../interface/data.interface';


export class cabTypeServiceClass {
    createCabType = async(req:Request, res:Response) =>{
        try {
            await cabTypeValidationSchema.validate(req.body);
            const data = await CabTypeModel.create(req.body);
            return data;
        } catch (error:any) {
            throw new Error('Validation error: ' + error.message);
        }
    }

    getAllCabType = async(req:Request, res:Response) =>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const skip = Math.max(page - 1, 0) * limit;

            const searchQuery: any = {}
            if(req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    {name : {$regex:searchValue, $options: 'i'}},
                    
                ]
            }
            const filter = {...searchQuery}
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending

            const pipeline = [
                {$match: filter},
                {$skip: skip},
                {$limit: limit},
                {$sort: sort},
            ]

            const data  = await CabTypeModel.aggregate(pipeline).exec();
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getCabTypeById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = CabTypeModel.findById(id)
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteCabTypeById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await CabTypeModel.findByIdAndDelete(id);
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    updateCabTypeById = async (req:Request, res:Response) => {
        try {
            const {id} = req.params;
            const {name ,description, vehicle, price} = req.body;
            if(!name || !price){
                return res.status(400).json({ error: 'All fields are required.' });
            }
            await cabTypeValidationSchema.validate(req.body);
            const data = await CabTypeModel.findByIdAndUpdate(id,
                {name, description, vehicle, price},
                {new: true}
            );
            if (!data) {
                return res.status(404).json({ error: 'cab type not found' });
            }
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

}
