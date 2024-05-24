import express, {Request,Response  } from "express";
import { cabControllerclass } from "../controllers/index.controller";
import { authMiddlewareclass } from "../middleware/authenticate.middleware";


const router = express.Router();
const CabControllerObj = new cabControllerclass();
const AuthMiddlewareclass = new authMiddlewareclass();


router.get('/getcab', AuthMiddlewareclass.isLoggedIn, CabControllerObj.getAllcab);
router.get('/:id',AuthMiddlewareclass.isLoggedIn, CabControllerObj.getCabById);

router.post('/post', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdminOrUser, CabControllerObj.createcab);
router.put('/update/:id', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdminOrUser, CabControllerObj.updateCabById);
router.delete('/delete/:id', AuthMiddlewareclass.isLoggedIn, AuthMiddlewareclass.isAdmin, CabControllerObj.deleteCabById);
router.get('/downlogPDF/:id', CabControllerObj.downloadPDF )

export default router;

