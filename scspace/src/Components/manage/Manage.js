import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LatestReserv from './LatestReserve';
import LatestAsk from './LatestAsk';


class Manage extends Component{
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
            
        </main>
      )};
}

export default Manage;