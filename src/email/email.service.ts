//import * as AWS from "aws-sdk";
import {DeleteVerifiedEmailAddressCommand, ListVerifiedEmailAddressesCommand, SESClient,SendEmailCommand, VerifyEmailAddressCommand} from "@aws-sdk/client-ses";
require('dotenv').config();

const SES_CONFIG =[{
  credentials :{
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,

}];
// AWS.config.update({
//   region: process.env.AWS_REGION,
// });

//const ses = new AWS.SES();
const sesClient = new SESClient(SES_CONFIG);
//const newvar = new SESClient();

const email = process.env.AWS_SES_SENDER;

export const verify = async () => {
  const params = {
    EmailAddress: email,
  };
  const command = new VerifyEmailAddressCommand(params);
  const response = await sesClient.send(command);
  return response;
  //return await sesClient.VerifyEmailAddressCommand(params).promise();
};

// Listing the verified email addresses.
export const listVerifiedEmails = async () => {
  const command = new ListVerifiedEmailAddressesCommand();
  const response = await sesClient.send(command);
  return response;
};

// Deleting verified email addresses.
export const deleteEmailAddress = async (email: string) => {
  const params = {
    EmailAddress: email,
  };

  const command = new DeleteVerifiedEmailAddressCommand(params);
  const response = await sesClient.send(command);
  return response;
};

// Sending RAW email including an attachment.
// export const sendEmail1 = async () => {
//   let sesMail = "From: 'AWS SES' <" + email + ">\n";
//   sesMail = sesMail + "To: " + "utkarsh.bisht@outlook.com" + "\n";
//   sesMail = sesMail + "Subject: AWS SES Attachment Example\n";
//   sesMail = sesMail + "MIME-Version: 1.0\n";
//   sesMail = sesMail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
//   sesMail = sesMail + "--NextPart\n";
//   // Body
//   sesMail = sesMail + "Content-Type: text/html; charset=us-ascii\n\n";
//   sesMail = sesMail + "This is the body of the email.\n\n";
//   sesMail = sesMail + "--NextPart\n";
//   // Attachment
//   sesMail = sesMail + "Content-Type: text/plain;\n";
//   sesMail =
//     sesMail + 'Content-Disposition: attachment; filename="attachment.txt"\n\n';
//   sesMail =
//     sesMail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
//   sesMail = sesMail + "--NextPart--";

//   const params = {
//     RawMessage: { Data: Buffer.from(sesMail) },
//     Destinations: ["utkarsh.bisht@outlook.com"],
//     Source: "'AWS Tutorial Series' <" + email + ">'",
//   };

//   //return await ses.sendRawEmail(params).promise();
// };

export const sendEmail = async(recipientEmail: string, name: string) =>{
  let params ={
      Source: process.env.AWS_SES_SENDER,
      Destination: {
          ToAddresses:[
              recipientEmail
          ]
      },
      ReplyToAddresses: [],
      Message:{
        Body:{
          Html:{
              Charset:'UTF-8',
              Data:'<h1> this is the body of the email</h1>',
          },
          Text:{
              Charset:'UTF-8',
              Data:'this is the body of the email',
          },
          
        },
         Subject:{
          Charset:'UTF-8',
          Data:`hello, ${name}!`,
        },
      },
  };
  try{
    const sendemailcommand = new SendEmailCommand(params);
    const res = await sesClient.send(sendemailcommand);
    console.log('email has been sent ', res);
  }
  catch(error){
      console.error(error);
  }
}

