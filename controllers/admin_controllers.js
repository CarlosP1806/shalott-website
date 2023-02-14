const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Collection = require('../models/Collection');

async function renderDashboard(req, res) {
    if (req.session.userId) {
        const categories = await Category.find({});
        const collections = await Collection.find({});
        res.render('admin_dashboard', { categories, collections });
    } else {
        res.render('admin_login');
    }
}

async function login(req, res) {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) {
    res.status(500).json('Invalid username');
    return;
  }

  if (req.body.password === admin.password) {
    let session = req.session;
    session.userId = req.body.username;
    res.status(200).json('Logged');
  } else {
    res.status(500).json('Invalid credentials');
  }
};

async function searchById(req, res) {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) {
      res.status(404).json('Not found');
      return;
    }
    res.status(200).json(product);
  } catch(err) {
    res.status(500).json(err);
  }
}

async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findOneAndDelete({ productId: req.body.id });
    if(!product) {
      res.status(404).json("No product found");
      return;
    }
    res.status(200).json(product);
  } catch(err) {
    res.status(500).json(err);
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findOneAndUpdate({ productId: req.body.id }, req.body )
    if(!product) {
      res.status(404).json("No product found");
      return;
    }
    res.status(200).json(product);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function createCollection(req, res) {
  try {
    const collection = await Collection.create(req.body);
    res.status(200).json(collection);
  } catch(err) {
    res.status(500).json(err);
  } 
}

async function deleteCollection(req, res) {
  try {
    const collection = await Collection.findOneAndDelete({ name: req.body.name });
    if(!collection) {
      res.status(404).json("No collection found");
      return;
    }
    await Product.updateMany({ productCollection: req.body.name }, { productCollection: ""});
    res.status(200).json(collection);
  } catch(err) {
    res.status(500).json(err);
  }
}

async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch(err) {
    res.status(500).json(err);
  } 
}

async function deleteCategory(req, res) {
  try {
    const category = await Category.findOneAndDelete({ name: req.body.name });
    if(!category) {
      res.status(404).json("No collection found");
      return;
    }
    res.status(200).json(category);
  } catch(err) {
    res.status(500).json(err);
  }
}

module.exports = {
    renderDashboard,
    login,
    searchById,
    createProduct,
    deleteProduct,
    updateProduct,
    createCategory,
    deleteCategory,
    createCollection,
    deleteCollection
};
