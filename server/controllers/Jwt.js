const db = require('../models/jwt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const decrypt = (encrypted, keySpec, iv) => { 
    const decipher = crypto.createDecipheriv('aes-128-cbc', keySpec, iv); 
    const encryptedBuffer = Buffer.from(encrypted, 'base64'); 
    return JSON.parse( 
      Buffer.concat([ 
        decipher.update(encryptedBuffer), 
        decipher.final() 
      ]).toString() 
    ); 
  }; 

auth = {
    login : async (req, res) => {
        let secretKey = process.env.JWT_KEY;   
        let options = {expiresIn: '5d', issuer: 'scspace', subject: 'userInfo'};

        let key = process.env.SECRETKEY + req.body.state; 
        let keySpec = Buffer.from(key.substring(80, 96), 'utf8'); 
        let iv = Buffer.from(key.substring(80, 96), 'utf8'); 
        let userInfo = decrypt(req.body.result, keySpec, iv);
        db.login(userInfo.dataMap.USER_INFO)
            .then((data) => {
                jwt.sign(data, secretKey, options, 
                    function(err,token){
                        if(err) console.log(err);
                        else {res.cookie('scspacetoken', Buffer.from(token).toString('base64'), {

                            maxAge: 60*60*1000,

                            path:'/',

                        });
                        
                        }
                        
                        res.redirect('http://localhost:3000/');
                    });

            })
    
       

    },

    verification : (req, res) => {
        let secretKey = process.env.JWT_KEY;    
        if (!('scspacetoken' in req.cookies)) {
            res.send(false);
        }
        
        else{
        let token = req.cookies.scspacetoken;
        jwt.verify(Buffer.from(token, "base64").toString('utf8'), secretKey, 
        function(err, decoded){
            if(err === null){
                res.send(decoded);
            }
            else{
                
                res.send(false);
            }
        });
    }},

    get_data : async (token) => {
        let secretKey = process.env.JWT_KEY;    
        let result;
        jwt.verify(Buffer.from(token, "base64").toString('utf8'), secretKey, 
        function(err, decoded){
            if(err === null){
                result = decoded;
            }
            else{
                
                result = false;
            }
        });

        return result;
    },

    logout : (req,res) => {

        res.clearCookie('scspacetoken', {                            

            path:'/',
}); 
        res.redirect('http://localhost:3000/');

    }
  


}


module.exports = auth
