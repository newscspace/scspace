import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Reservation from './Reservation';
import Team from './Team';
import LoginCheck from '../auth/LoginCheck';

class Mypage extends Component{
    constructor(props){
        super(props);

        this.state = {
            login:false,
            UserInfo : {}
        }
        
        LoginCheck()
    .then((result) => {
      if (result === false) this.props.history.push('/login'); 
      else {
        this.setState({login:true, UserInfo:result});
      }})
    }

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

            {this.state.login ? (<Reservation  history={this.props.history}/>) : (<div/>) }
            <Team history={this.props.history}/>

        </main>
      )};
}

export default Mypage;