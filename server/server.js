const express = require('express');


const app = express();
app.set('port', 5000);



app.get('/', (req, res) =>{
    res.send({test:"Hello World!"});
});

app.listen(app.get('port'), () =>{
    console.log(`server running on PORT ${app.get('port')}`);
});



