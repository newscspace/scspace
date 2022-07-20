
reservation = {
    create : (req, res) => {
        console.log('make function');
        console.log(req.body);
    },
    
    read : (req, res) => {
        res.send({get:'get'});
    }


}


module.exports = reservation
