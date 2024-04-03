import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LatestReserv from './Reserve/LatestReserve';
import LatestAsk from './Ask/LatestAsk';
import LoginCheck from '../auth/LoginCheck';
import ChangePW from './ChangePW';

class Manage extends Component{

    constructor(props){
         super(props);
        LoginCheck() .then((result) => { 
         if (result === false) this.props.history.push('/login'); 
         else if (result.type === 'admin') this.setState({login:true, UserInfo:result}); 
         else this.props.history.push('/'); })

    }

    render() {return (
        <main id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                    <h3>관리자 페이지</h3>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/manage">관리자 페이지</Link></li>
                    </ol>
                    </div>
                </div>
            </div>

            <LatestReserv/>
            <LatestAsk history={this.props.history}/>
            <ChangePW space="GRP"/>
            <ChangePW space="WS"/>
            
        </main>
      )};
}

export default Manage;
