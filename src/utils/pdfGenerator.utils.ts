import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';

export class pdfUtilClass {
    pdfGenerator = async(req:Request, res:Response) =>{
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent('<h1>Hello, World!</h1>');
            const pdfBuffer  = await page.pdf();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
            res.send(pdfBuffer);

            await browser.close();

        } catch (error:any) {
            console.error('Error generating PDF:', error);
            res.status(500).send('Error generating PDF');
        }
    }
}
