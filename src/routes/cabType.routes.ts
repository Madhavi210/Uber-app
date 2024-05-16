import express, {Request,Response  } from "express";
import { cabTypeControllerclass } from "../controllers/cabType.controller";
import { authMiddlewareclass } from "../middleware/authenticate.middleware";


const router = express.Router();
const CabTypeControllerObj = new cabTypeControllerclass();
const AuthMiddlewareclass = new authMiddlewareclass();


router.get('/getCabType', CabTypeControllerObj.getAllCabType);
router.get('/:id', CabTypeControllerObj.getCabTypeById);

router.post('/post', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdminOrDriver, CabTypeControllerObj.createCabType);
router.put('/update/:id', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdminOrDriver, CabTypeControllerObj.updateCabTypeById);
router.delete('/delete/:id', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdmin, CabTypeControllerObj.deleteCabTypeById);


export default router;

