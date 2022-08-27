import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withTranslation} from "react-i18next";

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
      spaceName: this.props.location.state ? this.props.location.state.space.replace(/[0-9]/g, '') : 'individual-practice-room',

    }

    LoginCheck()
    .then((result) => {
      if (result === false) this.props.history.push('/login'); 
      else {
        this.setState({login:true, UserInfo:result});
        
        this.spaceTag = {
          'individual-practice-room': <Individual login={true} UserInfo={result} history={this.props.history} reserveData={this.props.location.state}/>,
          'piano-room': <Piano login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>,
          'seminar-room': <Seminar login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>,
          'group-practice-room': <Group login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>,
          'dance-studio': <Dance login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>,
          'ullim-hall': <Ullim login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>,
          'mirae-hall': <Mirae login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>,
          'workshop': <Workshop login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>,
          'open-space': <Openspace login={true} UserInfo={result} history={this.props.history}  reserveData={this.props.location.state}/>
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
    const {t} = this.props;

    return (
      <main id="main">
        <div className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h3>{t('예약')}</h3>
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/reservation">{t('예약')}</Link></li>
              </ol>
            </div>
          </div>
        </div>
        <section>
          <div className="section-header">
            <h2>{t(this.spaceDict[this.state.spaceName])}</h2>
            <p>{this.state.spaceName.replace(/-/gi, ' ')}</p>
          </div>

          <hr />

          <section id="portfolio" className="portfolio">
            <div className="container-fluid">
              <div className="portfolio-isotope" >
                <ul className="portfolio-flters">
                  {Object.keys(this.spaceDict).map((space) => {
                    return (
                      <li onClick={() => { this.setState({ spaceName: space}) }}>{t(this.spaceDict[space])}</li>
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

export default withTranslation()(Reservation);