const router = require('express').Router();
const Product = require('../../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.render('catalogue', { products: products, title: "Todos los productos" });
});

router.get('/aretes', async (req, res) => {
  const products = await Product.find({ productCategory: "Aretes" });
  res.render('catalogue', { products: products, title: "Aretes" });
});

router.get('/collares', async (req, res) => {
  const products = await Product.find({ productCategory: "Collages" });
  res.render('catalogue', { products: products, title: "Collares" });
});


module.exports = router;