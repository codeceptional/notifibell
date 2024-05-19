import * as AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES();
const email = "utkarsh.bisht7@gmail.com";

export const verify = async () => {
  const params = {
    EmailAddress: email,
  };

  return await ses.verifyEmailAddress(params).promise();
};

// Listing the verified email addresses.
export const listVerifiedEmails = async () => {
  return await ses.listVerifiedEmailAddresses().promise();
};

// Deleting verified email addresses.
export const deleteEmailAddress = async (email: string) => {
  const params = {
    EmailAddress: email,
  };

  return await ses.deleteVerifiedEmailAddress(params).promise();
};

// Sending RAW email including an attachment.
export const sendEmail = async () => {
  let sesMail = "From: 'AWS SES' <" + email + ">\n";
  sesMail = sesMail + "To: " + "utkarsh.bisht@outlook.com" + "\n";
  sesMail = sesMail + "Subject: AWS SES Attachment Example\n";
  sesMail = sesMail + "MIME-Version: 1.0\n";
  sesMail = sesMail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
  sesMail = sesMail + "--NextPart\n";
  // Body
  sesMail = sesMail + "Content-Type: text/html; charset=us-ascii\n\n";
  sesMail = sesMail + "This is the body of the email.\n\n";
  sesMail = sesMail + "--NextPart\n";
  // Attachment
  sesMail = sesMail + "Content-Type: text/plain;\n";
  sesMail =
    sesMail + 'Content-Disposition: attachment; filename="attachment.txt"\n\n';
  sesMail =
    sesMail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
  sesMail = sesMail + "--NextPart--";

  const params = {
    RawMessage: { Data: Buffer.from(sesMail) },
    Destinations: ["utkarsh.bisht@outlook.com"],
    Source: "'AWS Tutorial Series' <" + email + ">'",
  };

  return await ses.sendRawEmail(params).promise();
};
