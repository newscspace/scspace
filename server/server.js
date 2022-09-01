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

// https.createServer({
//         key: fs.readFileSync("/home/ec2-user/.acme.sh/gonggan.kaist.ac.kr/gonggan.kaist.ac.kr.key"),
//         cert: fs.readFileSync("/home/ec2-user/.acme.sh/gonggan.kaist.ac.kr/fullchain.cer"),
// }, app).listen(443, function() {
//         console.log("server running on PORT 443");
// });

app.use(cookieParser());

//db.set_db();

// app.use(express.static( '/home/ec2-user/scspace/scspace/build'));

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(routes.router);

app.listen(5000, ()=>{
        console.log('5000 start');
})
