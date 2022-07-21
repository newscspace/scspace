import React, {Component} from 'react';

class Introduction extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <p className="fst-italic">집에 갈래....</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>수용 인원</h4>
            </div>
            <p>20명까지 수용 가능합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>구비 물품</h4>
            </div>
            <p>드라이버, 톱 등의 공구, 제봉틀 및 관련 용구, 이젤 및 화방 용구, 라이트박스, 빔 프로젝터와 스피커, 화이트보드, 수도 시설, 사물함을 갖추고 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>사용 가능한 시간</h4>
            </div>
            <p>24시간 언제나 사용 가능합니다.</p>

        </div>
    )}
}

export default Introduction;