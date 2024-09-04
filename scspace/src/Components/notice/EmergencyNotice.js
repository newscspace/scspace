import React from "react";

const EmergencyNotice = () => {
  return (
    <div class="emernotice-container">
      <p>사이트 장애 발생으로 인해, 복구 작업 중입니다...</p>
      <p> 9/8(일)까지 처리하겠습니다. </p>
      <p> 불편을 드림에 사과드립니다.</p>
      <p>
        {" "}
        해당 기간까지 예약은 공간위 메일 scspace.kaist@gmail.com 으로 메일
        보내주세요.{" "}
      </p>
      <p> 예약은 다음 링크에서 확인하실 수 있습니다. </p>
      <a href="https://bit.ly/scspace-reservationlist">
        {" "}
        https://bit.ly/scspace-reservationlist{" "}
      </a>
    </div>
  );
};

export default EmergencyNotice;
