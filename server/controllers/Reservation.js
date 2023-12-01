const db = require('../models/reservation');
const auth = require('./Jwt');
const east = require('./Easteregg');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const checkDuplicate = async (space, time_from, time_to, id = null) => {
    let p = {}
    p.space = space;
    p.time_from = time_from;
    p.time_to = time_to;


    let return_result;
    await db.checkDuplicate(p)
        .then(result => {
            if (result !== false && result.length === 0) {
                return_result = true;
            }
            else if (result.length === 1) {
                if (result[0].id === id) return_result = true;
                else return_result = false;
            }
            else {
                return_result = false;
            }

        })
        .catch((err) => { console.log(err); return_result = false; })
    return return_result;
}

// 아래는 손X량의 코드
// const getPrize = function() {
//     //랜덤값 생성 (1~1000)
//     const ranNum = Math.floor((Math.random() * 999) +1);
//     //console.log('랜덤 숫자: '+ranNum);
    
//     //확률 설정
//     const pbt = 0;
//     //풀리퀘 테스트

//     if(ranNum <= pbt){
//         return 1;
//     }
//     else{
//         return 0;
//     }
// }

// const conditioncheck = async (id) => {
//     let modelgets = await east.getresv(id);
//     let hits = modelgets.resv_hits;
//     let prize = getPrize();

//     // 한명당 랜덤픽 돌릴 수 있는 횟수를 5회로 제한
//     if(hits > 5){
//         //console.log('랜덤픽 횟수 초과');
//         return 0;
//     }

//     // 당첨된 사람 5명 이상인지 여부 검사
//     let winnedpeople = await east.sumvesta();
//     if(winnedpeople >= 5){
//         // 5명 이상이면 더이상 당첨안되게
//         //console.log('당첨자 5명 넘음');
//         return 0;
//     }

//     // 당첨됐는지 여부 검사
//     let iswinned = await east.getwinprize(id);
//     if(iswinned){
//         // 당첨됐으면 더이상 당첨안되게
//         //console.log('이미 당첨된 사람');
//         return 0;
//     }

//     return prize;
// }

// const randompick = async (id, resvid) => {

//     let prize = await conditioncheck(id);

//     if(prize){
//         // 해시 키 생성
//         let hashkey = process.env.HASH_KEY1 + '-' + id + '-' + resvid + '-' + process.env.HASH_KEY2;
//         console.log(id + '-' + resvid);

//         // prize가 0이 아니면 해시함수 사용
//         // 당첨되면 sha256 base64로 해시함수 처리 후 hash값과 content를 넘겨줌
//         hashed = crypto.createHash('sha256').update(hashkey).digest('base64');
//         let alert_content =
//         `축하드립니다! 공간위 이스터에그 이벤트에 당첨되셨습니다. 상품은 베스타 평일 저녁 식사권입니다.
// 아래의 코드를 복사하여 구글폼에 제출해 주시면 확인 후 상품 수령 절차 관련하여 안내드리도록 하겠습니다.
// (구글폼 링크는 공간위 홈페이지 내의 이벤트 페이지의 이스터에그 이벤트 게시물에 있습니다.)
// *아래의 코드를 복사하지 않고 창을 끄면 코드가 사라져 당첨이 취소됩니다!!! 반드시 코드를 복사한 후 나가주세요!!!*
// *본 상품은 학생회비를 납부한 분들만 수령가능합니다.`;
//         let prize_res = {hash: hashed, content: alert_content};
//         let winned = await east.setwinprize(id);
//         if(!winned){
//             console.log('something went wrong...');
//         }
//         return prize_res;
//     }
//     else{
//     // 당첨 안되면 hash값을 0으로 넘겨줌
//         let prize_res = {hash: 0, content: ''};
//         return prize_res;
//     }
// }

const createReservationJSON = (reservation, startDate, endDate, postfix="") => {
    const isAccepted = reservation.state === "grant" ? "" : " (미승인)";

    result = {
        id: reservation.id,
        space: reservation.space,
        state: reservation.state,
        startDate: startDate,
        endDate: endDate,
        content: null,
        text: null,
        description: null,
        recurrenceRule: null,
    }
    if(reservation.content){
        result.content = reservation.content
        result.description = reservation.content.description
    }
    if(reservation.space === "group-practice-room" || reservation.space === "dance-studio") result.text = reservation.reserver_id;
    if(reservation.space === "ullim-hall") result.text = reservation.content.organizationName;
    if(reservation.space === "mirae-hall") result.text = reservation.content.organizationName;
    if(reservation.space === "workshop")   result.text = reservation.content.organizationName;
    if(reservation.space === "open-space") result.text = reservation.content.organizationName;
    if(reservation.space.slice(0, -1) === "seminar-room") result.text = reservation.content.organizationName;
    
    return result
}

const getByDay = (time) => {
    let newTime = new Date(time);
    newTime.setHours(newTime.getHours() + 9);
    let day = newTime.getDay();
    if(day === 0) day = 7;
    return day;
}

