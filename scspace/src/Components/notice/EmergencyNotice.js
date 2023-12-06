import React from 'react';

const EmergencyNotice = (props) => {
    console.log(props.isLJM)
    return(
        <div class="emernotice-container">
            <p>회칙에 의해, 12월 4일 ~ 12월 15일 세미나실의 예약이 불가능합니다.</p>
            {props.isLJM ? <p>꼬와씨발람아?</p> : <p>사용자 여러분의 양해 부탁드립니다.</p>}
        </div>
    )
}

export default EmergencyNotice;