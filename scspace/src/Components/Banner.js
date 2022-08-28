import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {BsCalendarEventFill} from 'react-icons/bs';

class Banner extends Component{
    render() {return (
      
  <section className="hero-static d-flex align-items-center">
  <div id="mount" className="container d-flex flex-column justify-content-center align-items-center text-center position-relative">
    <img src='./img/logo.svg' alt="" className="img-fluid main-photo"/>
    <br/>
    <p>학생문화공간위원회 홈페이지에 오신걸 환영합니다.</p>
    <div className="d-flex">
      <Link to="/reservation" className="btn-get-started scrollto">예약하기</Link>
      <Link to="/calendar" className="btn-get-started2">예약현황</Link>
    </div>
  </div>
</section>
      )};
}

export default Banner;