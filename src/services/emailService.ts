import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import nodemailer from 'nodemailer';
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


// export async function sendEmailToken(email:string, token:string) {
//     console.log('emailemailemail',email);
//     console.log('tokentokentoken',token);
//     const message = `Your one-time password is: ${token}`
//     // const command = createSendEmailCommand(email,"ayoubshah2720@gmail.com",message)
//     try {
//         // return await ses.send(command)
//     } catch (error) {
//         console.log('Error sending email',error)
//         return error;
//     }    
// }

export async function sendEmailToken(email: string, token: string, username: string) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ayoubshah2720@gmail.com',
          pass: 'nvej xxhp xwfu derl'
        }
      });
      
      var mailOptions = {
        from: 'ayoubshah2720@gmail.com',
        to: email,
        subject: 'Web Surffing Email Verification.',
        text: `Here is your token ${token} to login to WebSurffing.`,
        html:
        `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
        </head>
        
        <body style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
            <table border="0" cellspacing="0" cellpadding="0" align="center" id="m_-7626415423304311386email_table"
                style="border-collapse:collapse">
                <tbody>
                    <tr>
                        <td id="m_-7626415423304311386email_content"
                            style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
                            <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                <tbody>
                                    <tr>
                                        <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td height="1" colspan="3" style="line-height:1px"></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table border="0" width="100%" cellspacing="0" cellpadding="0"
                                                style="border-collapse:collapse;text-align:center;width:100%">
                                                <tbody>
                                                    <tr>
                                                        <td width="15px" style="width:15px"></td>
                                                        <td style="line-height:0px;max-width:600px;padding:0 0 15px 0">
                                                            <table border="0" width="100%" cellspacing="0" cellpadding="0"
                                                                style="border-collapse:collapse">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="width:100%;text-align:left;height:33px">
                                                                        <img
                                                                        src="data:image/png;base64,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"
                                                                        height="200" width="200" alt="" class="CToWUd"
                                                                        data-bit="iit">

                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td width="15px" style="width:15px"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table border="0" width="430" cellspacing="0" cellpadding="0"
                                                style="border-collapse:collapse;margin:0 auto 0 auto">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table border="0" width="430px" cellspacing="0" cellpadding="0"
                                                                style="border-collapse:collapse;margin:0 auto 0 auto;width:430px">
                                                                <tbody>
                                                                    <tr>
                                                                        <td width="15" style="display:block;width:15px">
                                                                            &nbsp;&nbsp;&nbsp;</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <table border="0" width="100%" cellspacing="0"
                                                                                cellpadding="0"
                                                                                style="border-collapse:collapse">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <table border="0" cellspacing="0"
                                                                                                cellpadding="0"
                                                                                                style="border-collapse:collapse">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td width="20"
                                                                                                            style="display:block;width:20px">
                                                                                                            &nbsp;&nbsp;&nbsp;
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <table border="0"
                                                                                                                cellspacing="0"
                                                                                                                cellpadding="0"
                                                                                                                style="border-collapse:collapse">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            <p
                                                                                                                                style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">
                                                                                                                                Hi
                                                                                                                                ${username}
                                                                                                                            </p>
                                                                                                                            <p
                                                                                                                                style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">
                                                                                                                                Please Verify your email address to continue capturing and sharing your moments with the world. 
                                                                                                                                Hopefully! You'll Enjoy our best services.
                                                                                                                            </p>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td height="20"
                                                                                                                            style="line-height:20px">
                                                                                                                            &nbsp;
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                                <table
                                                                                                                                    border="0"
                                                                                                                                    width="390"
                                                                                                                                    cellspacing="0"
                                                                                                                                    cellpadding="0"
                                                                                                                                    style="border-collapse:collapse">
                                                                                                                                    <tbody>
                                                                                                                                        <tr>
                                                                                                                                            <td
                                                                                                                                                style="border-collapse:collapse;border-radius:3px;text-align:center;display:block;border:solid 1px #009fdf;padding:10px 16px 14px 16px;margin:0 2px 0 auto;min-width:80px;background-color:#47a2ea">
                                                                                                                                               <center>
                                                                                                                                                        <font
                                                                                                                                                            size="3">
                                                                                                                                                            <span
                                                                                                                                                                style="font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;white-space:nowrap;font-weight:bold;vertical-align:middle;color:#fdfdfd;font-size:16px;line-height:16px"><span
                                                                                                                                                                    class="il"> ${token} </span>&nbsp;</span>
                                                                                                                                                        </font>
                                                                                                                                                    </center>
                                                                                                                                            </td>
                                                                                                                                        </tr>
                                                                                                                                    </tbody>
                                                                                                                                </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>
                                                                                                                        <td height="20"
                                                                                                                            style="line-height:20px">
                                                                                                                            &nbsp;
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="10" style="line-height:10px" colspan="1">
                                                                            &nbsp;</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table border="0" cellspacing="0" cellpadding="0"
                                                style="border-collapse:collapse;margin:0 auto 0 auto;width:100%;max-width:600px">
                                                <tbody>
                                                    <tr>
                                                        <td height="4" style="line-height:4px" colspan="3">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="15px" style="width:15px"></td>
                                                        <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                                                        <td style="text-align:center">
                                                            <div style="padding-top:10px;display:flex">
                                                                <div style="margin:auto">
                                                                <img
                                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUCXRKgVCDKcrFTsW6Jbp7xeZNaPt8lANFkQ&usqp=CAU"
                                                                        height="50" width="50" alt="" class="CToWUd"
                                                                        data-bit="iit">

                                                                        </div><br>
                                                            </div>
                                                            <div style="height:10px"></div>
                                                            <div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">©
                                                                Websurffing. Android Platform.
                                                                <!-- Instagram. Meta Platforms, Inc., 1601 Willow Road, Menlo Park, CA 94025 -->
                                                                <br></div>
                                                            <div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">
                                                            For latest update keep in touch with us or visit our 
                                                            <span class="il"> offers </span>
                                                                section in Websurffing app. <br></div>
                                                        </td>
                                                        <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                                                        <td width="15px" style="width:15px"></td>
                                                    </tr>
                                                    <tr>
                                                        <td height="32" style="line-height:32px" colspan="3">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table><span><img
                                    src="https://ci3.googleusercontent.com/proxy/XYDA1Q9a8bEbw5evSiEx3V7C_a6ydq1Ys9pPtIa5MqgXIaVZzIJ_pAsqGN9NxLL5McHbWMD5OgW5L5yjhaDXk0LejCfvjhFKyM7OyA177wAXr5JPX55sziazYpGm_8-gBpSeNqRjQh7UCUg9ZpFmOg1m0Bby=s0-d-e1-ft#https://www.facebook.com/email_open_log_pic.php?mid=5dc870c3f3046G24bc389ce16251G5dc8755d53319G278"
                                    style="border:0;width:1px;height:1px" class="CToWUd" data-bit="iit"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
        
        </html>
        `
        // html : { path: './src/services/emailTemplate.html' }
      };
      //@ts-ignore
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent to newdata1245@gmail.com: ' + info.response);
        }
      });
}