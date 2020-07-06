import * as AWS from "aws-sdk";
import * as express from "express";

export const publishMessage = async (msg: string) => {
  try {
    const sns = new AWS.SNS({ apiVersion: "2012-11-05" });
    const params: AWS.SNS.PublishInput = {
      Message: msg,
      TopicArn: process.env.TOPIC_ARN,
      Subject: "This is subject of message"
    }
    var publishText = await sns.publish(params).promise();
    return publishText;
  } catch (err) {
    console.log("An error occurred: ", err);
    throw err;
  }
}

export const listenMessage = (req: express.Request, res: express.Response) => {
  const dataChunks: string[] = []; // assumed type as string
  req.on("data", (chunk: any) => {
    dataChunks.push(chunk);
  });
  req.on("end", () => {
    const message = JSON.parse(JSON.stringify(dataChunks.join("")));
    console.log(message);
    res.status(200).send("SUCCESS");
  });
  req.on("error", () => {
    console.log("Received an error, with partial message as: ", JSON.parse(JSON.stringify(dataChunks.join(""))))
    res.status(500).send("Message retireival has an error");
  });
  req.on("close", () => {
    console.log("close event occurred");
  });
}