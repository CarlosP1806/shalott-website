const router = require('express').Router();
const db_products = require('../../db/products.json');
const db_categories = require('../../db/categories.json');

router.get('/', (req, res) => {
    res.render('homepage', { products: db_products, categories: db_categories });
})

module.exports = router;