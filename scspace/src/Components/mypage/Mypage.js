import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Reservation from './Reservation';
import Team from './Team';


class Mypage extends Component{
    render() {return (
        <main id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                    <h3>마이페이지</h3>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/mypage">마이페이지</Link></li>
                    </ol>
                    </div>
                </div>
            </div>

            <Reservation/>
            <Team/>

        </main>
      )};
}

export default Mypage;