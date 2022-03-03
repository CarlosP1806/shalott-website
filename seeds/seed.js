const db = require('../config/connection');

const productSeed =
  [
    {
      "productName": "Aretes Bonitos 1",
      "productImage": "/images/Product1.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1"
    },
    {
      "productName": "Aretes Bonitos 2",
      "productImage": "/images/Product2.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1"
    },
    {
      "productName": "Aretes Bonitos 3",
      "productImage": "/images/Product3.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1"
    },
    {
      "productName": "Aretes Bonitos 4",
      "productImage": "/images/Product4.jpg",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1"
    }
  ];

db.Product.deleteMany()
  .then(() => db.Product.insertMany(productSeed));