import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Team extends Component{
    render() {return (
        <main id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                    <h3>나의 팀</h3>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/introduction">나의 팀</Link></li>
                    </ol>
                    </div>
                </div>
            </div>

            <section className="section-header">
                <div className="contact">
                    <div className="confirm">            
                        <div className="info">
                            <h3>(공간이름) 팀 등록이 완료되었습니다.</h3>
                            <br/>
                                <div className="conf-item txt">
                                    <div>
                                        <h4>팀 정보</h4>
                                        <hr/>
                                        <div className="wrap">
                                            <p className="ptitle">팀 이름</p>
                                            <p className="ptxt">네모세모동그라미</p>
                                        </div>
                                        <div>
                                            <div className="wrap">
                                                <p className="ptitle">팀 대표자</p>
                                                <p className="pteamtxt">이름</p>
                                                <p className="ptxt">김네모세모동그라미</p>
                                            </div>
                                            <div className="wrap">
                                                <p className="team">학번</p>
                                                <p className="ptxt">20221234</p>
                                            </div>
                                            <div className="wrap">
                                                <p className="team">전화번호</p>
                                                <p className="ptxt">010-1234-5678</p>
                                            </div>
                                            <div className="wrap">
                                                <p className="team">이메일</p>
                                                <p className="ptxt">kimnemosemodongrami@kaist.ac.kr</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div>
                                        <h4>팀원 정보</h4>
                                        <hr/>
                                        <table className="table">
                                            <thead>
                                                <th>#</th>
                                                <th>이름</th>
                                                <th>학번</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>0</td>
                                                    <td>김네모세모동그라미</td>
                                                    <td>20221234</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )};
}

export default Team;