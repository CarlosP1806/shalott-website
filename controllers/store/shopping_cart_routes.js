const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
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
      return item.id;
    });
    const products = await Product.find({ '_id': { $in: ids } });
    const lineItems = products.map(item => {
      const quantity = req.body.items.find(reqItem => reqItem.id === item.id).quantity;
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
      shipping_address_collection: {
        allowed_countries: ['MX'],
      },
      phone_number_collection: {
        enabled: true,
      },
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.SERVER_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SERVER_URL}/cancel`
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;