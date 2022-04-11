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
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(routes);

app.get('*', (req, res) => {
    res.render('404', {
        message: "Lo sentimos, la página que usted busca no se encuentra en el servidor"
    });
});

db.once('open', () => {
    app.listen(PORT);
});