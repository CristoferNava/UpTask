const nodeMailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transporter = nodeMailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

const generateHTML = (emailView, options={}) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${emailView}.pug`, options);
  return juice(html);
};

exports.send = async (options) => {
  const html = generateHTML(options.emailView, options);
  const text = htmlToText.fromString(html);
  let mailOptions = {
    from: 'UpTask <no-reply@uptask.com>',
    to: options.user.email,
    subject: options.subject,
    text,
    html,
  };

  const sendEmail = util.promisify(transporter.sendMail, transporter);
  return sendEmail.call(transporter, mailOptions);
};