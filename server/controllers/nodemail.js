const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: (req, res) => {
    const { email } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Welcome to Gucci Mucci`,
      html: "<div>Welcome to Gucci hehe</div>"
    };
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        res.send();
      }
    });
  },
  sendReciept: (req, res) => {
    const { email, message, total } = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });
    let products = message.map(item => item.name);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `We Got Your Order`,
      html: `<div><div>Thanks for shopping at Gucci</div><div>${products}</div><div>${total}</div></div>`
    };
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        res.send();
      }
    });
  }
};
