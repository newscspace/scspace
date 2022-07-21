
reservation = {
    create : (req, res) => {
        console.log('create');
        console.log(req.body);
    },
    
    read : (req, res) => {
        
            res.json({
                'type' : 2, // 공간 코드는 숫자나 enum으로
                'user' : 1, // UID
                'from' : new Date('2022-07-17T13:24:00'), //한국시간 기준
                'to' : new Date('2022-07-17T15:24:00'),
                'team' : 1, //TEAM id
                'comment' : null
            }); // Obviously dummy code
        
    },

    update : (req, res) => {
        console.log('update');
        console.log(req.body);
    }, 

    delete  : (req, res) => {
        console.log('delete');
    }



}


module.exports = reservation
