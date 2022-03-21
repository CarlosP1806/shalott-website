const db = require('../config/connection');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Collection = require('../models/Collection');
const Admin = require('../models/Admin');

const adminSeed = 
[
  {
    "username": "testAdmin",
    "password": "123"
  }
]

const categorySeed = 
[
  {
    "name": "aretes",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901163/shalott/Product1_d0webg.webp"
  },
  {
    "name": "collares",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901163/shalott/Product2_tuvt8q.webp"
  },
  {
    "name": "pulseras",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901163/shalott/Product3_nx8qu4.webp"
  },

  {
    "name": "broches",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901244/shalott/Product4_djhjxp.webp"
  }
]

const collectionSeed = 
[
  {
    "name": "coleccion 1",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901244/shalott/Product5_uhyqic.webp"
  },
  {
    "name": "coleccion 2",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901244/shalott/Product6_loijca.webp"
  },
  {
    "name": "coleccion 3",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901313/shalott/Product7_aw9kat.webp"
  },
  {
    "name": "coleccion 4",
    "image": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901313/shalott/Product9_k1f7da.webp"
  }
];

const productSeed =
  [
    {
      "productId": "0001",
      "productName": "Aretes Bonitos 1",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901163/shalott/Product1_d0webg.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 1",
      "productCategory": "aretes",
      "featured": true
    },
    {
      "productId": "0002",
      "productName": "Aretes Bonitos 2",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901163/shalott/Product2_tuvt8q.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 2",
      "productCategory": "aretes",
      "featured": true
    },
    {
      "productId": "0003",
      "productName": "Aretes Bonitos 3",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901163/shalott/Product3_nx8qu4.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 1",
      "productCategory": "aretes",
      "featured": true
    },
    {
      "productId": "0004",
      "productName": "Aretes Bonitos 4",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901244/shalott/Product4_djhjxp.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 2",
      "productCategory": "aretes",
      "featured": true
    },
    {
      "productId": "0005",
      "productName": "Aretes Bonitos 5",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901244/shalott/Product5_uhyqic.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 1",
      "productCategory": "aretes",
      "featured": false
    },
    {
      "productId": "0006",
      "productName": "Aretes Bonitos 6",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901244/shalott/Product6_loijca.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 1",
      "productCategory": "aretes",
      "featured": false
    },
    {
      "productId": "0007",
      "productName": "Aretes Bonitos 7",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901313/shalott/Product7_aw9kat.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 2",
      "productCategory": "aretes",
      "featured": false
    },
    {
      "productId": "0009",
      "productName": "Aretes Bonitos 8",
      "productImage": "https://res.cloudinary.com/df816mhgy/image/upload/v1647901313/shalott/Product8_o3k5iq.webp",
      "productPrice": "500.00",
      "productCollection": "coleccion 2",
      "productCategory": "aretes",
      "featured": false
    }
  ];

Admin.deleteMany({})
  .then(() => Admin.insertMany(adminSeed))
  .then(() => {
    console.log('Records inserted');
  })
  .catch(err => console.log(err));

Product.deleteMany({})
  .then(() => Product.insertMany(productSeed))
  .then(() => {
    console.log('Records inserted');
  })
  .catch(err => console.log(err));

Category.deleteMany({})
  .then(() => Category.insertMany(categorySeed))
  .then(() => {
    console.log('Records inserted');
  })
  .catch(err => console.log(err));

Collection.deleteMany({})
  .then(() => Collection.insertMany(collectionSeed))
  .then(() => {
    console.log('Records inserted');
  })
  .catch(err => console.log(err));