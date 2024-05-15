import express, {Request,Response  } from "express";
import { cabControllerclass } from "../controllers/cab.controller";


const router = express.Router();
const CabControllerObj = new cabControllerclass();

router.get('/getUser', CabControllerObj.getAllcab);
router.get('/:id', CabControllerObj.getCabById);
router.post('/post', CabControllerObj.createcab);
router.put('/update/:id', CabControllerObj.updateCabById);
router.delete('/delete/:id', CabControllerObj.deleteCabById);


export default router;

