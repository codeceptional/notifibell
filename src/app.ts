import * as express from "express";
import { config } from "dotenv";
import * as AWS from "aws-sdk";
import { SMS } from "./sms/types";
import { sendSMS } from "./sms/sms.service";
import { sendEmail } from "./email/email.service";
import { publishMessage, listenMessage } from "./http/http.service";

AWS.config.update({
  region: process.env.AWS_REGION,
});

config();

const app = express();

// app.use(express.json({
//     type: [
//         'application/json',
//         'text/plain', // AWS sends this content-type for its messages/notifications
//     ],
// }));

/* This can be further expaded to check headers to see if its confirmation message
 ** If so, then auto hit the http endpoint of subscribe url coming in mesage body
 ** This has api been pushed as it doesnt conforms to specific content-type and therefore creates lot of errors
 */
app.post("/listener", (req: express.Request, res: express.Response) => {
  // SETTING CONTENT TYPE MAY NOT HELP AS ITS DYNAMIC. USING RAW APPROACH
  console.log("A message has been listened: ", req.body, "\n", req.headers);
  listenMessage(req, res);
});

app.use(express.json());

app.post("/publish", async (_req: express.Request, res: express.Response) => {
  // const publishBody = req.body.msg; // Can get message from request too.
  const resp = await publishMessage("This is a test message");
  res.status(200).send(`${JSON.stringify("SUCCESS " + resp.MessageId)}`);
});

app.post("/sms", async (req: express.Request, res: express.Response) => {
  const msg = req.body as SMS;
  try {
    const publishText = await sendSMS(msg);
    res.end(JSON.stringify({ MessageID: publishText.MessageId }));
  } catch (err) {
    console.log("An error occurred: ", err);
    res.end(JSON.stringify({ Error: err }));
  }
});

app.post("/email", async (_req: express.Request, res: express.Response) => {
  try {
    const resp = await sendEmail();
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in processing the request");
  }
});

// DUMMY ENDPOINTS

app.get("/health", async (_req: express.Request, res: express.Response) => {
  res.status(200).send("Service is up and running");
});

app.get("/listener", (_: express.Request, res: express.Response) => {
  res.status(200).send("Use post method to receive listener items");
});

export { app };
