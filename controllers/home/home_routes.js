const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const nodemailer = require('nodemailer');

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
    const lineItems = await stripe.checkout.sessions.listLineItems(req.query.session_id);

    // Send verification email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.DB_SERVER_EMAIL,
        pass: process.env.DB_SERVER_PASSWORD
      }
    });

    let message = "";
    message += `Cliente ${customer.name} ha solicitado lo siguiente:`;
    message += '<ul>'
    // Get buyed items
    lineItems.data.forEach(item => {
      message += "<li>";
      message += "Artículo: "
      message += item.description;
      message += " - Cantidad: ";
      message += item.quantity;
      message += "</li>";
    });
    message += '</ul>'
    message += `<p>La información de contacto del comprador es:</p>`;
    message += `<p>Email: ${customer.email} </p>`;
    message += `<p>Teléfono: ${customer.phone} </p>`;
    message += `<p>
      Para cualquier aclaración del pediddo, 
      favor de contactar al número 442-1234-5678 presentando el id
      de compra </p><p>${session.payment_intent}
      </p>`

    let mailOptions = {
      from: process.env.DB_SERVER_EMAIL,
      to: process.env.DB_SERVER_EMAIL,
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
    message: "¡Gracias por tu compra! En breve recibirás un correo con los detalles de tu pedido."
  });
});

router.get('/cancel', (req, res) => {
  res.render('message', { message: "La transacción ha sido cancelada." });
});

module.exports = router;