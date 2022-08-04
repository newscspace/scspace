import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Use extends Component{
    render() {return (
        <div className="tab-pane fade show active space">

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>상시 예약</h4>
            </div>
            <p>팀 등록 <Link class="btn-getstarted scrollto" to="/teamcreate">등록하기</Link></p> {/*팀 등록 링크 조정 필요*/}
            <ul>
                <li>예약을 위하여 최소 3인의 팀 등록이 필요합니다.</li>
                <li>팀 등록은 매 정규학기가 끝날 때 초기화됩니다.</li>
            </ul>
            <p>카드키</p>
            <ul>
                <li>대여: 카드키는 사용시간 직전의 상근시간에 공간위실을 방문하여 대여하여야 합니다.</li>
                <li>반납: 사용시간 직후의 상근시간에 공간위실을 방문하거나 무인반납함을 통해 반납하여야<br/>합니다.</li>
            </ul>
            <p>예약 가능 시간</p>
            <ul>
                <li>사용 14일 전부터 이틀 전 오후 11시 59분까지 예약이 가능합니다.</li>
                <li>하루에 최대 3시간 예약할 수 있습니다.</li>
                <li>시험기간 전 주와 시험기간에는 상시 예약이 불가능합니다.</li>
            </ul>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>패널티</h4>
            </div>
            <p>아래와 같은 경우가 발생했을 시 주의를 부과합니다.</p>
            <ul>
                <li>물을 제외한 음식물 및 주류를 반입할 경우</li>
                <li>예약을 취소하지 않고 공간을 사용하지 않을 경우</li>
                <li>예약시간 이외의 시간에 사용할 경우</li>
                <li>뒷정리가 미흡할 경우</li>
            </ul>
            <p>아래와 같은 경우가 발생했을 경고를 부과합니다.</p>
            <ul>
                <li>합주실 내부 설비 고의 파손 및 안전상의 문제를 야기할 수 있는 행위을 할 경우</li>
                <li>그 외 학생문화공간위원회가 타인에게 피해를 주는 행위 혹은 악의적인 행위라고 판단될 경우</li>
                <li>카드키 분실을 반납기한으로부터 1주일 이내에 신고하지 않은 경우</li>
            </ul>
            <p>주의와 경고는 다음과 같이 처리됩니다.</p>
            <ul>
                <li>주의 2회가 누적된 경우, 경고 1회로 대체한다</li>
                <li>경고 1회가 누적된 경우 경고 부과일로부터 30일 동안 해당 공간의 예약이 불가하다. 정기예약의 경우 해당 학기 정기예약이 취소된다</li>
                <li>경고 2회 이상 누적된 경우 경고 부과일로부터 90일 동안 해당 공간의 예약이 불가하다</li>
                <li>경고 및 주의는 매년 봄학기 개강일을 기준으로 초기화된다</li>
            </ul>

        </div>
    )}
}

export default Use;