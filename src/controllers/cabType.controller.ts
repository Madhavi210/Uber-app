import { apiError } from "../helper/ApiError";
import { CabTypeModel } from "../models/index.model";
import { cabTypeServiceClass } from "../services/index.service";
import express, { Request, Response } from "express";
import { apiResponse } from "../helper/apiResponse";

const cabTypeServiceObj = new cabTypeServiceClass();
export class cabTypeControllerclass {

  getAllCabType = async (req: Request, res: Response) => {
    try {
      const data = await cabTypeServiceObj.getAllCabType(req, res);
      const totalRecord = await CabTypeModel.countDocuments();
      const totalPages = Math.ceil(
        totalRecord / (parseInt(req.query.limit as string) || 10),
      );
      const response = new apiResponse(
        200,
        {
          totalRecord,
          totalPages,
          currentPage: parseInt(req.query.page as string) || 1,
          data,
        },
        "cab type retrieved successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  getCabTypeById = async (req: Request, res: Response) => {
    try {
      const data = await cabTypeServiceObj.getCabTypeById(req, res);
      const response = new apiResponse(
        200,
        data,
        "cab type retrieved by id successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  createCabType = async (req: Request, res: Response) => {
    try {
      const data = await cabTypeServiceObj.createCabType(req, res);
      const response = new apiResponse(
        200,
        data,
        "cab type added successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  deleteCabTypeById = async (req: Request, res: Response) => {
    try {
      const data = await cabTypeServiceObj.deleteCabTypeById(req, res);
      const response = new apiResponse(
        200,
        data,
        "cab type deleted by id successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message,]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  updateCabTypeById = async (req: Request, res: Response) => {
    try {
      const data = await cabTypeServiceObj.updateCabTypeById(req, res);
      const response = new apiResponse(
        200,
        data,
        "cab type updated by id successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };
}
