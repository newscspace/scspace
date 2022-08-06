import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Confirmation extends Component{
    render() {return (
        <main id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                    <h3>예약확인서</h3>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/introduction">예약확인서</Link></li>
                    </ol>
                    </div>
                </div>
            </div>

            <section className="section-header">
                <div className="contact">
                    <div className="confirm">            
                        <div className="info">
                            <h3>(공간이름) 예약 신청이 완료되었습니다.</h3>
                            <br/>
                            {/* <p>학생문화공간위원회의 모든 사업은 아래<br/>회칙/세칙을 중심으로 진행됩니다.</p> */}
                                <div className="conf-item txt">
                                    <div>
                                        <h4>장소 및 시간</h4>
                                        <hr/>
                                        <div className="wrap">
                                            <p className="ptitle">장소</p>
                                            <p className="ptxt">개인연습실 1</p>
                                        </div>
                                        <div className="wrap">
                                            <p className="ptitle">예약 시간</p>
                                            <p className="ptxt">7월 25일 0:20 ~ 7월 25일 1:21</p>
                                        </div>
                                        <div className="wrap">
                                            <p className="ptitle">예약자 이름</p>
                                            <p className="ptxt">야차찻</p>
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div>
                                        <h4>예약 처리</h4>
                                        <hr/>
                                        <div className="wrap">
                                            <p className="ptitle">상태</p>
                                            <p className="ptxt">승인됨</p>
                                        </div>
                                        <div className="wrap">
                                            <p className="ptitle">Comment</p>
                                            <p className="ptxt">야차찻</p>
                                        </div>
                                    </div>
                                    <div className="text-end pdf"><button>
                                    <a href="#">예약 취소</a></button></div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )};
}

export default Confirmation;