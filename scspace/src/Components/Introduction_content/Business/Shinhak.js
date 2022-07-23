import React, {Component} from 'react';

class Shinhak extends Component{
    render() {return (
        <div className="tab-pane active show">
            <div className="row gy-4">
                <div className="col-lg-8 order-2 order-lg-1">
                <h3>신학관 관리</h3>
                <p><b>
                신학관 관리는 공간위의 가장 중요한 업무라고 할 수 있습니다.
                신학관에는 학생들이 문화를 즐길 수 있는 많은 공간이 있습니다.
                그런 공간을 효율적으로 사용할 수 있도록 상시적으로 시설 수리나 신학관 순찰을 통해 관리하고 있고,
                한학기에 한번 대청소를 통해 신학관을 깨끗하게 유지하고 있습니다. 간혹 비정기적으로 들어오는 업무에 대해서도 매일 상근을 통해 빠르게 처리하고 있습니다.
                </b></p>
                <ul>
                    <li><i className="bi bi-check-circle-fill"></i><b>상시 업무</b><br/><p className="in">시설수리와 비품 보충, 신학관 순찰, 재물조사</p></li>
                    <li><i className="bi bi-check-circle-fill"></i><b>정기 업무</b><br/><p className="in">신학관 대청소, 근로장학생 관리</p></li>
                    <li><i className="bi bi-check-circle-fill"></i><b>비정기 업무</b><br/><p className="in">피아노 관리</p></li>
                </ul>
                </div>
                <div className="col-lg-4 order-1 order-lg-2 text-center">
                    <img src="/img/business-1.jpg" alt="" className="img-fluid"/>
                </div>
            </div>
        </div>
      )};
}

export default Shinhak;