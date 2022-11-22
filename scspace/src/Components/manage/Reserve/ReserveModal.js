import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {get} from 'axios';
import moment from 'moment';

class ReservModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            teamData : null
        }
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

    
    reservationContent = () => {
        let returnResult = [];
        if (this.props.modal.reservation.team_id !== null){
            if (this.state.teamData !== null && (parseInt(this.state.teamData.team_id) ===  parseInt(this.props.modal.reservation.team_id))) {
                returnResult.push(
                <div className="wrap">
                    <p className="modal-first">팀 이름</p>
                    <p className="modal-second">{this.state.teamData.team_name}</p>
                </div>
                )
                returnResult.push(
                    <div className="wrap">
                    <p className="modal-first">멤버</p>
                    <p className="modal-second">
                    {this.state.teamData.member.map((member) => {
                        if (this.props.modal.reservation.content.teamMember.includes(String(member.id))){
                            return(
                                <div>학번 : {member.student_id} &nbsp; &nbsp; 이름 : {member.name}<br/></div>
                            )
                        }
                        
                    })}</p>
                    </div>
                )
                
            }
            else{
                this.callApi_team()
                    .then(res => {this.setState({teamData:res}); } )
                    .catch(err => console.log(err));
            }
        }

        if (this.props.modal.reservation.content.organizationName){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">단체 이름</p>
                    <p className="modal-second">{this.props.modal.reservation.content.organizationName}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.eventName){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">행사 이름</p>
                    <p className="modal-second">{this.props.modal.reservation.content.eventName}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.number){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">예상 참여 인원</p>
                    <p className="modal-second">{this.props.modal.reservation.content.number}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.innerNumber){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">예상 참여 인원</p>
                    <p className="modal-second">학내구성원 : {this.props.modal.reservation.content.innerNumber} 외부인 : {this.props.modal.reservation.content.outerNumber}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.space){
            let spaceList = {"rooftop":"옥상", "community": '커뮤니티 마당', "stair":'전시계단', 'media':'미디어 스페이스', "second_lobby":'2층 로비', "third_lobby":'3층 로비', 'meeting':'모임터'}

            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">사용 공간</p>
                    <p className="modal-second">{this.props.modal.reservation.content.space.map((space) => {
                            return(spaceList[space]+ '  ')
                    })}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.eventPurpose){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">행사 목적</p>
                    <p className="modal-second">{this.props.modal.reservation.content.eventPurpose}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.contents){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">행사 내용</p>
                    <p className="modal-second">{this.props.modal.reservation.content.contents}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.character){
            let characterList = {"religion":'종교적', "rentability":'영리성', "politic":'정치적'}
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">행사 성격</p>
                    <p className="modal-second">{this.props.modal.reservation.content.character.map((character) => {
                            return(characterList[character]+ '  ')
                    })}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.rehersalFrom){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">당일 리허설 시간</p>
                    <p className="modal-second">{moment(this.props.modal.reservation.content.rehersalFrom).format('MM월 DD일 HH:mm') + '~' + moment(this.props.modal.reservation.content.rehersalTo).format('MM월 DD일 HH:mm')}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.rehersalLastdayFrom){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">전날 리허설 시간</p>
                    <p className="modal-second">{moment(this.props.modal.reservation.content.rehersalLastdayFrom).format('MM월 DD일 HH:mm') + '~' + moment(this.props.modal.reservation.content.rehersalLastdayTo).format('MM월 DD일 HH:mm')}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.workFrom){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">근로 배정 시간</p>
                    <p className="modal-second">{moment(this.props.modal.reservation.content.workFrom).format('MM월 DD일 HH:mm') + '~' + moment(this.props.modal.reservation.content.workTo).format('MM월 DD일 HH:mm')}</p>
                </div>
            )
        }

        if (this.props.modal.reservation.content.equipment){
            let equipmentList = {"light" : '조명', "sound":'음향', "projector":'프로젝터'}
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">장비 사용</p>
                    <p className="modal-second">{this.props.modal.reservation.content.equipment.map((equipment) => {
                        return(equipmentList[equipment] + '  ')
                    })}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.desk && this.props.modal.reservation.content.chair){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">책상과 의자</p>
                    <p className="modal-second">책상 : {this.props.modal.reservation.content.desk}  의자 : {this.props.modal.reservation.content.chair}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.food){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">음식</p>
                    <p className="modal-second">{this.props.modal.reservation.content.food}</p>
                </div>
            )
        }
        if (this.props.modal.reservation.content.lobby && this.props.modal.reservation.content.lobby[0] === true){
            returnResult.push(
                <div className="wrap">
                    <p className="modal-first">로비</p>
                    <p className="modal-second">울림홀 1층 로비를 사용합니다.</p>
                </div>
            )
        }

        return returnResult;
    }

        callApi_team= async () => {
            const res = await get('/api/team/id?id='+this.props.modal.reservation.team_id);
            const body = await res.data;
            return body;
        }
        
     

    render() {return (
            <Modal show={this.props.modal.showHide} dialogClassName="modal-90w">
                <Modal.Header closeButton onClick={this.props.onClickHandler}>
                <Modal.Title>{this.props.modal.reservation ? this.spaceDict[this.props.modal.reservation.space] : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5 className="modal-ttl">시간</h5>
                        <hr/>
                        <div className="wrap">
                            <p className="modal-first">연습 시간</p>
                            <p className="modal-second">{this.props.modal.reservation ? moment(this.props.modal.reservation.time_from).format('MM월 DD일 HH:mm') + '~' + moment(this.props.modal.reservation.time_to).format('MM월 DD일 HH:mm') : ''}</p>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <h5 className="modal-ttl">예약자</h5>
                        <hr/>
                        <div className="wrap">
                            <p className="modal-first">예약자 학번</p>
                            <p className="modal-second">{this.props.modal.reserverInfo ? this.props.modal.reserverInfo.student_id : ''}</p>
                        </div>
                        <div className="wrap">
                            <p className="modal-first">예약자 이름</p>
                            <p className="modal-second">{this.props.modal.reserverInfo ? this.props.modal.reserverInfo.name : ''}</p>
                        </div>
                        <div className="wrap">
                            <p className="modal-first">예약자 전화번호</p>
                            <p className="modal-second">{this.props.modal.reserverInfo ? this.props.modal.reserverInfo.phone :''}</p>
                        </div>
                        <div className="wrap">
                            <p className="modal-first">예약자 이메일</p>
                            <p className="modal-second">{this.props.modal.reserverInfo ? this.props.modal.reserverInfo.email : ''}</p>
                        </div>
                    </div>
                    <br/>
                    <div>
                    <h5 className="modal-ttl">예약 내용</h5>
                        <hr/>
                        {
                        this.props.modal.reservation !== null && this.props.modal.reservation.content !== null ? this.reservationContent() : ''}
                    </div>


                    <br/>
                    <div>
                        <h5 className="modal-ttl">예약 처리</h5>
                        <hr/>
                        <div className="wrap">
                            <p className="modal-first">예약 처리</p>

                            {Object.keys(this.props.modal.handle).map((member) =>{
                                return (
                                    <div className="form-check form-check-inline">
                                    <input className="modal-chk" type="radio" name="state" id="inlineRadio1" onChange={this.props.onChangeHandler2} value={member} required/>
                                    <label className="modal-second" for="inlineRadio1">{this.props.modal.handle[member]}</label>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="wrap">
                            <p className="modal-first">Comment</p>
                            <div>
                            <div>
                                <input type="text" name="comment" class="modal-comment" value={this.props.modal.reservation? this.props.modal.reservation.comment : ''} onChange={this.props.onChangeHandler2} required/>
                            </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </Modal.Body>
                <Modal.Footer>
                <button className="modalButton2" variant="primary" onClick={this.props.handleSubmit}>
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