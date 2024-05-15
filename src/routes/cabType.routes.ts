import express, {Request,Response  } from "express";
import { cabTypeControllerclass } from "../controllers/cabType.controller";


const router = express.Router();
const CabTypeControllerObj = new cabTypeControllerclass();

router.get('/getUser', CabTypeControllerObj.getAllCabType);
router.get('/:id', CabTypeControllerObj.getCabTypeById);
router.post('/post', CabTypeControllerObj.createCabType);
router.put('/update/:id', CabTypeControllerObj.updateCabTypeById);
router.delete('/delete/:id', CabTypeControllerObj.deleteCabTypeById);


export default router;

