const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const Product = require('../../models/Product.js');
const Category = require('../../models/Category.js');
const Collection = require('../../models/Collection.js');

router.get('/', async (req, res) => {
  const featuredProducts = await Product.find({ featured: true });
  const categories = await Category.find({});
  const collections = await Collection.find({});

  res.render('homepage', {
    products: featuredProducts,
    categories: categories,
    collections: collections
  });
});

router.get('/success', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    console.log(customer);
  } catch (e) {
    res.render('404', {
      message: "lo sentimos, la página que usted busca no se encuentra en el servidor"
    });
    return;
  }
  res.render('404', { message: "¡Pedido realizado exitosamente!" });
});

router.get('/cancel', (req, res) => {
  res.render('404', { message: "La transacción ha sido cancelada" });
});

module.exports = router;