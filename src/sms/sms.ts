import * as AWS from "aws-sdk";
import { ISMS } from "src/interface/ISMS";

export const sendSMS = async (msg: ISMS) => {

    console.log("Message = " + msg.message);
    console.log("Number = " + msg.phone);
    console.log("Subject = " + msg.subject);
    console.log("MsgType = ", msg.msgType);

    var params = {
        Message: msg.message,
        PhoneNumber: '+' + msg.phone,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': msg.subject
            },
            "AWS.SNS.SMS.SMSType": {
                'DataType': 'String',
                'StringValue': msg.msgType
            }
        }
    };

    try {
        const sns = new AWS.SNS({ apiVersion: "2012-11-05" });
        var publishText = await sns.publish(params).promise();
        return publishText;
    } catch (err) {
        console.log("An error occurred: ", err);
        throw err;
    }
}