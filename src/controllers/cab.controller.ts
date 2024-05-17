import { apiError } from "../helper/ApiError";
import { CabModel } from "../models/cab.model";
import { cabServiceClass } from "../services/cab.service";
import express,{Request, Response} from 'express';
import {apiResponse} from '../helper/apiResponse';

const cabServiceObj  = new cabServiceClass();
export class cabControllerclass {
    getAllcab = async(req:Request, res:Response) =>{
        try {
            const data = await cabServiceObj.getAllcab(req, res)
            const totalRecord = await CabModel.countDocuments();
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string) || 10))
            const response = new apiResponse(200,{totalRecord, totalPages, currentPage: parseInt(req.query.page as string) || 1  ,data}, 'cabs retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    getCabById = async(req:Request, res:Response) =>{
        try {
            const data = await cabServiceObj.getCabById(req, res)
            const response = new apiResponse(200,data, 'cabs retrieved by id successfully');
            res.status(response.statusCode).json(response);
           } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    createcab = async(req:Request, res:Response) =>{
        try {
            const data = await cabServiceObj.createcab(req, res);
            const response = new apiResponse(200,data, 'cab added/created successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    deleteCabById = async(req:Request, res:Response) =>{
        try {
            const data = await cabServiceObj.deleteCabById(req, res)
            const response = new apiResponse(200,data, 'cab deleted by id successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    updateCabById = async(req:Request, res:Response) =>{
        try {
            const data = await cabServiceObj.updateCabById(req, res)
            const response = new apiResponse(200,data, 'cab updated by id successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    downloadPDF = async(req:Request, res:Response) =>{
        try{
            const doc = await cabServiceObj.getTripDetailPDF(req,res);
            // console.log(doc); //null
            
            if(doc){
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename="trip_details.pdf"');
                doc.pipe(res);
                doc.end();
            } else{
                const errResponse = new apiError(500, 'Internal Server Error', ["error generating pdf"]);
                res.status(errResponse.statusCode).json(errResponse);  
            }
        } catch(error:any){
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);  
        }
       }
}


