const db = require('../config/connection');
const Product = require('../models/Product');

const productSeed =
  [
    {
      "productName": "Aretes Bonitos 1",
      "productImage": "https://drive.google.com/uc?export=view&id=1RZAPEv6cOiXTU8SN3CkRYfqOheAQ4kzP",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": true
    },
    {
      "productName": "Aretes Bonitos 2",
      "productImage": "https://drive.google.com/uc?export=view&id=1ygWgswszEDIdupyT3sguCRYiLxAPBgz1",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": true
    },
    {
      "productName": "Aretes Bonitos 3",
      "productImage": "https://drive.google.com/uc?export=view&id=1eMCsjovxBkVjn-F3yMYhUiud8H252sqD",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": true
    },
    {
      "productName": "Aretes Bonitos 4",
      "productImage": "https://drive.google.com/uc?export=view&id=1ZqB223M8hZHiv1fxPwjgrtnIWbap4KtJ",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": true
    },
    {
      "productName": "Aretes Bonitos 5",
      "productImage": "https://drive.google.com/uc?export=view&id=1RZAPEv6cOiXTU8SN3CkRYfqOheAQ4kzP",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": false
    },
    {
      "productName": "Aretes Bonitos 6",
      "productImage": "https://drive.google.com/uc?export=view&id=1ygWgswszEDIdupyT3sguCRYiLxAPBgz1",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": false
    },
    {
      "productName": "Aretes Bonitos 7",
      "productImage": "https://drive.google.com/uc?export=view&id=1eMCsjovxBkVjn-F3yMYhUiud8H252sqD",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": false
    },
    {
      "productName": "Aretes Bonitos 8",
      "productImage": "https://drive.google.com/uc?export=view&id=1ZqB223M8hZHiv1fxPwjgrtnIWbap4KtJ",
      "productPrice": "500.00",
      "productCollection": "Coleccion 1",
      "productCategory": "Aretes",
      "featured": false
    }
  ];

Product.deleteMany({})
  .then(() => Product.insertMany(productSeed))
  .then(() => {
    console.log('Records inserted');
    process.exit(0);
  })
  .catch(err => console.log(err));