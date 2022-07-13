import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "../css/style.css"
import "../css/bootstrap.min.css"
import "../css/flaticon.css"
class Header extends Component{
    render() {return (
        <header className="main_menu">
        <div className="main_menu_iner">
            <div className="container">
                <div className="row align-items-center ">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
                            <Link to="/" className="navbar-brand"> <img src="/image/logo.png" alt="logo" height="100" width="105"></img> </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse main-menu-item justify-content-center"
                                id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/notice">공지사항</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/introduction">공간위 소개</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown"
                                            role="button" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            공간
                                        </Link>
                
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link className="dropdown-item" to="/space/individual-practice-room">개인연습실</Link>
                                            <Link className="dropdown-item" to="/space/piano-room">피아노실</Link>
                                            <Link className="dropdown-item" to="/space/dance-studio">무예실</Link>
                                            <Link className="dropdown-item" to="/space/group-practice-room">합주실</Link>
                                            <Link className="dropdown-item" to="/space/ullim-hall">울림홀</Link>
                                            <Link className="dropdown-item" to="/space/mirae-hall">미래홀</Link>
                                            <Link className="dropdown-item" to="/space/workshop">창작공방</Link>
                                            <Link className="dropdown-item" to="/space/open-space">오픈스페이스</Link>
                                        </div>
                                    </li>
                                    
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown_1"
                                            role="button" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            문의사항
                                        </Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                                            <Link className="dropdown-item" to="/ask/faq">FAQ</Link>
                                            <Link className="dropdown-item" to="/ask/inquiry">문의하기</Link>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                            <Link to="/mypage">Mypage</Link>&nbsp;&nbsp;&nbsp;
                            <Link to="/manage">Manage</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>
      )};
}

export default Header;