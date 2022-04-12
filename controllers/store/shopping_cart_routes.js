const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const bodyParser = require('body-parser');
const Product = require('../../models/Product');
require('dotenv').config();

router.get('/', (req, res) => {
  res.render('shopping_cart');
});

router.get('/checkout', (req, res) => {
  res.render('checkout');
});

const fulfillOrder = async(req, res, next) => {
  console.log(req.body);
  res.status(200).json({ message: "succesfully handled" });
}

router.post('/webhook', fulfillOrder);

router.post('/create-checkout-session', async (req, res) => {
  try {
    // Find all items with id in request
    const ids = req.body.items.map(item => {
      return item.id ;
    });
    const products = await Product.find({ '_id': { $in: ids }});
    const lineItems = products.map(item => {
      const quantity = req.body.items.find(reqItem => reqItem.id = item.id).quantity;
      return {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.productName
          },
          unit_amount: item.productPrice * 100
        },
        quantity: quantity
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;