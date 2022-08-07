import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import ReservationPick from './ReservationPick';
import Comment from './Comment';

class ReservModal extends Component{
    constructor(props) {
        super(props);
    }

    render() {return (
            <Modal show={this.props.modal.showHide} dialogClassName="modal-90w">
                <Modal.Header closeButton onClick={this.props.onClickHandler}>
                <Modal.Title>{this.props.modal.reservation.place}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5 className="modal-ttl">시간</h5>
                        <hr/>
                        <div className="wrap">
                            <p className="modal-first">연습 시간</p>
                            <p className="modal-second">7월 25일 0:20 ~ 7월 25일 1:21</p>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <h5 className="modal-ttl">예약자</h5>
                        <hr/>
                        <div className="wrap">
                            <p className="modal-first">예약자 학번</p>
                            <p className="modal-second">20221234</p>
                        </div>
                        <div className="wrap">
                            <p className="modal-first">예약자 이름</p>
                            <p className="modal-second">김네모</p>
                        </div>
                        <div className="wrap">
                            <p className="modal-first">예약자 전화번호</p>
                            <p className="modal-second">010-1234-5678</p>
                        </div>
                        <div className="wrap">
                            <p className="modal-first">예약자 이메일</p>
                            <p className="modal-second">kimnemo@kaist.ac.kr</p>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <h5 className="modal-ttl">예약 처리</h5>
                        <hr/>
                        <div className="wrap">
                            <p className="modal-first">예약 처리</p>
                            <ReservationPick reservationlist={{승인: 'accept', 거절: 'reject', 대기중: 'wait'}} onChange={this.props.onChangeHandler2}/>
                        </div>
                        <div className="wrap">
                            <p className="modal-first">Comment</p>
                            <Comment onChange={this.props.onChangeHandler3}/>
                        </div>
                    </div>
                    <br/>
                </Modal.Body>
                <Modal.Footer>
                <button className="modalButton2" variant="primary" onClick={this.props.onClickHandler}>
                    처리
                </button>
                <button className="modalButton1" variant="secondary" onClick={this.props.onClickHandler}>
                    닫기
                </button>
                </Modal.Footer>
            </Modal>
      )};
}

export default ReservModal;