import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Scspace from './Introduction_content/Scspace';
import Business from './Introduction_content/Business/Business';
import Rule from './Introduction_content/Rule/Rule';
import {withTranslation} from "react-i18next";

class Introduction extends Component{
    constructor(props){
        super(props);

        this.state = {
          info: [
            {which:'소개', text:<Scspace/>, clicked:true},
            {which:'사업소개', text:<Business/>, clicked:false},
            {which:'회칙', text:<Rule/>, clicked:false}
          ]
        }
    }

    OnClickEvent = (idx, e) =>{
        const copied_info = [...this.state.info];
        copied_info[idx].clicked = true;
        for (let i=0; i<3; i++)
          {
            if (i !== idx) {
              copied_info[i].clicked = false;
            }
          }
        this.setState({
            info:copied_info
        }) 
    }

    render() {
      const {t} = this.props;

      return (
      
      <main id="main">
        <div  className="breadcrumbs">
          <div  className="container">
            <div  className="d-flex justify-content-between align-items-center">
              <h3>{t('소개')}</h3>
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/introduction">소개</Link></li>
              </ol>
            </div>
          </div>
        </div>

        <section>
          <div className='container'>
            <div  className="section-header">
              <h2>학생문화공간위원회</h2>
              <p>Student Culture and Space Committee</p>
            </div>
            <hr></hr>

            <section id="portfolio"  className="portfolio">
              <div className="container-fluid">

                <div  className="portfolio-isotope" >

                  <ul  className="portfolio-flters">
                      {this.state.info.map((contents, idx) => {
                        return (
                            <li onClick={this.OnClickEvent.bind(this, idx)}>{contents.which}</li>
                        )
                      })}
                  </ul>
                </div>
              </div>
            </section>
    
            <p>
              {this.state.info.map((contents, idx) =>{
                  if (contents.clicked === true) { return (contents.text)}  
              })}
            </p>
          </div>
        </section>
      </main>
      )};
}

export default withTranslation()(Introduction);