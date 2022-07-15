import React, {Component} from 'react';

class Introduction extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <p className="fst-italic">집에 갈래....</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>수용 인원</h4>
            </div>
            <p>3명까지 수용 가능합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>구비 물품</h4>
            </div>
            <p>보면대 및 의자, 공기청정기, 냉난방 시설을 갖추고 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>사용 가능한 시간</h4>
            </div>
            <p>24시간 언제나 사용 가능합니다.</p>

        </div>
    )}
}

export default Introduction;