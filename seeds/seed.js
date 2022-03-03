const db = require('../config/connection');
const Product = require('../models/Product');

const productSeed =
  [
    {
      "productName": "Aretes Bonitos 1",
      "productImage": "/images/Product1.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes"
    },
    {
      "productName": "Aretes Bonitos 2",
      "productImage": "/images/Product2.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes"
    },
    {
      "productName": "Aretes Bonitos 3",
      "productImage": "/images/Product3.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes"
    },
    {
      "productName": "Aretes Bonitos 4",
      "productImage": "/images/Product4.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes"
    }
  ];

Product.deleteMany({})
  .then(() => Product.insertMany(productSeed))
  .then(() => {
    console.log('Records inserted');
    process.exit(0);
  })
  .catch(err => console.log(err));