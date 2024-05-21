import express, { Request, Response } from "express";
import { apiError } from "../helper/ApiError";
import { UserModel } from "../models/index.model";
import { userServiceClass } from "../services/index.service";
import { apiResponse } from "../helper/apiResponse";

const UserServiceObj = new userServiceClass();

export class userControllerclass {

  getAllUser = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.getAllUser(req, res);
      const totalRecord = await UserModel.countDocuments({ role: "user" });
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
        "users retrieved successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  getAdmin = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.getAdmin(req, res);
      const response = new apiResponse(
        200,
        data,
        "admin retrieved  successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  getDriver = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.getDriver(req, res);
      const response = new apiResponse(
        200,
        data,
        "driver retrieved  successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.getUserById(req, res);
      const response = new apiResponse(
        200,
        data,
        "user retrieved by id successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.createUser(req, res);
      const response = new apiResponse(200, data, "user created successfully");
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [error.message,]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  deleteUserById = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.deleteUserById(req, res);
      const response = new apiResponse(
        200,
        data,
        "user deleted by id successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [  error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  deleteAllUser = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.deleteAllUser(req, res);
      const response = new apiResponse(
        200,
        data,
        "all user deleted successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };

  updateUserById = async (req: Request, res: Response) => {
    try {
      const data = await UserServiceObj.updateUserById(req, res);
      const response = new apiResponse(
        200,
        data,
        "user updated by id successfully",
      );
      res.status(response.statusCode).json(response);
    } catch (error: any) {
      const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
      res.status(errResponse.statusCode).json(errResponse);
    }
  };
}
