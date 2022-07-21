import React, {Component} from 'react';

class Introduction extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>수용 인원</h4>
            </div>
            <p>3명 이상* 부터 5명까지 수용 가능합니다.<br/>(* 3인 이하의 연습은 개인연습실을 이용해주시기 바랍니다.)</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>구비 물품</h4>
            </div>
            <p>키보드, 드럼, 베이스용/일렉용 앰프, 마이크, 마이크스탠드, 책상, 의자, 보면대,<br/>캐논잭/55잭 케이블, 파워드 믹서를 구비하고 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>사용 가능한 시간</h4>
            </div>
            <p>예약자에 한해 24시간 언제나 사용 가능합니다.</p>

        </div>
    )}
}

export default Introduction;