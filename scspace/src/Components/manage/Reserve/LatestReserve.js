import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import ReservModal from './ReserveModal';


class LatestReserve extends Component{
    constructor(props) {
        super(props);
        this.state = {
            page_number : 1,
            list : [],
            showHide : false,
            reservation : {place: '우하하', reservationState : 'accept', comment : ''},    
        };  
        
    }

    componentDidMount(){
        this.callApi()
            .then(res => {this.setState({list:res});  this.setState({total_page_number : Math.ceil(res.length/5)});} )
            .catch(err => console.log(err));
    }
    
    callApi= async () => {
        const res = await get('/api/notice/all');
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
                <h6><b><Link to="./manage/reservation">n개 대기중</Link></b></h6>
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
                                    {/* <td>공간</td>
                                    <td>예약자</td>
                                    <td>예약 id</td>
                                    <td>시간</td>
                                    <td>예약한 시간</td>
                                    <td>상태</td> */}
                                    <td>{contents.title}</td>
                                    <td>{contents.title}</td>
                                    <td>{contents.title}</td>
                                    <td>{contents.title}</td>
                                    <td>{contents.title}</td>
                                    <td>제발돌아가</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <ReservModal modal={this.state} onClickHandler={this.handleModalShowHide} onChangeHandler2={this.handleValueChange} onChangeHandler3={this.handleValueChange_comment}/>

      </main>
      )};
}

export default LatestReserve;