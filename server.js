const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
require('dotenv').config();

const routes = require('./controllers');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Setup admin session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret:
}))

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(routes);

db.once('open', () => {
    app.listen(PORT);
});