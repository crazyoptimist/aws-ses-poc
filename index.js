require('dotenv').config();
const aws = require('aws-sdk');

aws.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sender = process.env.FROM_EMAIL;

const recipient = process.env.TO_EMAIL;

const subject = "Amazon SES Test (AWS SDK for JavaScript in Node.js)";

const body_text = "Amazon SES Test (SDK for JavaScript in Node.js)\r\n"
                + "This email was sent with Amazon SES using the "
                + "AWS SDK for JavaScript in Node.js.";
            
const body_html = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
  <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`;

const charset = "UTF-8";

const ses = new aws.SES();

const params = { 
  Source: sender, 
  Destination: { 
    ToAddresses: [
      recipient 
    ],
  },
  Message: {
    Subject: {
      Data: subject,
      Charset: charset
    },
    Body: {
      Text: {
        Data: body_text,
        Charset: charset 
      },
      Html: {
        Data: body_html,
        Charset: charset
      }
    }
  }
};


ses.sendEmail(params, function(err, data) {
  if(err) {
    console.log(err.message);
  } else {
    console.log("Email sent! Message ID: ", data.MessageId);
  }
});
