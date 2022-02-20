const router = require('express').Router();
const db = require('../../db/products.json');

router.get('/', (req, res) => {
    res.render('homepage', { products: db });
})

module.exports = router;