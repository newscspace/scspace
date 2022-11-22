import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import LoginCheck from './auth/LoginCheck';
import { get } from 'axios';
import { withTranslation } from "react-i18next";

class Confirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: false
        }

        if (!this.props.location.state) { this.props.history.push({ pathname: '/reservation' }); }
        LoginCheck()
            .then((result) => {
                if (result === false) { this.props.history.push({ pathname: '/login' }); }
                else this.setState({ login: true, UserInfo: result });
            });

        this.callApi()
            .then(res => { this.setState({ reserveData: res }); })
            .catch(err => console.log(err));

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

        let hashed = this.easteregg();

        if(hashed.hash !== 0){
            // 넘어온 해시값이 0이 아니면(당첨됐으면) prompt로 당첨 메시지 띄워줌
            // prompt로 하는 이유는.... alert로는 복사가 안되더라구요....
            window.prompt(hashed.content, hashed.hash);
        }
        

    }
    
    easteregg = () => {
        if(this.props.location.hashid == null || this.props.location.hashid == undefined){
            return {hash: 0, content: ''};
        }
        return this.props.location.hashid
    }

    reservationContent = () => {
        let returnResult = [];
        if (this.state.reserveData.team_id !== null) {
            if (this.state.teamData) {
                returnResult.push(
                    <div className="wrap">
                        <p className="ptitle">팀 이름</p>
                        <p className="ptxt">{this.state.teamData.team_name}</p>
                    </div>
                )
                returnResult.push(
                    <div className="wrap">
                        <p className="ptitle">멤버</p>
                        <p className="ptxt">
                            {this.state.teamData.member.map((member) => {
                                if (this.state.reserveData.content.teamMember.includes(String(member.id))) {
                                    return (
                                        <div>학번 : {member.student_id} &nbsp; &nbsp; 이름 : {member.name}<br /></div>
                                    )
                                }

                            })}</p>
                    </div>
                )

            }
            else {
                this.callApi_team()
                    .then(res => { this.setState({ teamData: res }); })
                    .catch(err => console.log(err));
            }
        }

        if (this.state.reserveData.content.organizationName) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">단체 이름</p>
                    <p className="ptxt">{this.state.reserveData.content.organizationName}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.eventName) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">행사 이름</p>
                    <p className="ptxt">{this.state.reserveData.content.eventName}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.number) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">예상 참여 인원</p>
                    <p className="ptxt">{this.state.reserveData.content.number}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.innerNumber) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">예상 참여 인원</p>
                    <p className="ptxt">학내구성원 : {this.state.reserveData.content.innerNumber} 외부인 : {this.state.reserveData.content.outerNumber}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.space) {
            let spaceList = { "rooftop": "옥상", "community": '커뮤니티 마당', "stair": '전시계단', 'media': '미디어 스페이스', "second_lobby": '2층 로비', "third_lobby": '3층 로비', 'meeting': '모임터' }

            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">사용 공간</p>
                    <p className="ptxt">{this.state.reserveData.content.space.map((space) => {
                        return (spaceList[space] + '  ')
                    })}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.eventPurpose) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">행사 목적</p>
                    <p className="ptxt">{this.state.reserveData.content.eventPurpose}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.contents) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">행사 내용</p>
                    <p className="ptxt">{this.state.reserveData.content.contents}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.character) {
            let characterList = { "religion": '종교적', "rentability": '영리성', "politic": '정치적' }
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">행사 성격</p>
                    <p className="ptxt">{this.state.reserveData.content.character.map((character) => {
                        return (characterList[character] + '  ')
                    })}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.rehersalFrom) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">당일 리허설 시간</p>
                    <p className="ptxt">{moment(this.state.reserveData.content.rehersalFrom).format('MM월 DD일 HH:mm') + '~' + moment(this.state.reserveData.content.rehersalTo).format('MM월 DD일 HH:mm')}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.rehersalLastdayFrom) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">전날 리허설 시간</p>
                    <p className="ptxt">{moment(this.state.reserveData.content.rehersalLastdayFrom).format('MM월 DD일 HH:mm') + '~' + moment(this.state.reserveData.content.rehersalLastdayTo).format('MM월 DD일 HH:mm')}</p>
                </div>
            )
        }

        if (this.state.reserveData.content.equipment) {
            let equipmentList = { "light": '조명', "sound": '음향', "projector": '프로젝터' }
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">장비 사용</p>
                    <p className="ptxt">{this.state.reserveData.content.equipment.map((equipment) => {
                        return (equipmentList[equipment] + '  ')
                    })}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.desk && this.state.reserveData.content.chair) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">책상과 의자</p>
                    <p className="ptxt">책상 : {this.state.reserveData.content.desk}  의자 : {this.state.reserveData.content.chair}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.food) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">음식</p>
                    <p className="ptxt">{this.state.reserveData.content.food}</p>
                </div>
            )
        }
        if (this.state.reserveData.content.lobby && this.state.reserveData.content.lobby[0] === true) {
            returnResult.push(
                <div className="wrap">
                    <p className="ptitle">로비</p>
                    <p className="ptxt">울림홀 1층 로비를 사용합니다.</p>
                </div>
            )
        }


        return returnResult;
    }


    callApi_team = async () => {
        const res = await get('/api/team/id?id=' + this.state.reserveData.team_id);
        const body = await res.data;
        return body;
    }
    callApi = async () => {
        const res = await get('/api/reservation/id?id=' + this.props.location.state);
        const body = await res.data;
        return body;
    }

    callApi_delete = async () => {
        const res = await get('/api/reservation/delete?id=' + this.props.location.state);
        const body = await res.data;
        return body;
    }

    render() {
        const { t } = this.props;


        return (
            <main id="main">
                <div className="breadcrumbs">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>{t('예약확인서')}</h3>
                            <ol>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/introduction">{t('예약확인서')}</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <section className="section-header">
                    <div className="contact">
                        <div className="confirm">
                            <div className="info">
                                <h3>{t('예약 신청이 완료되었습니다.')}</h3>
                                <br />
                                <div className="conf-item txt">
                                    <div>
                                        <h4>{t('예약자 정보')}</h4>
                                        <hr />
                                        <div className="wrap">
                                            <p className="ptitle">예약자 이름</p>
                                            <p className="ptxt">{this.state.reserveData ? this.state.reserveData.reserver_name : ''}</p>
                                        </div>
                                        <div className="wrap">
                                            <p className="ptitle">예약자 학번</p>
                                            <p className="ptxt">{this.state.reserveData ? this.state.reserveData.reserver_id : ''}</p>
                                        </div>
                                        <br /><br />
                                    </div>


                                    <div>
                                        <h4>{t('장소 및 시간')}</h4>
                                        <hr />
                                        <div className="wrap">
                                            <p className="ptitle">장소</p>
                                            <p className="ptxt">{this.state.reserveData ? this.spaceDict[this.state.reserveData.space] : ''}</p>
                                        </div>
                                        <div className="wrap">
                                            <p className="ptitle">요청 시간</p>
                                            <p className="ptxt">{this.state.reserveData ? moment(this.state.reserveData.time_request).format('MM월 DD일 HH:mm') : ''}</p>
                                        </div>
                                        <div className="wrap">
                                            <p className="ptitle">예약 시간</p>
                                            <p className="ptxt">{this.state.reserveData ? moment(this.state.reserveData.time_from).format('MM월 DD일 HH:mm') + '~' + moment(this.state.reserveData.time_to).format('MM월 DD일 HH:mm') : ''}</p>
                                        </div>
                                        <br /><br />
                                    </div>

                                    {
                                        this.state.reserveData && this.state.reserveData.content !== null ?
                                            (<div>
                                                <h4>{t('예약 내용')}</h4>
                                                <hr />
                                                {this.reservationContent()}
                                                <hr />
                                                <br /><br />
                                            </div>) : (<div />)
                                    }


                                    <div>
                                        <h4>{t('예약 처리')}</h4>
                                        <hr />
                                        <div className="wrap">
                                            <p className="ptitle">상태</p>
                                            <p className="ptxt">{this.state.reserveData ? this.state.reserveData.state : ''}</p>
                                        </div>
                                        <div className="wrap">
                                            <p className="ptitle">Comment</p>
                                            <p className="ptxt">{this.state.reserveData ? this.state.reserveData.comment : ''}</p>
                                        </div>
                                    </div>
                                    <div className="text-end pdf">
                                        <button onClick={() => { this.props.history.push({ pathname: '/reservation' }) }}>{t('확인')}</button>
                                        <button onClick={() => { this.props.history.push({ pathname: '/reservation', state: this.state.reserveData }) }}>{t('예약 수정')}</button>
                                        <button onClick={() => { this.callApi_delete().then((res) => { this.props.history.push('/mypage') }).catch((err) => { console.log(err) }) }}>{t('예약 취소')}</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    };
}

export default withTranslation()(Confirmation);