import React, {Component} from 'react';


class Use extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>상시 예약</h4>
            </div>
            <p>오픈 스페이스는 행사 45일 전부터 7일 전 오후 9시까지 예약이 가능합니다. </p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>소음에 대한 양해서</h4>
            </div>
            <p>기획하고 있는 행사가 큰 소리를 낸다면 미리 장영신학생회관 내부의 단체들에게 서명을 받아야합니다.</p>
            {/* 양식 다운로드 버튼 필요 */}

        </div>
    )}
}

export default Use;