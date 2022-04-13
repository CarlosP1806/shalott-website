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
    message += `<h1 style="color: green; text-align:center;">¡Pago Exitoso!</h1>`
    message += `<p>Estimado ${customer.name},</p>`;
    message += `<p>
    Tu compra ha sido procesada y realizada con éxito. Nos encontramos trabajando
    en tu pedido. En cuanto el envío sea realizado, nos comunicaremos contigo para
    indicarte el número de seguimiento.
    </p>`;
    message += '<hr style="background: gray;">'
    message += '<h2>Resumen de Orden</h2>'
    message += '<table>'
    message += `
    <tr>
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
    </tr>
    `
    // Get buyed items
    lineItems.data.forEach(item => {
      message += "<tr>";
      message += `<td>${item.description}</td>`;
      message += `<td style="text-align: right;">${item.quantity}</td>`;
      message += `<td style="text-align: right;">${(item.amount_total / 100).toFixed(2)}</td>`;
      message += "</tr>";
    });
    message += '</table>'
    message += `<p style="font-weight: bold;">Total de compra: ${(session.amount_total / 100).toFixed(2)}</p>`
    message += '<hr style="background: gray;">'
    message += '<h2>Detalles de Envío</h2>'
    message += `<p>Email: ${customer.email} </p>`;
    message += `<p>Teléfono: ${customer.phone} </p>`;
    message += `<p>Dirección de envío:</p>`
    message += `<p style="margin-left: 2rem;">${customer.shipping.address.city}, ${customer.shipping.address.country}</p>`;
    message += `<p style="margin-left: 2rem;">${customer.shipping.address.line1}</p>`;
    message += `<p style="margin-left: 2rem;">${customer.shipping.address.line2}</p>`;
    message += `<p style="margin-left: 2rem;">${customer.shipping.address.postal_code}</p>`;
    message += `<p style="margin-left: 2rem;">${customer.shipping.address.state}</p>`;

    message += `<p>
      Para cualquier duda o aclaración del pedido, 
      favor de contactar al número 442-1234-5678 presentando el siguiente identificador
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