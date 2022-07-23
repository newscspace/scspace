import React, {Component} from 'react';

class Guitar extends Component{
    render() {return (
        <div className="tab-pane active show">
            <div className="row gy-4">
                <div className="col-lg-8 order-2 order-lg-1">
                <h3>기타 업무</h3>
                <p><b>
                학생문화공간위원회에서 하는 업무들은 아래와 같습니다.
                </b></p>
                <ul>
                    <li><i className="bi bi-check-circle-fill"></i><b>상시 업무</b><br/><p className="in">사무실 상근, 분실문 관리, 합주실 팀 관리, CCTV열람 관리</p></li>
                    <li><i className="bi bi-check-circle-fill"></i><b>정기 업무</b><br/><p className="in">신학관 반상회</p></li>
                    <li><i className="bi bi-check-circle-fill"></i><b>비정기 업무</b><br/><p className="in">모임터 사석화 방지</p></li>
                </ul>
                </div>
                <div className="col-lg-4 order-1 order-lg-2 text-center">
                    <img src="/img/features-1.svg" alt="" className="img-fluid"/> {/*이미지 수정 해야함*/}
                </div>
            </div>
        </div>
      )};
}

export default Guitar;