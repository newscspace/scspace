import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';

function FastNotice(props){

  const [fastNotice, changeFastNotice] = useState([
    {link:"#", title:"sample1", content:"sample1"},
    {link:"#", title:"sample2", content:"sample2"},
    {link:"#", title:"sample3", content:"sample3"},
    {link:"#", title:"sample4", content:"sample4"}
  ])

  return(
    <section className="featured-services">
        <div className="container">
          <div className="row gy-4">
          {
            fastNotice.map((contents, idx) => {
            return(
            <div className="col-xl-3 col-md-6 d-flex" id={"mount"+idx}>
              <div className="service-item position-relative">
                <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                  <h4><Link to={contents.link} className="stretched-link">{contents.title}</Link></h4>
                  <p>{contents.content}</p>
                </div>
              </div>)
            })
          }
          </div>
        </div>
      </section>
  )
}

/*
class FastNotice extends Component{
    constructor(props){
        super(props);

        this.state = {
          fast_notice : [
            {link:"#", title:"sample1", content:"sample1"},
            {link:"#", title:"sample2", content:"sample2"},
            {link:"#", title:"sample3", content:"sample3"},
            {link:"#", title:"sample4", content:"sample4"}
          ]
        }
    }


    render() {return (

      <section className="featured-services">
        <div className="container">
  
          <div className="row gy-4">
          {
            this.state.fast_notice.map((contents, idx) => {
            return(
            <div className="col-xl-3 col-md-6 d-flex" id={"mount"+idx}>
              <div className="service-item position-relative">
              <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                <h4><Link to={contents.link} className="stretched-link">{contents.title}</Link></h4>
                <p>{contents.content}</p>
              </div>
            </div>)})
            }
          </div>
            
        </div>
      </section>
     
      )};
}
*/


export default FastNotice;
