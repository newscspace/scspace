import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component{
    render() {return (
        <footer id="footer" className="footer">

        <div className="footer-content">
          <div className="container">
            <div className="row">
    
              <div className="col-lg-3 col-md-6">
                <div className="footer-info">
                  <h3>학생문화공간위원회</h3>
                  <p>
                  대전광역시 유성구 대학로 291  <br/>
                  한국과학기술원 N13-1 장영신학생회관 309호<br/><br/>
                  평일 상근 19~21시<br/><br/>
                    <strong>Tel:</strong> +82 042-350-0386<br/>
                    <strong>Email:</strong> scspace@kaist.ac.kr<br/>
                  </p>
                </div>
              </div>
    
              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                {/* <ul>
                  <li><i className="bi bi-chevron-right"></i> <Link to="#">Home</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="#">About us</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="#">Services</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="#">Terms of service</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="#">Privacy policy</Link></li> */}
                <h4>바로가기</h4>
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/">메인 페이지</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/introduction">공간위에 관해</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/reservation">예약하기</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/introduction">회칙 및 약관</Link></li>
                </ul>
              </div>
    
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>공간위 공간들</h4>
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/individual-practice-room">개인연습실</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/piano-room">피아노실</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/ullim-hall">울림홀</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/mirae-hall">미래홀</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/seminar-room">세미나실</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/open-space">오픈스페이스</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/group-practice-room">합주실</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/dance-studio">무예실</Link></li>
                  <li><i className="bi bi-chevron-right"></i> <Link to="/space/workshop">창작공방</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    
        <div className="footer-legal text-center">
          <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
    
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <div className="copyright">
                &copy; Copyright <strong><span>학생문화공간위원회</span></strong>. 원본 Herobiz.
              </div>
              <div className="credits">
              
                <a href="https://bootstrapmade.com/">BootstrapMade</a>의 디자인을 변형함.
              </div>
            </div>
    
            <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
              <a href="https://facebook.com/scspace.kaist" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/scspace_kaist/" className="instagram"><i className="bi bi-instagram"></i></a>
            </div>
    
          </div>
        </div>
        

      </footer>)};
}

export default Footer;