import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import NoticeList from './NoticeList';
class Notice extends Component{
    render() {return (
        <main id="main">
        <div  className="breadcrumbs">
          <div  className="container">
            <div  className="d-flex justify-content-between align-items-center">
              <h3>공지사항</h3>
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/notice">공지사항</Link></li>
              </ol>
            </div>
          </div>
        </div>
        <section>
          
            <div  className="section-header">
              <h2>공지사항</h2>
              <p>Notice</p>
            
            <hr></hr>
            <section id="portfolio"  className="portfolio">
              <div className="container-fluid">

                <div  className="portfolio-isotope" >
                      <div>
                        <NoticeList></NoticeList>
                      </div>                   
              </div>
          </div>
        </section>
            
          </div>
        </section>
      </main>
      )};
}

export default Notice;