reservation = {
    create: (req, res) => {
        if (!('scspacetoken' in req.cookies)) {
            res.send(false)
        }
        let timeFrom = new Date(req.body.timeFrom);
        let timeTo = new Date(req.body.timeTo);
        let representId = 0;
        req.body.recurrence.byday.sort((a, b) => a - b);

        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                if(req.body.recurrence.isRecurrence) {
                    while(timeFrom <= new Date(req.body.recurrence.until)){
                        for(let t of req.body.recurrence.byday) {
                            let timeFromDay = getByDay(timeFrom);
                            let diff = t - timeFromDay;

                            timeFrom.setDate(timeFrom.getDate() + diff);
                            timeTo.setDate(timeTo.getDate() + diff);

                            if(timeFrom > new Date(req.body.recurrence.until)) break;
                            let p = {};
                            p.reserver_id = result.student_id;
                            p.reserver_name = result.name;
                            p.space = req.body.space;
                            p.team_id = req.body.teamId;
                            p.time_from = timeFrom.toISOString();
                            p.time_to = timeTo.toISOString();
                            p.time_request = new Date();
                            p.content = req.body.content;

                            timeFrom.setDate(timeFrom.getDate() - diff);
                            timeTo.setDate(timeTo.getDate() - diff);
                            

                            checkDuplicate(p.space, p.time_from, p.time_to)
                            .then((result) => {
                                if (result === false) {
                                    res.json({ 'reserveId': false, 'duplicate': true });
                                }
                                else {
                                    let autoGrantList = ['individual-practice-room1', 'individual-practice-room2', 'individual-practice-room3', 'piano-room1', 'piano-room2', 'group-practice-room', 'seminar-room1', 'seminar-room2', 'dance-studio']
                                    let autoRejectList = []
                                    if (autoGrantList.includes(p.space)) {
                                        p.state = 'grant';
                                    }
                                    else if (autoRejectList.includes(p.space)) {
                                        p.state = 'rejected';
                                    }
                                    else {
                                        p.state = 'wait';
                                    }

                                    // 세미나실 예약 막는 코드. 시간 조정해서 쓰세요
        
                                    banReservFrom = new Date("2023-12-03T15:00:00.000Z")
                                    banReservTo   = new Date("2023-12-15T15:00:00.000Z")
                                    timeFromDate  = new Date(p.time_from);
                                    timeToDate    = new Date(p.time_to);
                                    if(p.space === "seminar-room"){
                                        if(timeFromDate <= banReservFrom && banReservFrom <= timeToDate){
                                            p.state = 'rejected';
                                        }
                                        if(timeFromDate <= banReservTo && banReservTo <= timeToDate){
                                            p.state = 'rejected';
                                        }
                                    }
                                    
                                    ////////////////////////////////////////////////////
        
                                    db.create(p)
                                        .then(async (result) => {
                                            if(representId === 0) representId = result;
                                            // let hashres = await randompick(p.reserver_id, result);
                                            res.json({ 'reserveId': result, 'duplicate': false});
                                        });
        
                                }
                            })
                        }
                        timeFrom.setDate(timeFrom.getDate() + 7 * req.body.recurrence.interval);
                        timeTo.setDate(timeTo.getDate() + 7 * req.body.recurrence.interval);
                    }
                }
                else{
                    let p = {};
                    
                    p.reserver_id = result.student_id;
                    p.reserver_name = result.name;
                    p.space = req.body.space;
                    p.team_id = req.body.teamId;
                    p.time_from = req.body.timeFrom;
                    p.time_to = req.body.timeTo;
                    p.time_request = new Date();
                    p.content = req.body.content;
    
                    checkDuplicate(p.space, p.time_from, p.time_to)
                        .then((result) => {
                            if (result === false) {
                                res.json({ 'reserveId': false, 'duplicate': true });
                            }
                            else {
                                let autoGrantList = ['individual-practice-room1', 'individual-practice-room2', 'individual-practice-room3', 'piano-room1', 'piano-room2', 'group-practice-room', 'seminar-room1', 'seminar-room2', 'dance-studio']
                                let autoRejectList = []
                                if (autoGrantList.includes(p.space)) {
                                    p.state = 'grant';
                                }
                                else if (autoRejectList.includes(p.space)) {
                                    p.state = 'rejected';
                                }
                                else {
                                    p.state = 'wait';
                                }
                                db.create(p)
                                    .then(async (result) => {
                                        if(representId === 0) representId = result;
                                        // let hashres = await randompick(p.reserver_id, result);
                                        res.json({ 'reserveId': result, 'duplicate': false});
                                    });
    
                            }
                    })
                }

            })
    },

    readCalendar: (req, res) => {
        let p = new Date(req.query.date);
        let return_result = [];
        db.readCalendar(p)
            .then(result => {
                result.map((reservation) => {
                    
                    return_result.push(createReservationJSON(reservation, reservation.time_from, reservation.time_to))
                    if (reservation.content) {
                        if (reservation.content.rehersalFrom) {
                            return_result.push(createReservationJSON(reservation, reservation.content.rehersalFrom, reservation.content.rehersalTo, " 리허설"))
                        }
                        if (reservation.content.rehersalLastdayFrom) {
                            return_result.push(createReservationJSON(reservation, reservation.content.rehersalLastdayFrom, reservation.content.rehersalLastdayTo, " 리허설"))
                        }

                    }


                })
                res.json(return_result);
            })
            .catch((err) => { console.log(err); res.json(false) })
    },


    createCalendar: (req, res) => {
        if (!('scspacetoken' in req.cookies)) {
            res.send(false)
        }

        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                let p = {};

                p.reserver_id = result.student_id;
                p.reserver_name = '관리자';
                p.space = req.body.space;
                p.team_id = null;
                p.time_from = new Date(req.body.startDate);
                p.time_to = new Date(req.body.endDate);
                p.time_request = new Date();
                p.content = { 'eventName': req.body.text, 'recurrenceRule': req.body.recurrenceRule ? req.body.recurrenceRule : null, 'contents': req.body.description };
                p.state = 'grant';

                db.createCalendar(p)
                    .then((result) => {
                        result ? res.send(true) : res.send(false)
                    });
            })
    },

    updateCalendar: (req, res) => {

        if (!('scspacetoken' in req.cookies)) {
            res.send(false)
        }
        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                let p = {};
                p.space = req.body.space;
                p.time_from = new Date(req.body.startDate);
                p.time_to = new Date(req.body.endDate);
                p.time_last_modified = new Date();
                p.content = req.body.content ? req.body.content : {};
                p.content['eventName'] = req.body.text;
                p.content['recurrenceRule'] = req.body.recurrenceRule ? req.body.recurrenceRule : null;
                p.content['contents'] = req.body.description;
                p.id = req.body.id
                p.state = 'grant';

                db.updateCalendar(p)
                    .then((result) => {
                        result ? res.send(true) : res.send(false)
                    })
                    .catch((err) => res.send(false))
            })



    },


    readMine: (req, res) => {
        if (!('scspacetoken' in req.cookies)) {
            res.send(false)
        }

        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                let p = result.student_id;
                db.readMine(p)
                    .then(result => { res.json(result); })
                    .catch((err) => { console.log(err); res.json(false) })
            })
    },


    readId: (req, res) => {
        db.readId([parseInt(req.query.id)])
            .then(result => { res.json(result); })
            .catch((err) => { console.log(err); res.json(false) })
    },

    readAll: (req, res) => {
        db.readAll()
            .then(result => { res.json(result); })
            .catch((err) => { console.log(err); res.json(false) })
    },


    update: (req, res) => {
        if (!('scspacetoken' in req.cookies)) {
            res.send(false)
        }
        auth.get_data(req.cookies.scspacetoken)
            .then((result) => {
                let p = {};

                p.reserver_id = result.student_id;
                p.reserver_name = result.name;
                p.space = req.body.space;
                p.team_id = req.body.teamId;
                p.time_from = req.body.timeFrom;
                p.time_to = req.body.timeTo;
                p.time_last_modified = new Date();
                p.content = req.body.content;
                p.id = req.body.id;

                checkDuplicate(p.space, p.time_from, p.time_to, p.id)
                    .then((result) => {
                        if (result === false) {
                            res.json({ 'reserveId': false, 'duplicate': true });
                        }
                        else {
                            let autoGrantList = ['individual-practice-room1', 'individual-practice-room2', 'individual-practice-room3', 'piano-room1', 'piano-room2', 'group-practice-room', 'seminar-room1', 'seminar-room2', 'dance-studio']
                            let autoRejectList = []
                            if (autoGrantList.includes(p.space)) {
                                p.state = 'grant';
                            }
                            else if (autoRejectList.includes(p.space)) {
                                p.state = 'rejected';
                            }
                            else {
                                p.state = 'wait';
                            }


                            db.update(p)
                                .then((result) => {
                                    res.json({ 'reserveId': result });
                                });

                        }

                    })




            })
    },

    delete: (req, res) => {
        db.delete([parseInt(req.query.id)])
            .then(result => { result ? res.send(true) : res.send(false) });
    },

    latestRead: (req, res) => {
        db.latestRead()
            .then(result => { res.json(result); })
            .catch((err) => { console.log(err); res.json(false) })
    },
    createComment: (req, res) => {
        let p = req.body;
        if (!('scspacetoken' in req.cookies)) {
            res.send(false)
        }

        auth.get_data(req.cookies.scspacetoken)
            .then(result => {
                if (result.type === 'admin') {
                    db.createComment(p)
                        .then(result => { result ? res.send(true) : res.send(false) });
                }
                else {
                    res.send(false);
                }

            })
            .catch((err) => { console.log(err) });

    },




}


module.exports = reservation
