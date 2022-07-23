import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CreateTeam extends Component{
  constructor(props){
      super(props);

      this.state = {
        teamdata :[

        ]
      }
  }

  render() {

    return (
      <main id="main">
        <div className="breadcrumbs">
          <div  className="container">
            <div  className="d-flex justify-content-between align-items-center">
              <h3>팀 등록</h3>
              <ol>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/CreateTeam">팀 등록</Link></li>
              </ol>    
            </div>
          </div>
        </div>

        <section>
        <section id="cta" class="cta">
        <div class="container aos-init aos-animate" data-aos="zoom-out">

        <div class="row g-5">

          <div class="col-lg-8 col-md-6 content d-flex flex-column justify-content-center order-last order-md-first">
            <h2>팀 등록</h2>
            <hr></hr>
            
            <p></p>
            <div class="col-lg-8">
            <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <input style={{border:"none"}} type="text" name="name" class="form-control" id="name" placeholder="팀 이름" required=""></input>
              <p></p>
              <div class="row">
                <div class="col-md-6 form-group">
                  <input style={{border:"none"}} type="text" name="name" class="form-control" id="name" placeholder="팀 멤버" required=""></input>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input style={{border:"none"}} type="email" class="form-control" name="email" id="email" placeholder="학번" required=""></input>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-2">
                  <input type="button" class="form-control" value={"팀원 추가"} required=""></input>
                </div>
              </div>
            </form>
            
          </div>
            <div class="cta-btn align-self-start" href="#">등록하기</div>
          </div>

          <div class="col-lg-4 col-md-6 order-first order-md-last d-flex align-items-center">
            <div class="img">
              
              <img src="/img/business-1.jpg" class="img-fluid" alt></img>
            </div>
          </div>

        </div>

      </div>
    </section>
        </section>
      </main>
      
    )
  };
}

export default CreateTeam;
