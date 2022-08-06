
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const router = express.Router();
const cors = require('cors');
const db = require('./models/set_db');

const app = express();
app.set('port', 5000);

db.set_db();

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());


app.use(routes.router);




app.listen(app.get('port'), () =>{
    console.log(`server running on PORT ${app.get('port')}`);
});



