import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpaceInfo from './spaces/SpaceInfo';
import Room from './spaces/Room';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.space_list = ['Individual_practice_room', 'Piano_room', 'Dance_studio', 'Seminar_room', 'Group_practice_room', 'Ullim_hall', 'Mirae_hall', 'Open_space', 'Workshop'];
    //this.space_list = ['개인연습실', '피아노실', '무예실', '합주실','세미나실', '울림홀', '미래홀', '창작공방', '오픈스페이스' ];
    this.state = {
      spaceName: 'Individual_practice_room',

      space: {
        Individual_practice_room: '개인연습실',
        Piano_room: '피아노실',
        Seminar_room: '세미나실',
        Group_practice_room: '합주실',
        Dance_studio: '무예실',
        Ullim_hall: '울림홀',
        Mirae_hall: '미래홀',
        Workshop: '창작공방',
        Open_space: '오픈스페이스'
      },
      spaceInfo: new SpaceInfo('Individual_practice_room'),
      /*유의 사항*/
      notice: [
        { title: '1', contents: '2' },
        { title: '3', contents: '4' },
        { title: '5', contents: '6' }
      ]
    }


  }
  /*예약 수정시 백엔드에 요청해서 기존 에약 내역 받아와서 state.form에 넣는 기능 구현해야함, 이때 props로 <Form1>태그에 전달하면 Form1.js에서 처리하게 하면 될듯*/
  /*Form1이요..? 이름 제대로 해주세요ㅠㅠ*/
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
            <h2>{this.state.space[this.state.spaceName]}</h2>
            <p>{this.state.spaceName.replace(/_/gi, ' ')}</p>
          </div>

          <hr />

          <section id="portfolio" className="portfolio">
            <div className="container-fluid">
              <div className="portfolio-isotope" >
                <ul className="portfolio-flters">
                  {this.space_list.map((space) => {
                    return (
                      <li onClick={() => { this.setState({ spaceName: space, spaceInfo: new SpaceInfo(space) }) }}>{this.state.spaceInfo.roomname}</li>
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

                <div className="col-lg-4">

                  <div className="info">
                    <h3>유의사항</h3>
                    <p>유의사항을 잘 읽어주시면 굉장히 감사하겠네요</p>
                    {this.state.notice.map((contents, idx) => {
                      return (
                        <div className="info-item d-flex">
                          <div>
                            <h4>{contents.title}</h4>
                            <p>{contents.contents}</p>
                          </div>
                        </div>
                      )
                    }
                    )}

                  </div>
                </div>

                <Room roomCode={this.state.spaceInfo.roomcode}/>


              </div>
            </div>
          </section>
        </section>
      </main>
    )
  };
}

export default Reservation;