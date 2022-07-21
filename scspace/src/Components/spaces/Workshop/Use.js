import React, {Component} from 'react';


class Use extends Component{
    render() {return (
        <div className="tab-pane fade show active space">

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>상시 개방</h4>
            </div>
            <p>창작공방은 예약이 없을 땐 누구나 사용 가능합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>상시 예약</h4>
            </div>
            <p>사용 14일 전부터 하루 전 오후 11시 59분까지 예약이 가능합니다.<br/>
                하루에 최대 3시간 예약할 수 있습니다.<br/>
                기험기간 전 주와 시험기간에는 상시 예약이 불가능합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>패널티</h4>
            </div>
            <p>아래와 같은 경우가 발생했을 시 주의를 부과합니다.</p>
            <ul>
                <li>음료나 간단한 스낵을 제외한 음식물 및 주류를 반입할 경우</li>
                <li>예약을 취소하지 않고 공간을 사용하지 않을 경우</li>
                <li>뒷정리가 미흡할 경우</li>
            </ul>
            <p>아래와 같은 경우가 발생했을 경고를 부과합니다.</p>
            <ul>
                <li>예약과 실제 사용 내용이 다를 경우</li>
                <li>창작공방 내부 설비 고의 파손 및 안전상의 문제를 야기할 수 있는 행위을 할 경우</li>
                <li>그 외 학생문화공간위원회가 타인에게 피해를 주는 행위 혹은 악의적인 행위라고 판단될 경우</li>
            </ul>
            <p>주의와 경고는 다음과 같이 처리됩니다.</p>
            <ul>
                <li>주의 2회가 누적된 경우, 경고 1회로 대체한다</li>
                <li>경고 1회가 누적된 경우 경고 부과일로부터 30일 동안 해당 공간의 예약이 불가하다. 정기예약의 경우 해당 학기 정기예약이 취소된다</li>
                <li>경고 2회 이상 누적된 경우 경고 부과일로부터 90일 동안 해당 공간의 예약이 불가하다</li>
                <li>경고 및 주의는 매년 봄학기 개강일을 기준으로 초기화된다</li>
            </ul>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>정기 사물함 신청</h4>
            </div>
            <p>매 홀수달 셋째 주 월요일 선착순으로 사물함 사용 신청을 받습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>작업물의 보관</h4>
            </div>
            <p>작업이 끝나지 않아 창작공방에 계속해서 보관해야 할 경우에는, 이름과 연락처, 보관 기한, 작업물을 적어서 작업물에 붙여 주시면 최대 7일간 보관이 가능합니다.</p>

        </div>
    )}
}

export default Use;