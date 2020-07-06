import * as AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION
});

const ses = new AWS.SES();
const email = "utkarsh.bisht7@gmail.com";

export const verify = async () => {
  var params = {
    EmailAddress: email
  };

  return await (ses.verifyEmailAddress(params).promise());
}

// Listing the verified email addresses.
export const listVerifiedEmails = async () => {
  return await (ses.listVerifiedEmailAddresses().promise());
}

// Deleting verified email addresses.
export const deleteEmailAddress = async (email: string) => {
  var params = {
    EmailAddress: email
  };

  return await (ses.deleteVerifiedEmailAddress(params).promise());
}

// Sending RAW email including an attachment.
export const sendEmail = async () => {
  var ses_mail = "From: 'AWS SES' <" + email + ">\n";
  ses_mail = ses_mail + "To: " + "utkarsh.bisht@outlook.com" + "\n";
  ses_mail = ses_mail + "Subject: AWS SES Attachment Example\n";
  ses_mail = ses_mail + "MIME-Version: 1.0\n";
  ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
  ses_mail = ses_mail + "--NextPart\n";
  // Body
  ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
  ses_mail = ses_mail + "This is the body of the email.\n\n";
  ses_mail = ses_mail + "--NextPart\n";
  // Attachment
  ses_mail = ses_mail + "Content-Type: text/plain;\n";
  ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"attachment.txt\"\n\n";
  ses_mail = ses_mail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
  ses_mail = ses_mail + "--NextPart--";

  var params = {
    RawMessage: { Data: Buffer.from(ses_mail) },
    Destinations: ["utkarsh.bisht@outlook.com"],
    Source: "'AWS Tutorial Series' <" + email + ">'"
  };

  return await (ses.sendRawEmail(params).promise());
}
