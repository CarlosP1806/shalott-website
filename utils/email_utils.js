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

module.exports = {
    createEmailMessage
};
