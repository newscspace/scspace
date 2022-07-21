
notice = {
    create : (req, res) => {
        console.log('create');
        console.log(req.body);
    },
    
    read_id : (req, res) => {
        res.json({
                'id' : 1,
                'title' : '더워',
                'date' : new Date('2022-07-17T15:24:00'),
                'hits' : 43,
                'important' : true,
                'content' : '여행 왔는데 폭염이라 나가지도 못하네 가이드투어 버스라도 할걸 근데 버스 해봤자 취소되더라'
        }); // Obviously dummy code
    },

    read_all : (req, res) =>{
        res.json([
            {
                'id' : 1,
                'title' : '더워',
                'date' : new Date('2022-07-17T15:24:00'),
                'hits' : 43,
                'important' : true
            },
            {
                'id' : 2,
                'title' : '38도라고 미쳤어',
                'date' : new Date('2022-07-17T16:24:00'),
                'hits' : 4,
                'important' : false
            },
        ]); // Obviously dummy code
    },

    update : (req, res) => {
        console.log('update');
        console.log(req.body);
    }, 

    delete  : (req, res) => {
        console.log('delete');
    }


}


module.exports = notice
