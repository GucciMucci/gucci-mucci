require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TOKEN);

module.exports = {
  checkout: (req, res) => {
    console.log("req.body---------->", req.body.body.email);

    const stripeToken = req.body.body;

    stripe.charges.create(
      {
        amount: req.body.amount,
        currency: "usd",
        description: "© G U C C I  M U C C I gets money",
        source: stripeToken.id,
        reciept_email: req.body.body.email
      },
      function(err, charge) {
        console.log("charge---------->", charge);
        if (err) {
          res.json({
            success: true,
            message: "Error"
          });
        } else {
          res.json({
            success: true,
            message: "Success"
          });
        }
      }
    );
  }
};
