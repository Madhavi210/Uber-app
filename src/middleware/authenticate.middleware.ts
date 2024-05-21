import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { IUser } from '../interface/data.interface';
import { apiError } from '../helper/ApiError';
import { apiResponse } from '../helper/apiResponse';
import { error } from 'console';
import * as dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: IUser; // Assuming IUser is the interface for your user model
}
export class authMiddlewareclass {

    userExist = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password , userName} = req.body;
            const user = await UserModel.findOne({ 
                $or: [{ email:email}, {userName:userName}]
            });
    
            if (!user) {
                const errResponse = new apiError(404, 'User not found', ['User not found']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
    
            const isPasswordCorrect = await bcrypt.compare(password, user.password.toString());
    
            if (!isPasswordCorrect) {
                const errResponse = new apiError(401, 'Invalid credentials', ['Invalid credentials']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
    
            ( req as AuthenticatedRequest).user = user;
            next();
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    };

    userLogin = async (req: Request, res: Response) => {
        try {
            const {userName, email, password } = req.body;
            const user = await UserModel.findOne({
                $or: [{ email:email}, {userName:userName}]
            });
            
            if (!user){
                const errResponse = new apiError(400, 'Invalid credentials', ['Invalid credentials']);
                return res.status(errResponse.statusCode).json(errResponse);
            } 
    
            const isMatch = await bcrypt.compare(password, user.password.toString());
            if (!isMatch) {
                const errResponse = new apiError(400, 'Invalid credentials', ['Invalid credentials']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
    
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

            const refreshToken = jwt.sign({userId :user._id}, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })

            const updateUser = await UserModel.findByIdAndUpdate(
                user._id ,
                {$set: {token,refreshToken}},
                {new: true}
            );
                
            const response = new apiResponse(200, updateUser, 'user login successfully');
            
            res.cookie('refreshToken', refreshToken, { httpOnly: true });

            res.header('auth-token', token).status(response.statusCode).json(response);

        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    };

    isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                const errResponse = new apiError(401,  'Authorization token is required', ['Authorization token is required']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
    
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            const user = await UserModel.findById(decoded.id);
    
            if (!user || !['admin', 'user', 'driver'].includes(user.role)) {
                const errResponse = new apiError(403, 'Forbidden', ['Forbidden']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
    
            (req as AuthenticatedRequest).user = user;
            next();
        } catch (error:any) {
            const errResponse = new apiError(400, 'Invalid token', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    };

    isAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as AuthenticatedRequest).user; // Assuming req.user contains the authenticated user object
            if (user?.role !== 'admin') {
                const errResponse = new apiError(403, 'Forbidden, admin access required', ['Forbidden, admin access required']);
                return res.status(errResponse.statusCode).json(errResponse);            }
            next();
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    };
    
    isAdminOrDriver = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as AuthenticatedRequest).user; // Assuming req.user contains the authenticated user object
            if (user?.role !== 'admin' && user?.role !== 'driver') {
                // return res.status(403).json({ message: 'Forbidden, admin or driver access required' });
                const errResponse = new apiError(403, 'Forbidden, admin or driver access required', ['Forbidden, admin or driver access required']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
            next();
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    };
    
    isAdminOrUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as AuthenticatedRequest).user; // Assuming req.user contains the authenticated user object
            if (user?.role !== 'admin' && user?.role !== 'user') {
                const errResponse = new apiError(403, 'Forbidden, admin or user access required',['Forbidden, admin or user access required']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
            next();
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    };

    refreshToken = async (req:Request, res:Response) =>{
        try {
            const refreshToken = req.body.refreshToken || req.headers['x-refresh-token']
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token is required' });
            }
            const decoded:any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)

            const user = await UserModel.findById(decoded.userId);
            if(!user){
                return res.status(404).json({message: 'User not found'})
            }

            const accesstoken = jwt.sign({id: user._id, role:user.role}, process.env.JWT_SECRET!, {expiresIn:'1h'} )
            return res.status(404).json({accesstoken})
        } catch (error) {
            return res.status(401).json({message: 'Invalid refresh token'})
        }
    }
}


