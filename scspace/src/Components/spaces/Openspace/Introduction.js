import React, {Component} from 'react';

class Introduction extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <p className="fst-italic">오픈스페이스는 전시계단, 커뮤니티 마당, 옥상, 미디어 스페이스, 2층 로비, 3층 로비, 모임터로 이루어져 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>전시계단</h4>
            </div>
            <p>미술품 전시부터 사진전까지. 다양한 전시를 구경 할 수 있습니다.<br/>
                계단 난간쪽으로는 미디어 스페이스에서 이어지는 다양한 홍보물부터 자보를 구경할 수 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>커뮤니티 마당</h4>
            </div>
            <p>커뮤니티 마당은 장영신학생회관의 마당입니다.<br/>
                밴드의 버스킹과 야외 뮤지컬, 음악회 등 다양한 행사가 열립니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>옥상</h4>
            </div>
            <p>때로는 옥상에 올라와 지친 마음을 달래세요.<br/>
                은은한 조명과 의자, 멋진 풍경이 준비되어있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>미디어 스페이스</h4>
            </div>
            <p>교내의 소식부터 교외의 소식까지. 인쇄 매체부터 영상 매체까지.<br/>
                다양한 정보를 접할 수 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>2층 로비</h4>
            </div>
            <p>친구, 연인과 얘기를 나누고 때로는 전시를 구경하며 지친 마음을 달래세요.<br/>
                다양한 전시와 의자가 준비되어있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>3층 로비</h4>
            </div>
            <p>세미나실에서 미처 끝내지 못한 얘기를 로비에서 자유롭게 얘기하고 가세요.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>모임터</h4>
            </div>
            <p>밝게 웃으며 서로 얼굴을 마주 보고 토론과 담소를 나누세요.<br/>
                가끔은 혼자 앉아 생각도 하며 잠시 쉬어가세요.</p>

        </div>
    )}
}

export default Introduction;