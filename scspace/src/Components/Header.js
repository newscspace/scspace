import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
          menu : [{name:'공지사항', sub_menu:[], menu_link : '/notice', sub_menu_link : []}, 
          {name:'소개', sub_menu:[], menu_link : '/introduction', sub_menu_link : []}, 
          {name:'공간', sub_menu:['개인연습실', '피아노실', '합주실', '무예실', '울림홀', '미래홀', '창작공방', '오픈스페이스'], menu_link : '#', sub_menu_link : ['/space/individual-practice-room', '/space/piano-room', '/space/group-practice-room', '/space/dance-studio', '/space/ullim-hall', '/space/mirae-hall', '/space/workshop', '/space/open-space' ]}, 
          {name:'예약', sub_menu:['예약하기', '예약 현황'], menu_link : '#', sub_menu_link : ['/reservation', '/calender']},
          {name:'문의사항', sub_menu:['FAQ', '문의하기'], menu_link : '#', sub_menu_link : ['/ask/faq', '/ask/ask']} ], 
          
        }
    }

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
    render() {return (
      <header id="header" className="header fixed-top" data-scrollto-offset="0">
      <div className="container-fluid d-flex align-items-center justify-content-between">
  
        <Link to="/" className="logo d-flex align-items-center scrollto me-auto me-lg-0">
          
          <img src="assets/img/logo.png" alt=""/>
          <h1>Scspace<span>.</span></h1>
        </Link>
  
        <nav id="navbar" className="navbar">
          <ul>
  
            {
              this.state.menu.map((menu, idx) =>{
                return (menu.sub_menu.length === 0
                  ? (<li keys={idx}><Link className="nav-link scrollto" to={menu.menu_link}>{menu.name}</Link></li>) 
                  : (<li keys = {idx} className="dropdown megamenu" onClick={this.onClickEvent2.bind(this, idx)}><Link to={menu.menu_link}><span>{menu.name}</span> <i id={"button"+idx}className="bi bi-chevron-down dropdown-indicator" ></i></Link>
                  <ul id={"ul"+idx}className="">
                    <li>
                      {menu.sub_menu.map((sub_name, idx2) => {
                        return (<Link to={menu.sub_menu_link[idx2]}>{sub_name}</Link>)
                      })}
                    </li>
                  </ul>
                </li>
                ))
              })

            }
          </ul>
          <i id='nav_menu' className="bi bi-list mobile-nav-toggle d-none" onClick={this.onClickEvent.bind(this)}>
            
          </i>
        </nav>
          
        <Link className="btn-getstarted scrollto" to="index.html#about">Login</Link>
  
      </div>
    </header>
  
      )};
}

export default Header;