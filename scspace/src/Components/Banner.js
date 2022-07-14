import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';

class Banner extends Component{
    render() {return (
      
  <section id="hero-static" className="hero-static d-flex align-items-center">
  <div id="mount" className="container d-flex flex-column justify-content-center align-items-center text-center position-relative">
    <h2>Welcome to <span>Scspace</span></h2>
    <p>학생문화공간위원회 홈페이지에 오신걸 환영합니다.</p>
    <div className="d-flex">
      <Link to="/reservation" className="btn-get-started scrollto">예약하기</Link>
      <a href="https://www.youtube.com/watch?v=sW9kJ0fOKWY" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>KAIST</span></a>
    </div>
  </div>
</section>
      )};
}

export default Banner;