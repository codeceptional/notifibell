import * as AWS from "aws-sdk";
import { SMS } from "src/sms/types";

export const sendSMS = async (msg: SMS) => {
  console.log("Message = " + msg.message);
  console.log("Number = " + msg.phone);
  console.log("Subject = " + msg.subject);
  console.log("MsgType = ", msg.msgType);

  const params = {
    Message: msg.message,
    PhoneNumber: "+" + msg.phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: msg.subject,
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: msg.msgType,
      },
    },
  };

  try {
    const sns = new AWS.SNS({ apiVersion: "2012-11-05" });
    const publishText = await sns.publish(params).promise();
    return publishText;
  } catch (err) {
    console.log("An error occurred: ", err);
    throw err;
  }
};
