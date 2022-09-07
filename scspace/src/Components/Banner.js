import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {withTranslation} from "react-i18next";

class Banner extends Component{
  constructor(props){
    super(props);
  }
    render() {
      const {t} = this.props;
      return (
      
  <section className="hero-static d-flex align-items-center">
  <div className="container d-flex flex-column justify-content-center align-items-center text-center position-relative">
    <img src='/img/logo.svg' alt="" className="img-fluid main-photo"/>
    <br/>
    <p>{t('학생문화공간위원회 홈페이지에 오신 것을 환영합니다.')}</p>
    <div className="d-flex">
      <Link to="/reservation" className="btn-get-started scrollto">{t('예약하기')}</Link>
      <Link to="/calendar" className="btn-get-started2">{t('예약 현황')}</Link>
    </div>
  </div>
</section>
      )};
}

export default withTranslation()(Banner);