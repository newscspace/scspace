import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import moment from 'moment';
import { et } from 'date-fns/locale';
import {withTranslation} from "react-i18next";

class Reservation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            spaceFilter: 'all',
            stateFilter: 'all',
            page_number : 1,
            list : [],
            selectedList : [],
            handle: {wait: "대기중", grant: "승인됨", rejected: "거절됨"}, 
            workHandle: {nowork: "근로 없음", notassigned: "배정 안됨", assigned: "배정 완료"}, 
        };  

        this.spaceDict = {
            'all' : '전체 공간',
            'individual-practice-room1': '개인연습실 1',
            'individual-practice-room2': '개인연습실 2',
            'individual-practice-room3': '개인연습실 3',
            'piano-room1': '피아노실 1',
            'piano-room2': '피아노실 2',
            'group-practice-room': '합주실',
            'dance-studio': '무예실',
            'ullim-hall': '울림홀',
            'mirae-hall': '미래홀',
            'seminar-room1': '세미나실 1',
            'seminar-room2': '세미나실 2',
            'workshop': '창작공방',
            'open-space': '오픈스페이스'
          }

    
    }
    
    workStateChange = (work) => {
        if(work === null) return "nowork";
        if(work === false) return "notassigned";
        return "assigned";
    }

    workStateChangeInverse = (work) => {
        if(work === "nowork") return null;
        if(work === "notassigned") return false;
        if(work === "assigned")return true;
    }

    handleChange = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate[e.target.name] = e.target.value;
        nextstate.selectedList = [];
        
        this.state.list.map((contents) => {
        if ((nextstate.spaceFilter === contents.space || nextstate.spaceFilter === 'all') && (nextstate.stateFilter === contents.state || nextstate.stateFilter === 'all')){
                nextstate.selectedList.push(contents)
        }   
        })

        nextstate.total_page_number = Math.ceil(nextstate.selectedList.length / 5)
        this.setState(nextstate);
      }

    componentDidMount(){
        this.callApi()
            .then(res => {this.setState({list:res, selectedList:res});  this.setState({total_page_number : Math.ceil(res.length/5)});} )
            .catch(err => console.log(err));
    }
    
    callApi= async () => {
        const res = await get('/api/reservation/mine');
        const body = await res.data;
        return body;
    }

    render() {
        const {t} = this.props;

        return (
        <main id="main">
            <div className='container'>
                <br/>
                <h4><b>{t('내 예약')}</b></h4>
                <hr></hr>

                <table className="table">
                    <thead>
                        <th>
                            <select name="spaceFilter" value={this.state.space} onChange={this.handleChange}> 
                                {
                                    Object.keys(this.spaceDict).map((space) => {
                                        return (<option value={space}>{t(this.spaceDict[space])}</option>)
                                    })

                                }
        
                                
                            </select>
                            </th>
                        <th>{t('시간')}</th>
                        <th>{t('예약한 시간')}</th>
                        <th><form onSubmit={this.handleSubmit}>
                            <select name="stateFilter"value={this.state.state} onChange={this.handleChange}> 
                                <option value="all">{t('전체 상태')}</option>
                                <option value="grant">{t('승인됨')}</option>
                                <option value="rejected">{t('거절됨')}</option>
                                <option value="wait">{t('대기중')}</option>
                            </select>
                        </form></th>
                        <th>{t('근로 배정')}</th>
                        <th>{t('확인서')}</th>
                    </thead>

                    <tbody>
                        {this.state.selectedList.slice((this.state.page_number-1)*5, this.state.page_number*5).map((contents) => {
                            return (<tr>
                                <td>{this.spaceDict[contents.space]}</td>
                                <td>{moment(contents.time_from).format('MM월 DD일 HH:mm')}~{moment(contents.time_to).format('MM월 DD일 HH:mm')}</td>
                                <td>{moment(contents.time_request).format('MM월 DD일 HH:mm')}</td>
                                <td>{this.state.handle[contents.state]}</td>
                                {contents.content === null ? <td>근로 없음</td> : 
                                <td>{this.state.workHandle[this.workStateChange(contents.content.workComplete)]}</td>}
                                <td onClick={() => {this.props.history.push({pathname:'/confirmation', state:contents.id})}}><Link>보기</Link></td>
                            </tr>)
                            
                        })}
                    </tbody>
                </table>
            </div>

            <section className="blog">
                <div className="blog-pagination">
                    <ul className="justify-content-center">
                        
                        {
                            [...Array(this.state.total_page_number)].map((v,i) => i+1).map((page_num) => {
                                return(<li className={this.state.page_number === page_num ? "active" : ""}onClick={() => {this.setState({page_number : page_num})}}><Link to="#" >{page_num}</Link></li>)

                            })
                            
                        }
                        
                    </ul>
                </div>
            </section>
      </main>
      )};
}

export default withTranslation()(Reservation);