import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';

class FAQ extends Component{
  constructor(props){
      super(props);

      this.state = {
        /*question : faq 질문, answer : 질문에 대한 답변 */ 
        // TODO : FAQ 요약 로딩하기
        id :[],
        list : []
      }
  }
  /*faq에서 화살표 눌렀을 떄 해당 질문의 답변 보여주기 위한 event 함수 */
  // TODO : FAQ 글 ID로 내용 불러오기
  OnClickEvent = (faq_id, e) =>{
    let nextstate = Object.assign({}, this.state);
    nextstate.id.includes(faq_id)?  nextstate.id.pop(faq_id) : nextstate.id.push(faq_id);
    
    this.setState(nextstate);
  }

  componentDidMount(){
    this.callApi()
        .then(res => this.setState({list:res}))
        .catch(err => console.log(err));

  }

  callApi= async () => {
    const res = await get('/api/faq/all');
    const body = await res.data;
    return body;
  }

  render() {
    let header;
    if (!this.props.main) {
      header = (
        <div>
          <div className="breadcrumbs">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <h3>FAQ</h3>
                <ol>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/introduction">FAQ</Link></li>
                </ol>
              </div>
            </div>
          </div>
          <section>
            <div className="section-header">
              <h2>FAQ</h2>
              <p>FAQ</p>
            </div>
            <hr></hr>
          </section>
        </div>
      );
    }
    else {
      header = null;
    }


    return (
      <div>
        {header}
        <section id="faq" className="faq">
          <div className="container-fluid">
            <div className="row gy-4">
              <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

                <div id="mount0" className="content px-xl-5">
                  <h3>Frequently Asked <strong>Questions</strong></h3>
                  <p>
                    많이 주신 질문들에 대한 답변입니다.
                  </p>
                </div>

                <div className="accordion accordion-flush px-xl-5" id="faqlist">

                  {this.state.list.map((contents, idx) => {
                    return (
                      <div className="accordion-item" id="mount1">
                        <h3 className="accordion-header">
                          <button className={"accordion-button " + (this.state.id.includes(contents.id)  ? "" : "collapsed")} onClick={this.OnClickEvent.bind(this, contents.id)} >
                            <i className="bi bi-question-circle question-icon"></i>
                            {contents.question}
                          </button>
                        </h3>
                        <div id="faq-content-1" className={"accordion-collapse " + (this.state.id.includes(contents.id)  ?  "" : "collapse")}>
                          <div className="accordion-body">
                            {contents.answer}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>

              <div id="mount3" className="col-lg-5 align-items-stretch order-1 order-lg-2 img" >&nbsp;</div>
            </div>

          </div>
        </section>
      </div>
    )
  };
}

export default FAQ;
