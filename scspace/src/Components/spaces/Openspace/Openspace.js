import React, {Component} from 'react';
import Introduction from './Introduction';
import Use from './Use';
import Caution from './Caution';

class Openspace extends Component{
  constructor(props) {
    super();
    this.state = {
      menu: 0,
      menulist : {
        0: <Introduction />,
        1: <Use />,
        2: <Caution />
      }
    }
  }

  changeMenu = (menuIndex) =>{
    document.querySelector("#menu"+this.state.menu).classList.toggle('active');
    document.querySelector("#menu"+menuIndex).classList.toggle('active');
    this.setState({menu: menuIndex});
  }

  render() {
    return (
      <div>
        <section id="about" className="about">
          
          <div className="container">

            <div className="row g-4 g-lg-5" data-aos-delay="200">
              

              <div className="col-lg-5">
                <div className="about-img">
                  <img src="/img/open-space.jpg" className="img-fluid" alt=""/>
                </div>
              </div>

              <div className="col-lg-7">
                <h3 className="pt-0 pt-lg-5">전시와 공연을 위해 열려있는 공간입니다.</h3>

                <ul className="nav nav-pills mb-3">
                  <li onClick={() => this.changeMenu(0)} className="nav-link active" id="menu0">소개</li>
                  <li onClick={() => this.changeMenu(1)} className="nav-link" id="menu1">사용방법</li>
                  <li onClick={() => this.changeMenu(2)} className="nav-link" id="menu2">주의사항</li>
                </ul>

                <div className="tab-content">
                  {this.state.menulist[this.state.menu]}
                </div>

              </div>

            </div>

          </div>
        </section>     
      </div>
    )};
}

export default Openspace;