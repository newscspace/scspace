import React, {Component} from 'react';


class Caution extends Component{
    render() {return (
        <div className="tab-pane fade show active space">

            <p className="fst-italic">음료, 스낵, 음식 반입이 금지되어 있습니다.<br/>또한, 장비 파손에 주의하여 주십시오.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>예약 사용자</h4>
            </div>
            <p>예약 사용자는 KAIST 학내 구성원으로 제한하나, 다음의 경우에는 학생문화공간위원회와의 협의 하에 사용 가능합니다.</p>
            <div className="space">
                <ul>
                    <li>KAIST 학부 총학생회 또는 총학생회 산하 단체가 주최하는 경우</li>
                    <li>KAIST 학부 총학생회 회원 전체를 대상으로 열려있는 행사의 경우</li>
                    <li>행사의 내용이 KAIST 학생 문화 발전에 기여하는데 도움이 된다고 판단하는 경우</li>
                </ul>
            </div>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>목적의 제한</h4>
            </div>
            <p>다음의 경우 사용이 불가능합니다. 자세한 사항은 문의해주시기 바랍니다.</p>
            <ul>
                <li>정치, 종교적인 행사 및 행위</li>
                <li>열리를 목적으로 하는 행사 및 행위</li>
                <li>공공질서와 미풍양속을 해칠 우려가 있는 행사 및 행위</li>
                <li>시설 또는 설비의 관리에 지장을 줄 수 있는 행사 및 행위</li>
            </ul>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>패널티</h4>
            </div>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>예약과 불일치</h4>
            </div>
            <p>예약과 실제 사용이 다를 경우 예약 제한 등의 패널티가 부과됩니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>분실물의 처리</h4>
            </div>
            <p>사용 후 남겨진 분실물은 학생문화공간위원회에서 1달 간 보관합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>정리정돈</h4>
            </div>
            <p>KAIST 학생 모두가 사용하는 공간입니다. 사용 후에는 주변을 정리정돈해 주시기 바랍니다.</p>

        </div>
    )}
}

export default Caution;