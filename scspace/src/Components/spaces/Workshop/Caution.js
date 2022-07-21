import React, {Component} from 'react';


class Caution extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <p className="fst-italic">음료와 스낵은 반입 가능하지만 음식 반입은 금지되어 있습니다.<br/>또한, 화기 사용이 금지되어 있으며 타인의 작업물을 훼손하지 않도록 주의하여 주십시오.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>사용자</h4>
            </div>
            <p>KAIST 학내 구성원만 사용 및 예약 사용할 수 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>예약 사용자</h4>
            </div>
            <p>예약 사용자는 KAIST 학내 구성원으로 제한하나, 다음의 경우에는 학생문화공간위원회와의 협의 하에 사용 가능합니다.</p>
            <ul>
                <li>KAIST 학부 총학생회 또는 총학생회 산하 단체가 주최하는 경우</li>
                <li>KAIST 학부 총학생회 회원 전체를 대상으로 열려있는 행사의 경우</li>
                <li>행사의 내용이 KAIST 학생 문화 발전에 기여하는데 도움이 된다고 판단하는 경우</li>
            </ul>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>분실물의 처리</h4>
            </div>
            <p>사용 후 남겨진 분실물은 학생문화공간위원회에서 1달 간 보관합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>화기 제한</h4>
            </div>
            <p>안전을 위해 화기 사용을 금합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>타인 작업물 주의</h4>
            </div>
            <p>타인의 작업물도 소중합니다. 타인의 작업물에 손 대지 말아주세요.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>작업 후 환기</h4>
            </div>
            <p>사용 후에는 창작공방을 환기시켜 주세요.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>작업용 책상 정리</h4>
            </div>
            <p>다른 사람도 기분좋게 쓸 수 있도록, 사용 후에는 작업 책상을 깨끗이 치워 주세요.</p>

        </div>
    )}
}

export default Caution;