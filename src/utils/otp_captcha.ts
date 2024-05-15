
import express, {Request, Response} from 'express'
import otpgenerator from 'otp-generator'
import svgCaptcha from 'svg-captcha'
const app = express();

//otp using math.random
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp.toString();
}

console.log("generated otp using Math.random: " , generateOTP());

const capcha = otpgenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars:false
})

const otp = otpgenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
})

console.log(" capcha code : " , capcha);
console.log("second otp using module : " , otp);

//create captcha

app.get('/captcha', (req:Request, res:Response) =>{
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 2,
        color: true,
        fontSize: 50,
        background: '#ebe9e4'
    })
    res.type('svg');
    res.status(200).send(captcha.data)
});

//re-captcha form validation 

