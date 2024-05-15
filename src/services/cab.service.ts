import express, {Request, Response} from 'express'
import mongoose from 'mongoose';
import {CabModel}  from '../models/cab.model';
import { cabTypeValidationSchema } from '../interface/yupValidation';
import { ICab } from '../interface/data.interface';


export class cabServiceClass {
    createcab = async(req:Request, res:Response) =>{
        try {
            await cabTypeValidationSchema.validate(req.body);
            const data = await CabModel.create(req.body);
            return data;
        } catch (error:any) {
            throw new Error('Validation error: ' + error.message);
        }
    }

    getAllcab = async(req:Request, res:Response) =>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const skip = Math.max(page - 1, 0) * limit;

            const searchQuery: any = {}
            if(req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    {userName : {$regex:searchValue, $options: 'i'}},
                    
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

            const data  = await CabModel.aggregate(pipeline).exec();
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getCabById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = CabModel.findById(id)
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteCabById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await CabModel.findByIdAndDelete(id);
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    updateCabById = async (req:Request, res:Response) => {
        try {
            const {id} = req.params;
            const {numberPlate, location, pricePerKm} = req.body;
            if(!numberPlate || !location !|| pricePerKm){
                return res.status(400).json({ error: 'All fields are required.' });
            }
            await cabTypeValidationSchema.validate(req.body);
            const data = await CabModel.findByIdAndUpdate(id,
                {numberPlate, location, pricePerKm},
                {new: true}
            );
            if (!data) {
                return res.status(404).json({ error: 'cab not found' });
            }
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

}