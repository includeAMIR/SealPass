//Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require ('dotenv/config');

//Instanciate express
const app = express();

//Mis en place de TLS
const tls = require('tls');
const https = require("https"),
  fs = require("fs");

const options = {
	key: fs.readFileSync('mykey.pem'),
	cert: fs.readFileSync('my-cert.pem'),
	dhparam: fs.readFileSync("dh-strong.pem")
}


//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());

//Import routes
const userRoute = require('./routes/user');
const passwordRoute = require('./routes/password');
const cloudRoute = require('./routes/cloud');
const cardRoute = require('./routes/cards');

//Routes
app.get('/', (req, res) => {
	res.status(200).send('Racine');
});

app.use('/user', userRoute);
app.use('/user/password', passwordRoute);
app.use('/user/card', cardRoute);
app.use('/user/cloud', cloudRoute);


//Connect DB with mongoose
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => console.log("connect to the db!!!"));

//Lunch Server

app.use(cors());

app.listen(8000, () => {
	console.log('server is ready!!!')
})

https.createServer(options, app).listen(8080);
