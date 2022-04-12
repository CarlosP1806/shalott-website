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

const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
}

router.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const payload = request.body;
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill the purchase...
    fulfillOrder(session);
  }

  response.status(200);
});

module.exports = router;