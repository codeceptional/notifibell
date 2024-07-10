//import * as AWS from "aws-sdk";
import { PublishCommand } from "@aws-sdk/client-sns";
//import { SMS } from "src/sms/types";

// Asynchronous function to send an SMS message using AWS SNS
export async function sendSMSMessage(sns : any, params: any) {
  const command = new PublishCommand(params);
  
  const message = await sns.send(command);
  
  return message;
}

// export const sendSMS = async (msg: SMS) => {
//   console.log("Message = " + msg.message);
//   console.log("Number = " + msg.phone);
//   console.log("Subject = " + msg.subject);
//   console.log("MsgType = ", msg.msgType);

  // const params = {
  //   Message: msg.message,
  //   PhoneNumber: "+" + msg.phone,
  //   MessageAttributes: {
  //     "AWS.SNS.SMS.SenderID": {
  //       DataType: "String",
  //       StringValue: msg.subject,
  //     },
  //     "AWS.SNS.SMS.SMSType": {
  //       DataType: "String",
  //       StringValue: msg.msgType,
  //     },
  //   },
  // };
  
 

//   try {
//     const sns = new AWS.SNS({ apiVersion: "2012-11-05" });
//     const publishText = await sns.publish(params).promise();
//     return publishText;
//   } catch (err) {
//     console.log("An error occurred: ", err);
//     throw err;
//   }
// };
