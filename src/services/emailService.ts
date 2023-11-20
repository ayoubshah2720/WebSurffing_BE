import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
require('dotenv').config();

const ses = new SESClient({});


// function createSendEmailCommand(toAddress:string, fromAddress:string, message:string) {
//     return SendEmailCommand({
//         Destination:{
//             ToAddress: [toAddress],
//         }
//         Source: fromAddress,
//         Message:{
//             Subject:{
//                 Charset: 'UTF-8',
//                 Data: "Your one-time password"
//             },
//             Body: {
//                 Text:{
//                 Charset: 'UTF-8',
//                 Data: message
//                 },
//             },
//         }
//     })   
// }


export async function sendEmailToken(email:string, token:string) {
    console.log('emailemailemail',email);
    console.log('tokentokentoken',token);
    const message = `Your one-time password is: ${token}`
    // const command = createSendEmailCommand(email,"ayoubshah2720@gmail.com",message)
    try {
        // return await ses.send(command)
    } catch (error) {
        console.log('Error sending email',error)
        return error;
    }    
}