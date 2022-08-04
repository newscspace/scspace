import React, {Component} from 'react';
import SpaceInfo from './SpaceInfo';

function Introduction(props){
    const spaceInfo = new SpaceInfo(props.roomCode);
    return (
        <div className="tab-pane fade show active">

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>수용 인원</h4>
            </div>
            <p>{spaceInfo.maxCapacity()}명까지 수용 가능합니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>구비 물품</h4>
            </div>
            <p>{spaceInfo.features}을/를 갖추고 있습니다.</p>

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>사용 가능한 시간</h4>
            </div>
            <p>{spaceInfo.availabilityExplained()} 사용 가능합니다.</p>

        </div>
    )
}

export default Introduction;