import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Individual from './reservation_form/Individual-practice-room';
import Piano from './reservation_form/Piano-room';
import Dance from './reservation_form/Dance-studio';
import Group from './reservation_form/Group-practice-room';
import Seminar from './reservation_form/Seminar-room';
import Ullim from './reservation_form/Ullim-hall';
import Mirae from './reservation_form/Mirae-hall';
import Openspace from './reservation_form/Open-space';
import Workshop from './reservation_form/Workshop';

import ReservationNotice from './reservation_form/Reservation-notice';
import LoginCheck from './auth/LoginCheck';

class Reservation extends Component {
  constructor(props) {
    super(props);
   

    this.state = {
      spaceName: 'individual-practice-room',

    }

    LoginCheck()
    .then((result) => {
      if (result === false) this.props.history.push('/login'); 
      else {
        this.setState({login:true, UserInfo:result});
        
        this.spaceTag = {
          'individual-practice-room': <Individual login={true} UserInfo={result} history={this.props.history}/>,
          'piano-room': <Piano login={true} UserInfo={result} history={this.props.history}/>,
          'seminar-room': <Seminar login={true} UserInfo={result} history={this.props.history}/>,
          'group-practice-room': <Group login={true} UserInfo={result} history={this.props.history}/>,
          'dance-studio': <Dance login={true} UserInfo={result} history={this.props.history}/>,
          'ullim-hall': <Ullim login={true} UserInfo={result} history={this.props.history}/>,
          'mirae-hall': <Mirae login={true} UserInfo={result} history={this.props.history}/>,
          'workshop': <Workshop login={true} UserInfo={result} history={this.props.history}/>,
          'open-space': <Openspace login={true} UserInfo={result} history={this.props.history}/>
        }
      }
    })

    this.spaceDict = {
      'individual-practice-room': '개인연습실',
      'piano-room': '피아노실',
      'group-practice-room': '합주실',
      'dance-studio': '무예실',
      'ullim-hall': '울림홀',
      'mirae-hall': '미래홀',
      'seminar-room': '세미나실',
      'workshop': '창작공방',
      'open-space': '오픈스페이스'
    }


  

  }



  render() {
    return (
      <main id="main">
        <div className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h3>예약</h3>
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/reservation">예약</Link></li>
              </ol>
            </div>
          </div>
        </div>
        <section>
          <div className="section-header">
            <h2>{this.spaceDict[this.state.spaceName]}</h2>
            <p>{this.state.spaceName.replace(/-/gi, ' ')}</p>
          </div>

          <hr />

          <section id="portfolio" className="portfolio">
            <div className="container-fluid">
              <div className="portfolio-isotope" >
                <ul className="portfolio-flters">
                  {Object.keys(this.spaceDict).map((space) => {
                    return (
                      <li onClick={() => { this.setState({ spaceName: space}) }}>{this.spaceDict[space]}</li>
                    )
                  }
                  )}
                </ul>
              </div>
            </div>
          </section>

          <section id="contact" className="contact">
            <div className="container">

              <div className="row gy-5 gx-lg-5">

                
                <ReservationNotice/>
                {this.state.login ? this.spaceTag[this.state.spaceName] : (<div/>)}


              </div>
            </div>
          </section>
        </section>
      </main>
    )
  };
}

export default Reservation;