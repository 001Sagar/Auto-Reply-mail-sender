const rouete = require('express').Router();

const home = require('../controllers/auth')
const hone = require('../controllers/mailsender');
rouete.get('/getUrl',home.auth);
rouete.get('/mailsender', hone.sendMail);
module.exports = rouete