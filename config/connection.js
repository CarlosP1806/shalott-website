const mongoose = require('mongoose');

mongoose.connect(process.env.PORT || 'mongodb://localhost/shalott', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = mongoose.connection;