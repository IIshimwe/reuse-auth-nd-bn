import nodemailer from "nodemailer";

export const sendMail = async (to, subject, message) => {
  // Create a transport object using the Gmail SMTP server
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS
    auth: {
      user: "ixacson@gmail.com",
      pass: "pulywmunzyyrrcyq",
    },
  });

  // Create an email object
  const mailOptions = {
    from: "patrick.minegas@gmail.com", // sender address
    to, // list of receivers
    subject, // Subject line
    html: message, // plain text body
  };

  // Send the email
  return transporter.sendMail(mailOptions, (error, message) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  });
};
