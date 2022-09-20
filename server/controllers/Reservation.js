const db = require('../models/reservation');
const auth = require('./Jwt');

reservation = {
    create : (req, res) => {
      if(!('scspacetoken' in req.cookies)){
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
            p.time_request = new Date();
            p.content = req.body.content;

            
            let autoGrantList = ['individual-practice-room1', 'individual-practice-room2', 'individual-practice-room3', 'piano-room1', 'piano-room2', 'group-practice-room', 'seminar-room1', 'seminar-room2', 'dance-studio']
            let autoRejectList = ['workshop']
            if (autoGrantList.includes(p.space)){
                p.state = 'grant'; 
            }
            else if (autoRejectList.includes(p.space)){
                p.state='rejected';
            }
            else{
                p.state='wait';
            }


            db.create(p)
            .then ((result) => {
                res.json({'reserveId':result});
            });
        })
    },

    readCalendar : (req, res) => {
        let p = new Date(req.query.date);
        let return_result = [];
        db.readCalendar(p)
        .then(result => {
            result.map((reservation) => {
                return_result.push({
                    id:reservation.id, 
                    space:reservation.space,
                    startDate : reservation.time_from, 
                    endDate : reservation.time_to,
                    content : reservation.content, 
                    text:reservation.content ?(reservation.content.eventName ? reservation.content.eventName : reservation.content.organizationName) : null, 
                    description:reservation.content?reservation.content.contents : null, 
                    recurrenceRule : reservation.content ? reservation.content.recurrenceRule : null
                })
                if (reservation.content && (reservation.content.rehersalFrom || reservation.content.rehersalLastdayFrom)){
                    if(reservation.content.rehersalFrom){
                        return_result.push({
                            id:reservation.id,
                            space:reservation.space,
                            startDate : reservation.content.rehersalFrom,
                            endDate : reservation.content.rehersalTo,
                            content : reservation.content,
                            text: (reservation.content.eventName ? reservation.content.eventName+' 리허설' : reservation.content.organizationName+' 리허설'), 
                            description:reservation.content?reservation.content.contents : null, 
                            recurrenceRule : reservation.content ? reservation.content.recurrenceRule : null
                        })
                    }
                    if(reservation.content.rehersalLastdayFrom){
                        return_result.push({
                            id:reservation.id,
                            space:reservation.space,
                            startDate : reservation.content.rehersalLastdayFrom,
                            endDate : reservation.content.rehersalLastdayTo,
                            content : reservation.content.rehersalLastdayFrom,
                            text: (reservation.content.eventName ? reservation.content.eventName+' 리허설' : reservation.content.organizationName+' 리허설'), 
                            description:reservation.content?reservation.content.contents : null, 
                            recurrenceRule : reservation.content ? reservation.content.recurrenceRule : null
                        })

                    }
                  
                }
            
                
            })
            res.json(return_result);
        })
        .catch ((err) => {console.log(err); res.json(false)})
    },


    createCalendar : (req, res) => {
        if(!('scspacetoken' in req.cookies)){
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
                p.content = {'eventName':req.body.text, 'recurrenceRule':req.body.recurrenceRule?req.body.recurrenceRule : null, 'contents':req.body.description};
                p.state = 'grant';
    
                db.createCalendar(p)
                .then ((result) => {
                    result ? res.send(true)  : res.send(false)
                });
            })
    },

    updateCalendar : (req, res) => {

        if(!('scspacetoken' in req.cookies)){
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
                .then ((result) => {
                    result ? res.send(true)  : res.send(false)
                })
                .catch((err) => res.send(false))
            })



    },


    readMine : (req, res) =>{
      if(!('scspacetoken' in req.cookies)){
        res.send(false)
    }

    auth.get_data(req.cookies.scspacetoken)
        .then((result) => {
            let p = result.student_id;
            db.readMine(p)
                .then(result => {res.json(result);})
                .catch ((err) => {console.log(err); res.json(false)})
        })
  },

  
    readId : (req, res) => {
      db.readId([parseInt(req.query.id)])
          .then(result => {res.json(result);})
          .catch ((err) => {console.log(err); res.json(false)})
  },

  readAll : (req, res) => {
    db.readAll()
        .then(result => {res.json(result);})
        .catch ((err) => {console.log(err); res.json(false)})
},

 
    update : (req, res) => {
        if(!('scspacetoken' in req.cookies)){
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
                 
                let autoGrantList = ['individual-practice-room1', 'individual-practice-room2', 'individual-practice-room3', 'piano-room1', 'piano-room2', 'group-practice-room', 'seminar-room1', 'seminar-room2', 'dance-studio']
                let autoRejectList = ['workshop']
                if (autoGrantList.includes(p.space)){
                    p.state = 'grant'; 
                }
                else if (autoRejectList.includes(p.space)){
                    p.state='rejected';
                }
                else{
                    p.state='wait';
                }

    
                db.update(p)
                .then ((result) => {
                    res.json({'reserveId':result});
                });
            })
  }, 

  delete  : (req, res) => {
      db.delete([parseInt(req.query.id)])
      .then (result => { result ? res.send(true) : res.send(false)});
  },

  latestRead : (req, res) => {
    db.latestRead()
        .then(result => {res.json(result);})
        .catch ((err) => {console.log(err); res.json(false)})
},
createComment : (req, res) => {
    let p = req.body;
    if(!('scspacetoken' in req.cookies)){
        res.send(false)
    }
    
    auth.get_data(req.cookies.scspacetoken)
    .then(result=> {
        if (result.type === 'admin'){
            db.createComment(p)
            .then (result => { result ? res.send(true) : res.send(false)});
        }
        else{
            res.send(false);
        }

    })
    .catch((err) => {console.log(err)});
   
},




}


module.exports = reservation

