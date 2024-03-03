import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';

function FastNotice(props){
  return(
    <section className="featured-services">
        <div className="container">
          <div className="row gy-4">
            <div className="col-xl-3 col-md-6 d-flex" >
              <div className="service-item position-relative">
                <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                <h4><a href="#" className="stretched-link">학생문화공간위원회 홈페이지 개편</a></h4>
                <p className="newline">홈페이지 사용과 관련 문의사항이 있다면 이메일 혹은 문의하기를 통해 연락해주세요.</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex" >
              <div className="service-item position-relative">
                <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                <h4><a href="https://scspace-public.s3.ap-northeast-2.amazonaws.com/%EC%86%8C%EC%9D%8C+%EC%96%91%ED%95%B4%EC%84%9C.pdf" download className="stretched-link">소음 양해서 양식</a></h4>
                <p className="newline">오픈스페이스 사용 시 신학관 단체들에게 승인을 구해야 합니다. 클릭하면 양식을 다운받을 수 있습니다.</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex" >
              <div className="service-item position-relative">
                <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                <h4><a href="https://scspace-public.s3.ap-northeast-2.amazonaws.com/%EB%AC%BC%ED%92%88+%ED%99%95%EC%9D%B8%EC%84%9C.pdf" download className="stretched-link">물품 대여 공지</a></h4>
                <p className="newline">물품 대여 확인서 작성 후 물품 대여가 가능합니다. 클릭하면 양식을 다운받을 수 있습니다.</p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 d-flex" >
              <div className="service-item position-relative">
                <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                <h4><a href="#" className="stretched-link">홈페이지 버그 관련</a></h4>
                <p className="newline">현재 홈페이지는 베타 버전입니다. 버그가 있다면 메일로 제보해주시면 감사하겠습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}



export default FastNotice;
