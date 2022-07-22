import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {BsBuilding} from "react-icons/bs";
import {MdPeopleOutline} from "react-icons/md";
import {MdOutlineFestival} from "react-icons/md";
import {FaGuitar} from "react-icons/fa";
import Shinhak from "./Shinhak";
import Student from "./Student";
import Culture from "./Culture";
import Guitar from "./Guitar";
 
class Business extends Component{
    constructor(props) {
        super();
        this.state = {
          menu: 0,
          menulist : {
            0: <Shinhak/>,
            1: <Student/>,
            2: <Culture/>,
            3: <Guitar/>,
          }
        }
      }
    
    changeMenu = (menuIndex) =>{
        document.querySelector("#menu"+this.state.menu).classList.toggle('active');
        document.querySelector("#menu"+menuIndex).classList.toggle('active');
        this.setState({menu: menuIndex});
    }

    render() {return (
        <section id="features" class="features">
            <div class="container">
              
                <div className="business">
                    <h5>학생문화공간위원회는 학생문화 증진을 위해 여러 가지 활동을 하고 있습니다.<br/>
                        크게 3가지 분야로 나누어본다면 신학관 관리, 학생활동 지원, 문화사업 기획이 있습니다.<br/>
                        공간관리와 학생활동 지원, 문화사업 기획 등의 능동적인 학생문화 창출을 하며 카이스트 내에 올바른 학생문화가 정착할 수 있도록 하고 있습니다.</h5>
                    <ul class="nav nav-tabs row gy-4 d-flex">
                        <li onClick={() => this.changeMenu(0)} className="nav-item col-6 col-md-4 col-lg-2 nav-link active show" id="menu0">
                            {/* <i class="bi bi-binoculars color-cyan"></i> */}
                            <BsBuilding size="30" className="color-cyan"/>
                            <h4>신학관<br/>관리</h4>
                        </li>
                        <li onClick={() => this.changeMenu(1)} className="nav-item col-6 col-md-4 col-lg-2 nav-link" id="menu1">
                            {/* <i class="bi bi-box-seam color-indigo"></i> */}
                            <MdPeopleOutline size="30" className="color-indigo"/>
                            <h4>학생활동<br/>지원</h4>
                        </li>
                        <li onClick={() => this.changeMenu(2)} className="nav-item col-6 col-md-4 col-lg-2 nav-link" id="menu2">
                            {/* <i class="bi bi-brightness-high color-teal"></i> */}
                            <MdOutlineFestival size="30" className="color-orange"/>
                            <h4>문화사업<br/>기획</h4>
                        </li>
                        <li onClick={() => this.changeMenu(3)} className="nav-item col-6 col-md-4 col-lg-2 nav-link" id="menu3">
                            {/* <i class="bi bi-command color-red"></i> */}
                            <FaGuitar size="30" className="color-teal"/>
                            <h4>기타<br/>업무</h4>
                        </li>
                        {/* <li onClick={() => this.changeMenu(4)} className="nav-item col-6 col-md-4 col-lg-2 nav-link" id="menu4">
                            <i class="bi bi-easel color-blue"></i>
                            <h4>Adipiscing</h4>
                        </li>
                        <li onClick={() => this.changeMenu(5)} className="nav-item col-6 col-md-4 col-lg-2 nav-link" id="menu5">
                            <i class="bi bi-map color-orange"></i>
                            <h4>Reprehit</h4>
                        </li> */}
                    </ul>
                </div>

                <div className="tab-content">
                    {this.state.menulist[this.state.menu]}
                </div>

            </div>
  
      </section>
      )};
}

export default Business;