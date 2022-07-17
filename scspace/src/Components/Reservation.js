import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Individual from './reservation_form/Individual-practice-room';
import Piano from './reservation_form/Piano-room';
import Dance from './reservation_form/Dance-studio';
import Group from './reservation_form/Group-practice-room';
import Seminar from './reservation_form/Seminar-room';
import Ullim from './reservation_form/Ullim-hall';
import Mirae from './reservation_form/Mirae-hall';
import Openspace from './reservation_form/Open-space';
import Workshop from './reservation_form/Workshop';

class Reservation extends Component{
    constructor(props){
        super(props);
        this.space_list = ['Individual_practice_room', 'Piano_room','Dance_studio', 'Seminar_room', 'Group_practice_room', 'Ullim_hall', 'Mirae_hall', 'Open_space', 'Workshop'];
        //this.space_list = ['개인연습실', '피아노실', '무예실', '합주실','세미나실', '울림홀', '미래홀', '창작공방', '오픈스페이스' ];
        this.state = {
            space_name : 'Individual_practice_room',
            
            space : {
              Individual_practice_room: '개인연습실',
              Piano_room: '피아노실',
              Seminar_room : '세미나실',
              Group_practice_room: '합주실',
              Dance_studio: '무예실',
              Ullim_hall: '울림홀',
              Mirae_hall: '미래홀',
              Workshop: '창작공방',
              Open_space: '오픈스페이스'
          },
          space_tag : {
            Individual_practice_room: <Individual/>,
            Piano_room: <Piano/>,
            Seminar_room : <Seminar/>,
            Group_practice_room: <Group/>,
            Dance_studio: <Dance/>,
            Ullim_hall:  <Ullim/>,
            Mirae_hall: <Mirae/>,
            Workshop: <Workshop/>,
            Open_space: <Openspace/>
        },
            /*개인연습실 및 피아노실 */
            form1 : {
                space: '',
                team_id: null ,
                time_from : '',
                time_to : '',
                content : {}
            } ,
            /*창작공방, 세미나실 */
            form2 : {
                space: '',
                team_id: null,
                time_from : '',
                time_to : '',
                content : {team_name : '', event_name:'', number : 1, contents:''}
            },
            /*무예실, 합주실 */
            form3 : {
                space: '',
                team_id: null,
                team_list:[],
                time_from : '',
                time_to : '',
                content : {team_name : '', event_name:'', team_member:[], contents:''}
            }, 
            /*미래홀, 울림홀*/
            form3 : {
                space: '',
                team_id: null,
                time_from : '',
                time_to : '',
                content : {team_name : '', event_name:'', number:{inner:0, outer:0}, event_purpose:'',contents:'', rehersal_time:{rehersal_from:'', rehersal_to:'', rehersal_lastday_from : '', rehersal_lastday_to:''}, equipment:[], food:false, lobby:false, desk:0, chair:0}
            }, 
            /*오픈스페이스*/ 
            form4 : {
                space: '',
                team_id: null,
                time_from : '',
                time_to : '',
                content : {team_name : '', event_name:'', number:{inner:0, outer:0}, event_purpose:'',contents:'', character:[], where:[], rehersal_time:{rehersal_from:'', rehersal_to:''}, food:false, desk:0, chair:0}
            },
            /*유의 사항*/ 
            notice : [
                {title : '1', contents:'2'}, 
                {title : '3', contents:'4'}, 
                {title : '5', contents:'6'} 
              ]
        }

        
    }
/*예약 수정시 백엔드에 요청해서 기존 에약 내역 받아와서 state.form에 넣는 기능 구현해야함, 이때 props로 <Form1>태그에 전달하면 Form1.js에서 처리하게 하면 될듯*/
    render() {
        return (
      <main id="main">
           <div  className="breadcrumbs">
              <div  className="container">
                  <div  className="d-flex justify-content-between align-items-center">
                      <h3>예약</h3>
                <ol>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/reservation">예약</Link></li>
                </ol>
                </div>
              </div>
            </div> 
            <section>
            <div className="section-header">
                    <h2>{this.state.space[this.state.space_name]}</h2>
                    <p>{this.state.space_name.replace(/_/gi, ' ')}</p>
            </div>
            
            <hr/>

            <section id="portfolio"  className="portfolio">
              <div className="container-fluid">
                <div  className="portfolio-isotope" >
                  <ul  className="portfolio-flters">
                    {this.space_list.map((space) => {
                        return (
                                <li onClick={() => {this.setState({space_name : space})}}>{this.state.space[space]}</li>
                        )
                      } 
                    )}
                  </ul>
              </div>
          </div>
          </section>

        <section id="contact" className="contact">
            <div className="container">
      
              <div className="row gy-5 gx-lg-5">
      
                <div className="col-lg-4">
      
                  <div className="info">
                    <h3>유의사항</h3>
                    <p>유의사항을 잘 읽어주시면 굉장히 감사하겠네요</p>
                    {this.state.notice.map((contents, idx) => {
                            return (
                          <div className="info-item d-flex">
                            <div>
                              <h4>{contents.title}</h4>
                              <p>{contents.contents}</p>
                            </div>
                           </div>
                          )
                        } 
                    )}
        
                  </div>
                </div>

                {this.state.space_tag[this.state.space_name]}
                

              </div>
            </div>
        </section>
      </section>
      </main>
      )};
}

export default Reservation;