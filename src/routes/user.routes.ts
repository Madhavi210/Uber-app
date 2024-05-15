import express, {Request,Response  } from "express";
import { userControllerclass } from "../controllers/user.controllre";


const router = express.Router();
const UserControllerObj = new userControllerclass();

router.get('/getUser', UserControllerObj.getAllUser);
router.get('/getAdmin', UserControllerObj.getAdmin);
router.get('/getDriver', UserControllerObj.getDriver);
router.get('/:id', UserControllerObj.getUserById);
router.post('/post', UserControllerObj.createUser);
router.put('/update/:id', UserControllerObj.updateUserById);
router.delete('/delete/:id', UserControllerObj.deleteUserById);


export default router;

