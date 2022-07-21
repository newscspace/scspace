import React, {Component} from 'react';


class Caution extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <p className="fst-italic">음료, 스낵, 음식 반입이 금지되어 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>사용자</h4>
            </div>
            <p>KAIST 학내 구성원만 사용 및 예약 사용할 수 있습니다.</p>

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