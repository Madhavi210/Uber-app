import express, {Request, Response} from 'express'
import mongoose from 'mongoose';
import {UserModel, AdminModel, DriverModel}  from '../models/user.model';
import { userValidationSchema } from '../interface/yupValidation';
import { IUser } from '../interface/data.interface';


export class userServiceClass {
    createUser = async(req:Request, res:Response) =>{
        try {
            await userValidationSchema.validate(req.body);
            const data = await UserModel.create(req.body);
            return data;
        } catch (error:any) {
            throw new Error('Validation error: ' + error.message);
        }
    }

    getAllUser = async(req:Request, res:Response) =>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const skip = Math.max(page - 1, 0) * limit;

            const searchQuery: any = {}
            if(req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    {userName : {$regex:searchValue, $options: 'i'}},
                    {role : {$regex:searchValue , $options: 'i'}},
                    {email:{$regex:searchValue , $options: 'i'}},
                ]
            }
            const filter = {...searchQuery}
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending

            const pipeline = [
                {$match: {role: "user"}},
                {$match: filter},
                {$skip: skip},
                {$limit: limit},
                {$sort: sort},
            ]

            const data  = await UserModel.aggregate(pipeline).exec();
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getAdmin = async(req:Request, res:Response) =>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const skip = Math.max(page - 1, 0) * limit;

            const searchQuery: any = {}
            if(req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    {userName : {$regex:searchValue, $options: 'i'}},
                    {role : {$regex:searchValue , $options: 'i'}},
                    {email:{$regex:searchValue , $options: 'i'}},
                ]
            }
            const filter = {...searchQuery}
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending

            const pipeline = [
                {$match:{ role: "admin"}},
                {$match: filter},
                {$skip: skip},
                {$limit: limit},
                {$sort: sort},
            ]

            const data  = await UserModel.aggregate(pipeline).exec();
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getDriver = async(req:Request, res:Response) =>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;
            const skip = Math.max(page - 1, 0) * limit;

            const searchQuery: any = {}
            if(req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    {role : 'driver'},
                ]
            }
            const filter = {...searchQuery}
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending

            const pipeline = [
                {$match:{ role: "driver"}},
                {$match: filter},
                {$skip: skip},
                {$limit: limit},
                {$sort: sort},
            ]

            const data  = await UserModel.aggregate(pipeline).exec();
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getUserById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = UserModel.findById(id)
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteUserById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await UserModel.findByIdAndDelete(id);
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    updateUserById = async (req:Request, res:Response) => {
        try {
            const {id} = req.params;
            const {userName, email, password} = req.body;
            if(!userName || !email || !password){
                return res.status(400).json({ error: 'All fields are required.' });
            }
            await userValidationSchema.validate(req.body);
            const data = await UserModel.findByIdAndUpdate(id,
                {userName, email, password},
                {new: true}
            );
            if (!data) {
                return res.status(404).json({ error: 'user not found' });
            }
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

}