import React, {Component} from 'react';
import "../css/style.css"
import "../css/bootstrap.min.css"
import "../css/flaticon.css"

class Footer extends Component{
    render() {return (
        
        <footer className="footer-area">
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-sm-6 col-md-5">
                    <div className="single-footer-widget">
                        <h4>KAIST 학생문화공간위원회</h4>
                        <ul>
                            <li><a href="#">무엇을 쓸까요오오오</a></li>

                        </ul>

                    </div>
                </div>
                <div className="col-sm-6 col-md-4">
                    <div className="single-footer-widget">
                    
                    </div>
                </div>
                <div className="col-sm-6 col-md-3">
                    <div className="single-footer-widget footer_icon">
                        <h4>Contact Us</h4>
                        <p>대전광역시 유성구 대학로 291 한국과학기술원 N13-1 장영신학생회관 309호
                            <br></br><br></br>+82 042-350-0386
                            <br></br>scspace.kaist@gmail.com</p>
                        
                    </div>
                </div>
            </div>
           
        </div>
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="copyright_part_text text-center">
                        <p className="footer-text m-0">
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved 
</p>
                    </div>
                </div>
            </div>
        </div>

    </footer>
      )};
}

export default Footer;