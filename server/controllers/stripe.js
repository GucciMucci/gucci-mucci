require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TOKEN);

module.exports = {
  checkout: (req, res) => {
    console.log("req.body---------->", req.body);

    const stripeToken = req.body.body;

    stripe.charges.create(
      {
        amount: req.body.amount,
        currency: "usd",
        description: "© G U C C I  M U C C I gets money",
        source: stripeToken.id
      },
      function(err, charge) {
        console.log("charge---------->", charge);
        if (err) {
          res.send({
            success: true,
            message: "Error"
          });
        } else {
          res.send({
            success: true,
            message: "Success"
          });
        }
      }
    );
  }
};