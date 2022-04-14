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

router.get('/sobre-nosotros', (req, res) => {
  res.render('about_us');
});

router.get('/contacto', (req, res) => {
  res.render('contact');
});

router.post('/contacto/solicitud', (req, res) => {
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
});

router.get('/success', async (req, res) => {
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
});

router.get('/cancel', (req, res) => {
  res.render('message', { message: "La transacción ha sido cancelada." });
});

function createEmailMessage(customer, lineItems, session) {
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
  // Get purchased items
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
  message += `<p style="margin-left: 2rem;">Ciudad: ${customer.shipping.address.city}, ${customer.shipping.address.country}</p>`;
  message += `<p style="margin-left: 2rem;">Línea 1: ${customer.shipping.address.line1}</p>`;
  message += `<p style="margin-left: 2rem;">Línea 2: ${customer.shipping.address.line2}</p>`;
  message += `<p style="margin-left: 2rem;">CP: ${customer.shipping.address.postal_code}</p>`;
  message += `<p style="margin-left: 2rem;">Estado: ${customer.shipping.address.state}</p>`;
  message += `<p>
      Para cualquier duda o aclaración del pedido, 
      favor de contactar al número 442-1234-5678 presentando el siguiente identificador
      de compra: </p>
      <p>${session.payment_intent}</p>`;

  return message;
}

module.exports = router;