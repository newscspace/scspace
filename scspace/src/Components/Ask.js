import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Ask extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div id="main">
            <div  className="breadcrumbs">
              <div  className="container">
                  <div  className="d-flex justify-content-between align-items-center">
                      <h3>문의</h3>
                <ol>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/ask">문의</Link></li>
                </ol>
                </div>
              </div>
            </div> 
            <section>
            <div className="section-header">
                    <h2>문의하기</h2>
                    <p>Ask</p>
            </div>
            
            <hr/>


            <section id="contact" className="contact">
            <div className="container">
      
              <div className="row gy-5 gx-lg-5">
            <div>
            <form action="forms/api/ask" method="post" role="form" className="php-email-form">
            <div className="form-group mt-3">
                <input type="text" className="form-control" name="title" id="title" placeholder="제목" required/>
            </div>
            <div className="form-group mt-3">
                <textarea className="form-control" name="contents" placeholder="문의 내용" required></textarea>
              </div>
              
            <div className="text-center"><button type="submit">제출</button></div>
            </form>
          </div>
          </div>
          </div>
          </section>
          </section>
        </div>
      )};
}

export default Ask;