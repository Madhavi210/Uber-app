import express, {Request,Response  } from "express";
import { userControllerclass } from "../controllers/index.controller";
import {authMiddlewareclass} from '../middleware/authenticate.middleware';

const router = express.Router();
const UserControllerObj = new userControllerclass();
const AuthMiddlewareclass = new authMiddlewareclass();


router.get('/getUser', UserControllerObj.getAllUser);
router.get('/getAdmin', UserControllerObj.getAdmin);
router.get('/getDriver', UserControllerObj.getDriver);

router.post('/login' ,AuthMiddlewareclass.userExist ,AuthMiddlewareclass.userLogin)

router.get('/:id', UserControllerObj.getUserById);

router.post('/post', UserControllerObj.createUser);

router.put('/updateUser/:id',AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdminOrUser,  UserControllerObj.updateUserById);
router.put('/updateAdmin/:id', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdmin, UserControllerObj.updateUserById);
router.put('/updateDriver/:id', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdminOrDriver, UserControllerObj.updateUserById);

router.delete('/delete/:userId', AuthMiddlewareclass.isLoggedIn, UserControllerObj.deleteUserById);  //, AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdmin,

router.delete("/deleteAll", UserControllerObj.deleteAllUser);

router.post('/refreshToken', AuthMiddlewareclass.refreshToken);


export default router;

