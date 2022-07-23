import React, {Component} from 'react';

class Scspace extends Component{
    render() {return(
        <section id="features" class="features scspace">
            <div class="container">
                <div className="tab-pane active show">
                    <div className="row gy-4">
                        <div>
                            <h3>학생문화공간위원회</h3>
                            <p><b>
                            KAIST 학생문화공간위원회(이하 공간위)는 장영신학생회관을 비롯한 KAIST 교내 학생 문화공간의
                            총체적인 관리 및 운영을 담당하고 진정한 학생 공간을 위하여 공간에 대한 학생의 권리 보장과
                            학생 문화 발전에 기여하기 위하여 설립된 KAIST 학부 총학생회 산하 상설위원회입니다.
                            </b></p>
                            <p><b>
                            쉽게 말하자면, 공간위는 KAIST 학우들을 위한 학생들의 다양한 문화활동을 지원할 수 있는 
                            공간을 관리하고 기획하는 역할을 하고 있습니다. 이를 위해, 장영신학생회관 건립 전부터 준비위원회로서 
                            학생들의 의견을 수렴하고 반영해 왔으며 앞으로도 KAIST 학우 모두가 함께 문화를 만들어 갈 수 있도록 언제나 
                            학우들의 이야기에 귀를 기울이고 있습니다. 저희와 같이 학생문화를 가꾸어나가고 싶다면 부담 갖지 마시고 이야기를 공유해주세요. 
                            우리 함께 장영신학생회관에서 카이스트만의 문화를 만들어봐요!
                            </b></p>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>팀 소개</h3>
                            <ul>
                                <li><i className="bi bi-check-circle-fill"></i><b className="intro">회계팀</b><br/>
                                <p className="in txtvar">회계, 신학관 내부 재물 관리, 리크루팅 등</p>
                                <p className="in">회계를 비롯해 대학우 사업 운영, 상근 관리, 자료 정리, 리크루팅 등 
                                단체 운영에 필요한 일들을 담당하고 있습니다. 또한 공간위 내 다양한 친목 사업도 기획합니다.</p></li>
                                <li><i className="bi bi-check-circle-fill"></i><b className="intro">디자인팀</b><br/>
                                <p className="in txtvar">디자인, 홍보 포스터 제작</p>
                                <p className="in">디자인과 홍보에 관련된 업무를 담당합니다. 구체적으로는 신학관 내 공간 디자인, 
                                단체 의류 디자인과 구매, 포스터 제작, 페이스북 페이지 컨텐츠 제작 등을 맡고 있습니다.</p></li>
                                <li><i className="bi bi-check-circle-fill"></i><b className="intro">관리팀</b><br/>
                                <p className="in txtvar">개인연습실, 피아노실, 무예실, 다용도실, 세미나실, 합주실, 울림홀, 미래홀 관리</p>
                                <p className="in">울림홀, 미래홀, 합주실 등 장영신 학생회관 내외의 예약과 관리를 담당합니다. 
                                상시 예약 제도를 운영하고, 이용자가 몰리는 공연 집중 기간에는 추첨을 진행하여 모두가 공평하게 
                                학생회관을 이용할 수 있도록 노력하고 있습니다.</p></li>
                                <li><i className="bi bi-check-circle-fill"></i><b className="intro">개발팀</b><br/>
                                <p className="in txtvar">홈페이지, 내부 전산화</p>
                                <p className="in">예약 시스템을 만들고 운영합니다. 기계가 잘 하는 일을 기계에게 맡겨서, 
                                다른 사람들이 더 의미있는 일에 집중할 수 있게 합니다.</p></li>
                            </ul>
                        </div>
                        <hr></hr>
                        <div>
                            <h3>CI 소개</h3>
                            <p className="intro"><b>학생문화공간위원회 CI는 학생, 문화, 그리고 공간의 세 가치를 담았습니다.</b></p>
                            <p>공간위가 추구하는 세 가치의 영문 이니셜 양 끝의 알파벳 S의 형태를 변형함으로써 조형적으로 대칭을 이루는 동시에, 
                                한글 이니셜의 모음 및 받침을 표현하였습니다. 그 주위에 있는 ㅎ, ㅁ, ㄱ 세 자음 글자가 한글 이니셜을 완성하는 구조입니다.</p>
                            <img src="/img/CI.jpg" alt="" className="img-fluid"/>
                            <p><div className="rsquare"></div>RGB (231,49,40)<br/><div className="bsquare"></div>RGB (62,58,57)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )};
}

export default Scspace;