import React, {Component} from 'react';

class Student extends Component{
    render() {return (
        <div className="tab-pane active show">
            <div className="row gy-4">
                <div className="col-lg-8 order-2 order-lg-1">
                <h3>학생활동 지원</h3>
                <p><b>
                학생들이 문화활동을 할 수 있도록 지원하는 것도 공간위의 사업입니다. 
                모든 공간에 대하여 축제나 행사 때 공간을 차질없이 사용할 수 있도록 상시적으로 예약처리와 조율을 하고 있고,
                전시같은 활동도 전시 보조도구를 대여해줌으로써 학생들이 하고자 하는 일에 어려움이 없도록 하고 있습니다. 
                그 뿐만 아니라 이색강좌와 리더십 수업을 위한 공간제공, 정기 예약등을 진행했습니다.
                </b></p>
                <ul>
                    <li><i className="bi bi-check-circle-fill"></i><b>상시 업무</b><br/><p className="in">예약처리와 주율, 전시 보조도구 대여</p></li>
                    <li><i className="bi bi-check-circle-fill"></i><b>정기 업무</b><br/><p className="in">창작공방 사물함 관리, 이색강좌와 리더십 수업 협의, 정기 예약 협의</p></li>
                    <li><i className="bi bi-check-circle-fill"></i><b>비정기 업무</b><br/><p className="in">공간 사용규칙 제/개정, 게시물 부착규정 제/개정</p></li>
                </ul>
                </div>
                <div className="col-lg-4 order-1 order-lg-2 text-center">
                    <img src="/img/business-2.jpg" alt="" className="img-fluid"/>
                </div>
            </div>
        </div>
      )};
}

export default Student;