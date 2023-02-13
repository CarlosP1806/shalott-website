const router = require('express').Router();

const {
  renderHomepage,
  renderAbout,
  renderContact,
  handleContactRequest,
  handleCancelPayment,
  handleSuccessfulPayment
} = require('../../controllers/home_controllers');

router.route('/').get(renderHomepage);
router.route('/sobre-nosotros').get(renderAbout);
router.route('/contacto').get(renderContact);
router.route('/contacto/solicitud').post(handleContactRequest);

router.route('/success').get(handleSuccessfulPayment);
router.route('/cancel').get(handleCancelPayment);

module.exports = router;