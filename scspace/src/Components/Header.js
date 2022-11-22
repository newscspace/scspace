import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from './auth/LoginCheck';
import Dropdown from 'react-bootstrap/Dropdown';
import {withTranslation} from "react-i18next";

import '../static/vendor/bootstrap/css/bootstrap.min.css'
import '../static/vendor/bootstrap-icons/bootstrap-icons.css'
import '../static/vendor/aos/aos.css'
import '../static/vendor/glightbox/css/glightbox.min.css'
import '../static/vendor/swiper/swiper-bundle.min.css'
import '../static/css/variables.css'
import '../static/css/main.css'


class Header extends Component{

    constructor(props){
      super(props);
      this.state = {
          /*GNB 메뉴 목록들 */
          menu : [{name:'공지사항', sub_menu:[], menu_link : '/notice', sub_menu_link : []}, 
          {name:'소개', sub_menu:[], menu_link : '/introduction', sub_menu_link : []}, 
          {name:'공간', sub_menu:['개인연습실', '피아노실', '합주실', '무예실', '울림홀', '미래홀', '세미나실','창작공방', '오픈스페이스'], menu_link : '#', sub_menu_link : ['/space/individual-practice-room', '/space/piano-room', '/space/group-practice-room', '/space/dance-studio', '/space/ullim-hall', '/space/mirae-hall', '/space/seminar-room','/space/workshop', '/space/open-space' ]}, 
          {name:'예약', sub_menu:['예약하기', '예약 현황'], menu_link : '#', sub_menu_link : ['/reservation', '/calendar']},
          {name:'문의사항', sub_menu:['FAQ', '문의하기'], menu_link : '#', sub_menu_link : ['/faq', '/ask']},
          {name:'이벤트', sub_menu:[], menu_link: "/event", sub_menu_link: []} ]
        }
      
        LoginCheck()
      .then((result) => {
        if (result !== false) this.setState({login:true, UserInfo:result});
        else this.setState({login:false});
      })

    }


    /* onClickEvent , onClickEvent는 모바일일 떄 햄버거바 표시를 위한 이벤트 함수  */
    onClickEvent = (e) =>{
      document.querySelector('body').classList.toggle('mobile-nav-active');
      document.querySelector('#nav_menu').classList.toggle('bi-list');
      document.querySelector('#nav_menu').classList.toggle('bi-x');
    }
    onClickEvent2 = (idx, e) => {
      document.querySelector('#'+'button'+idx).classList.toggle('bi-chevron-up');
      document.querySelector('#'+'button'+idx).classList.toggle('bi-chevron-down');
      document.querySelector('#'+'ul'+idx).classList.toggle('dropdown-active');

    }
    render() {
      const {t} = this.props;

      return (
      <header id="header" className="header fixed-top" data-scrollto-offset="0">
      <div className="container-fluid d-flex align-items-center justify-content-between">
  
        <Link to="/" className="logo d-flex align-items-center scrollto me-auto me-lg-0">
          <img src="/img/logo.svg" alt=""/>
          <h1>         </h1>
        </Link>
  
        <nav id="navbar" className="navbar">
          <ul>
            {
              this.state.menu.map((menu, idx) =>{
                return (menu.sub_menu.length === 0
                  ? (<li keys={idx}><Link className="nav-link scrollto" to={menu.menu_link}>{t(menu.name)}</Link></li>) 
                  : (<li keys = {idx} className="dropdown megamenu" onClick={this.onClickEvent2.bind(this, idx)}><Link to={menu.menu_link}><span>{t(menu.name)}</span> <i id={"button"+idx}className="bi bi-chevron-down dropdown-indicator" ></i></Link>
                  <ul id={"ul"+idx}className="">
                    <li>
                      {menu.sub_menu.map((sub_name, idx2) => {
                        return (<Link to={menu.sub_menu_link[idx2]}>{t(sub_name)}</Link>)
                      })}
                    </li>
                  </ul>
                </li>
                ))
              })

            }
          </ul>
        </nav>

        <i id='nav_menu' className="bi bi-list mobile-nav-toggle d-none" onClick={this.onClickEvent.bind(this)}>{/* 햄버거바 */}</i>
        
        {this.state.login === true ? 
        (
            <Dropdown >
              <Dropdown.Toggle className="btn-getstarted scrollto" id="dropdown-basic">
                {this.state.UserInfo.name}님
              </Dropdown.Toggle>
        
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/mypage">Mypage</Dropdown.Item>
                {this.state.UserInfo.type === 'admin' ? (<Dropdown.Item as={Link} to="/manage">Manage</Dropdown.Item>) : (<div></div>)}
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
            
              </Dropdown.Menu>
            </Dropdown>
          )
        
        
        : (<Link className="btn-getstarted scrollto" to="/login">Login</Link>)}
        
      </div>
    </header>
  
      )};
}

export default withTranslation()(Header);

