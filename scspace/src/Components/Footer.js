import React, {Component} from 'react';


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
                  <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">About us</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">Services</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li> */}
                <h4>바로가기</h4>
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">메인 페이지</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">공간위에 관해</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">예약하기</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">공긴에 대하여</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">회칙 및 약관</a></li>
                </ul>
              </div>
    
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>공간위 공간들</h4>
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">개인연습실</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">피아노실</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">울림홀</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">미래홀</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">세미나실</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">오픈스페이스</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">합주실</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="#">무예실</a></li>
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