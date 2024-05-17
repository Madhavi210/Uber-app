// import fs from 'fs';
// import PDFDocument from 'pdfkit';
// import { CabModel } from '../models/cab.model';
// import { ICab } from '../interface/data.interface';
// import { error, log } from 'console';

// export const generatePDF = (data:any) =>{
//         const doc = new PDFDocument();

//         const marginLeft = 50;
//         const marginRight = 50;
//         const headerFontSize = 14;
//         const rowFontSize = 12;
//         const initialYPosition = 50;
//         const columnGap = 200;

//         doc.fontSize(headerFontSize).text('Cab Details', marginLeft, initialYPosition);

//         let yPosition = initialYPosition + 40;

 
//         data.forEach((elem:any, index:any) =>{

//             let tripDetail:ICab = elem;
//             console.log(tripDetail);
//             console.log(tripDetail.totalCharge);
            
            
//             if(tripDetail){

//                 doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();
                
//                  // Write cab details
//                  doc.fontSize(rowFontSize).text(`Cab Type: ${tripDetail.Cabtype  || 'N/A'}`, marginLeft, yPosition + 20);
//                  doc.text(`Number Plate: ${tripDetail.numberPlate  || 'N/A'}`, marginLeft, yPosition + 40);
//                  doc.text(`Driver: ${tripDetail.driver || 'N/A'}`, marginLeft, yPosition + 60);
//                  doc.text(`Driver: ${tripDetail.userId || 'N/A'}`, marginLeft, yPosition + 60);
//                  doc.text(`Driver: ${tripDetail.location || 'N/A'}`, marginLeft, yPosition + 60);
//                  doc.text(`Pickup From: ${tripDetail.pickupFrom  || 'N/A'}`, marginLeft, yPosition + 80);
//                  doc.text(`Drop To: ${tripDetail.dropTo  || 'N/A'}`, marginLeft, yPosition + 100);
//                  doc.text(`Distance: ${tripDetail.distanceInKm  || 'N/A'} km`, marginLeft, yPosition + 120);
//                  doc.text(`Total Charge: $${tripDetail.totalCharge  || 'N/A'}`, marginLeft, yPosition + 140);
//                  doc.text(`Total Charge: $${tripDetail.totalCharge  || 'N/A'}`, marginLeft, yPosition + 140);
//                  yPosition += 180;
//             }
//             else{
//                 doc.fontSize(rowFontSize).text(`Details unavailable`, marginLeft, yPosition);
//                 yPosition += 40;
//             }
//         })
        
//        doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();

//         return doc;
//     }
// // }



// **************************


import fs from 'fs';
import PDFDocument from 'pdfkit';
import { CabModel } from '../models/cab.model';
import { ICab } from '../interface/data.interface';
import { error, log } from 'console';

export const generatePDF = (data:any) =>{
        const doc = new PDFDocument();

        const headerFontSize = 18;
        const rowFontSize = 12;
        const headerFontColor = '#333'; // Dark gray
        const rowFontColor = '#666'; // Medium gray
        const backgroundColor = '#f0f0f0'; // Light gray
        const headerBackgroundColor = '#cccccc'; // Light gray
        const marginLeft = 50;
        const marginRight = 50;
        const initialYPosition = 50;
        const columnGap = 200;

         // Set background color
        doc.rect(0, 0, 600, 800).fill(backgroundColor);

        doc.fillColor(headerFontColor).fontSize(headerFontSize).text('Cab Details',{ align: 'center'} );

        let yPosition = initialYPosition + 40;

 
        data.forEach((elem:any, index:any) =>{

            let tripDetail:ICab = elem;

              // Add row background color
        // doc.rect(marginLeft, yPosition - 10, 500, 20).fill(headerBackgroundColor);

            console.log(tripDetail);
            console.log(tripDetail.totalCharge);
            
            
            if(tripDetail){

                doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();
                
                 // Write cab details
                 doc.fontSize(rowFontSize).text(`Cab Type: ${tripDetail.Cabtype  || 'N/A'}`, marginLeft, yPosition + 20);
                 doc.fillColor(rowFontColor).text(`Number Plate: ${tripDetail.numberPlate  || 'N/A'}`, marginLeft, yPosition + 40);
                 doc.fillColor(rowFontColor).text(`Driver: ${tripDetail.driver || 'N/A'}`, marginLeft, yPosition + 60);
                 doc.fillColor(rowFontColor).text(`user: ${tripDetail.userId || 'N/A'}`, marginLeft, yPosition + 80);
                 doc.fillColor(rowFontColor).text(`location: ${tripDetail.location || 'N/A'}`, marginLeft, yPosition + 100);
                 doc.text(`Pickup From: ${tripDetail.pickupFrom  || 'N/A'}`, marginLeft, yPosition + 120);
                 doc.text(`Drop To: ${tripDetail.dropTo  || 'N/A'}`, marginLeft, yPosition + 140);
                 doc.text(`Distance: ${tripDetail.distanceInKm  || 'N/A'} km`, marginLeft, yPosition + 160);
                 doc.text(`Total Charge: $${tripDetail.totalCharge  || 'N/A'}`, marginLeft, yPosition + 180);
                 yPosition += 220;
            }
            else{
                doc.fontSize(rowFontSize).text(`Details unavailable`, marginLeft, yPosition);
                yPosition += 220;
            }
        })
        
       doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();

        return doc;
    }
// }

