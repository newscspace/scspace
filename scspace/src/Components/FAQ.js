import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class FAQ extends Component{
    constructor(props){
        super(props);

        this.state = {
         /*question : faq 질문, answer : 질문에 대한 답변 */ 
          faq : [
            {question : "당부", answer : "예약하지 말아주셨으면 좋겠네요", clicked:false},
            {question : "부탁", answer : "메일보내지마세요", clicked:false},
            {question : "소원", answer : "신학관 폐쇄 기원", clicked:false},
            {question : "응애", answer : "나 아기 개발자", clicked:false},
            {question : "개발", answer : "하기 싫어요", clicked:false}
            
          ]
        }
    }
    /*faq에서 화살표 눌렀을 떄 해당 질문의 답변 보여주기 위한 event 함수 */
    OnClickEvent = (idx, e) =>{
        const copied_faq = [...this.state.faq];
        copied_faq[idx].clicked = !copied_faq[idx].clicked;
        this.setState({
            faq:copied_faq
        })
        
    }

    


    render() {return (
<div>
  {!this.props.main ? 
          (<div>
          <div  className="breadcrumbs">
          <div  className="container">
            <div  className="d-flex justify-content-between align-items-center">
              <h3>FAQ</h3>
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/introduction">FAQ</Link></li>
              </ol>
            </div>
          </div>
        </div>
        <section>
        <div  className="section-header">
              <h2>FAQ</h2>
              <p>FAQ</p>
            </div>
            <hr></hr> 
        </section>
        </div>) : <div></div> }
<section id="faq"  className ="faq">

            

<div  className="container-fluid">
  <div  className="row gy-4">
    <div  className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

      <div id="mount0" className="content px-xl-5">
        <h3>Frequently Asked <strong>Questions</strong></h3>
        <p>
          많이 주신 질문들에 대한 답변입니다.
        </p>
      </div>

      <div  className="accordion accordion-flush px-xl-5" id="faqlist">

        {this.state.faq.map((contents, idx) => {
        return (
        <div className="accordion-item"  id="mount1">
          <h3  className="accordion-header">
            <button className={"accordion-button " + (contents.clicked ? "" : "collapsed" )} onClick={this.OnClickEvent.bind(this, idx)} >
              <i className="bi bi-question-circle question-icon"></i>
              {contents.question}
            </button>
          </h3>
          <div id="faq-content-1"  className={"accordion-collapse " + (contents.clicked ? "" : "collapse")}>
            <div  className="accordion-body">
             {contents.answer}
            </div>
          </div>
        </div>
    )})}
      </div>

    </div>

    <div  id="mount3" className="col-lg-5 align-items-stretch order-1 order-lg-2 img" >&nbsp;</div>
  </div>

</div>
</section>
</div>
      )};
}



export default FAQ;
