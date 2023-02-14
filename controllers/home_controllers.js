// TODO: FIX CONTACT BUG 

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const nodemailer = require('nodemailer');

const Product = require('../models/Product.js');
const Category = require('../models/Category.js');
const Collection = require('../models/Collection.js');

const { createEmailMessage } = require('../utils/email_utils');

async function renderHomepage(req, res) {
  const featuredProducts = await Product.find({ featured: true });
  const categories = await Category.find({});
  const collections = await Collection.find({});

  res.render('homepage', {
    products: featuredProducts,
    categories: categories,
    collections: collections
  });
}

async function renderAbout(req, res) {
  res.render('about_us');
}

async function renderContact(req, res) {
  res.render('contact');
}

async function handleContactRequest(req, res) {
  const { name, email, phone, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.DB_SERVER_EMAIL,
      pass: process.env.DB_SERVER_PASSWORD
    }
  });

  const html = `
    <p>El cliente ${name} ha solicitado contacto. Estos son sus datos:</p>
    <p>Email: ${email}</p>
    <p>Teléfono: ${phone}</p>
    <p>Ha dejado el siguiente mensaje:</p>
    <p>${message}</p>
  `;

  let mailOptions = {
    from: process.env.DB_SERVER_EMAIL,
    to: process.env.DB_SERVER_EMAIL,
    subject: "Nueva solicitud de contacto",
    html: html
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).json("Error enviando correo");
    } else {
      res.status(200).json("Email enviado correctamente");
    }
  });
}

async function handleSuccessfulPayment(req, res) {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    const lineItems = await stripe.checkout.sessions.listLineItems(req.query.session_id);

    // Send verification email
    let transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: process.env.DB_SERVER_EMAIL,
        pass: process.env.DB_SERVER_PASSWORD
      }
    });

    const message = createEmailMessage(customer, lineItems, session);

    const emailList = [
      process.env.DB_SERVER_EMAIL,
      customer.email
    ];
    let mailOptions = {
      from: process.env.DB_SERVER_EMAIL,
      to: emailList,
      subject: "Nuevo pedido de producto",
      html: message
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });

  } catch (e) {
    console.log(e);
    res.render('message', {
      message: "Lo sentimos, la página que usted busca no se encuentra en el servidor"
    });
    return;
  }
  res.render('message', {
    message: "¡Gracias por tu compra! En breve recibirás un correo con los detalles de tu pedido.",
    success: true
  });
}

async function handleCancelPayment(req, res) {
  res.render('message', { message: "La transacción ha sido cancelada." });
}

module.exports = {
  renderHomepage,
  renderAbout,
  renderContact,
  handleContactRequest,
  handleSuccessfulPayment,
  handleCancelPayment
}