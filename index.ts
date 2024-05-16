
import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { connectDb } from './src/db/db.config';
import { error } from 'console';
import userRouter from './src/routes/user.routes'
import cabRouter from './src/routes/cab.routes'
import cabTypeRouter from './src/routes/cabType.routes'
// import * as nodemailer from 'nodemailer';
// import crypto from 'crypto';
// import otpgenerator from 'otp-generator'
// import svgCaptcha from 'svg-captcha'

const app = express();
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("./public"))
dotenv.config();

app.use('/api/user',userRouter);
app.use('/api/cab',cabRouter);
app.use('/api/cabtype',cabTypeRouter);

connectDb()
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server started on port ${PORT}`)
    })
})
.catch((error) =>{
    console.log(`Failed to connect with database,\n ${error}`)
});

