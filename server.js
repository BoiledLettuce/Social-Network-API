require('dotenv').config();
const exp = require('express');
const mongo = require('mongoose');

const butt = exp();
const PORT = process.env.PORT || 3005;

butt.use(exp.json());

butt.use(require('./routes'));

mongo.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

butt.listen(PORT, () => console.log(`DA PORT:${PORT}`));