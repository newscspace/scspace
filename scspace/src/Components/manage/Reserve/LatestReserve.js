import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import ReservModal from './ReserveModal';
import moment from 'moment'

class LatestReserve extends Component{
    constructor(props) {
        super(props);
        this.state = {
            page_number : 1,
            list : [],
            showHide : false,
            wait : 0,
            reservation : {place: '우하하', reservationState : 'accept', comment : ''},    
            handle: {wait: "대기중", grant: "승인됨", rejected: "거절됨"},  
            
        }; 
        
        
        this.spaceDict = {
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

    componentDidMount(){
        this.callApi()
            .then(res => {this.setState({list:res, wait:res.length});  this.setState({total_page_number : Math.ceil(res.length/5)});} )
            .catch(err => console.log(err));
    }
    
    callApi= async () => {
        const res = await get('/api/reservation/latest');
        const body = await res.data;
        return body;
    }

    handleModalShowHide = (contents, e) => {
        this.setState({
            showHide: !this.state.showHide,            
        })
    }

    setInfo = (contents, e) => {
        const copied_reservation = {...this.state.reservation};
        copied_reservation.place = contents.title;
        this.setState({
            reservation: copied_reservation,
            showHide: !this.state.showHide,            
        })
    }

    handleValueChange = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate['reservation'][e.target.name] = e.target.value;
        this.setState(nextstate);
    }

    handleValueChange_comment = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate['reservation'][e.target.name] = e.target.value;
        this.setState(nextstate);
    }

    render() {return (
        <main id="main">
            <div className="container">
                <br/>
                <h4><b>최신 예약신청 목록</b></h4>
                <h6><b><Link to="./manage/reservation">{this.state.wait}개 대기중</Link></b></h6>
                <hr></hr>

                <table className="table manage">
                    <thead>
                        <th>공간</th>
                        <th>예약자</th>
                        <th>예약 id</th>
                        <th>시간</th>
                        <th>예약한 시간</th>
                        <th>상태</th>
                    </thead>

                    <tbody>
                        {this.state.list.slice((this.state.page_number-1)*5, this.state.page_number*5).map((contents) => {
                            return(
                                <tr onClick={(e) => this.setInfo(contents, e)}>
                                    <td>{this.spaceDict[contents.space]}</td>
                                    <td>{contents.reserver_id}</td>
                                    <td>{contents.id}</td>
                                    <td>{moment(contents.time_from).format('MM월 DD일 HH:mm') + '~' + moment(contents.time_to).format('MM월 DD일 HH:mm')}</td>
                                    <td>{moment(contents.time_request).format('MM월 DD일 HH:mm')}</td>
                                    <td>{this.state.handle[contents.state]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="blog">
                    <div className="blog-pagination">
                        <ul className="justify-content-center">

                            {
                                [...Array(this.state.total_page_number)].map((v,i) => i+1).map((page_num) => {
                                    return(<li className={this.state.page_number === page_num ? "active" : ""}onClick={() => {this.setState({page_number : page_num})}}><Link to="#" >{page_num}</Link></li>)

                                })
                                
                            }
                            
                        </ul>
                    </div>
                </div>
            <ReservModal modal={this.state} onClickHandler={this.handleModalShowHide} onChangeHandler2={this.handleValueChange} onChangeHandler3={this.handleValueChange_comment}/>

      </main>
      )};
}

export default LatestReserve;