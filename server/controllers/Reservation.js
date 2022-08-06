
reservation = {
    create : (req, res) => {
        console.log('create');
        console.log(req.body);
    },
    
    read : (req, res) => {
        
            res.json([
                {
                    space_name: 'seminar-room1',
                    time_from: '2022-07-13T15:00:00.000Z',
                    time_to: '2022-07-13T16:00:00.000Z',
                    content: {
                      organization_name: '',
                      event_name: '',
                      number: '4',
                      contents: 'ㅇㅇ'
                    },
                    state:'granted'
                  },
                  {
                    space_name: 'ullim-hall',
                    time_from: '2022-07-18T15:00:00.000Z',
                    time_to: '2022-07-18T16:00:00.000Z',
                    content: {
                      organization_name: '',
                      event_name: '테스트용',
                      inner_number: '5',
                      outer_number: '2',
                      event_purpose: 'ㄹㄹㄹㄹㄹㄹㄹ',
                      contents: 'ㅁㅁㅁㅁㅁㅁㅁ',
                      rehersal_from: '2022-07-17T15:00:00.000Z',
                      rehersal_to: '2022-07-17T16:00:00.000Z',
                      rehersal_lastday_from: '2022-07-16T15:00:00.000Z',
                      rehersal_lastday_to: '2022-07-16T16:00:00.000Z',
                      equipment: [ 'light' ],
                      food: '응애',
                      lobby: [ 'true' ],
                      desk: '5',
                      chair: '6',
                      state:'wait'
                    }
                  }

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


module.exports = reservation

// {
//     'type' : 2, // 공간 코드는 숫자나 enum으로
//     'user' : 1, // UID
//     'from' : new Date('2022-07-17T13:24:00'), //한국시간 기준
//     'to' : new Date('2022-07-17T15:24:00'),
//     'team' : 1, //TEAM id
//     'comment' : null,
//     'state' : 'granted'
// },
// {
//     'type' : 2, // 공간 코드는 숫자나 enum으로
//     'user' : 1, // UID
//     'from' : new Date('2022-07-18T13:24:00'), //한국시간 기준
//     'to' : new Date('2022-07-19T15:24:00'),
//     'team' : 1, //TEAM id
//     'comment' : null,
//     'state' : 'wait'
// },
