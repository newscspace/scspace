const express = require('express');
const fs = require("fs");
const https = require("https");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const router = express.Router();
const cors = require('cors');
const db = require('./models/set_db');

const app = express();

https.createServer({
	key: fs.readFileSync("../../server.key"),
	cert: fs.readFileSync("../../server.cert"),
}, app).listen(443, function() {
	console.log("server running on PORT 443");
});

app.use(cookieParser());

db.set_db();

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(routes.router);