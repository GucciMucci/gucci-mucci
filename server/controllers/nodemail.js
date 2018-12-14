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
      subject: "Welcome to Gucci Mucci",
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
  }
};
