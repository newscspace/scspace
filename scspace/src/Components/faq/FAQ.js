import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get, post} from 'axios';
import LoginCheck from '../auth/LoginCheck';

class FAQ extends Component{
  constructor(props){
      super(props);

      this.state = {
        /*question : faq 질문, answer : 질문에 대한 답변 */ 
        // TODO : FAQ 요약 로딩하기
        id :[],
        list : [],
        edit : null
      }
      LoginCheck()
      .then((result) => {
        if (result !== false) this.setState({login:true, UserInfo:result});
        else this.setState({login:false});
      })

  }
  /*faq에서 화살표 눌렀을 떄 해당 질문의 답변 보여주기 위한 event 함수 */
  // TODO : FAQ 글 ID로 내용 불러오기
  OnClickEvent = (idx, e) =>{
    let nextstate = Object.assign({}, this.state);
    nextstate.id.includes(idx)?  nextstate.id.pop(idx) : nextstate.id.push(idx);
    
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

  callApi_edit = async(idx, e) => {
    const url = '/api/faq/update';
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  
    post(url, JSON.stringify(this.state.list[idx]), config)
    .then((res) => {this.setState({edit:null})})
  }

  callApi_delete = async (faq_id) => {
    get('/api/faq/delete?id='+ faq_id)
    .then((res) => {    this.callApi()
      .then(res => this.setState({list:res}))
      .catch(err => console.log(err));})
    
  }

  callApi_add = (idx, e) => {
       
    const url = '/api/faq/create';
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  
    post(url, JSON.stringify(this.state.list[idx]), config)
    .then((res) => {    this.callApi()
      .then(res => this.setState({list:res}))
      .catch(err => console.log(err));})
  }
  
  AddFaq = (idx) => {
    let nextstate = Object.assign({}, this.state);
    if(idx !== null) {
      
      nextstate.list.pop();
      this.setState(nextstate);

    } 
    else{

      nextstate.list[this.state.list.length]={id:null, title:'제목', question:'Question', answer:'Answer'};
      this.setState(nextstate);
    }
 
  }
  
  EditFaq = (idx, e) =>{
    if (this.state.edit === idx){
      this.setState({edit:null})
    }
    else{
      this.setState({edit:idx})
    }
    
  }

  DeleteFaq = (idx, e) => {
    console.log(idx);
    this.callApi_delete(this.state.list[idx].id)
      .then(res => {/*alert('삭제되었습니다'); */this.props.history.push({pathname : '/'});})
      .catch(err => console.log(err));
  }

  changeHandler = (idx, e) => {
      let nextstate = Object.assign({}, this.state);
      nextstate.list[idx][e.target.name]= e.target.value;
      this.setState(nextstate);
  }

  admin_return = (idx) => {

      if (this.state.login === true && this.state.UserInfo.type==='admin' ){
        if(this.state.edit === idx){
          return (
            <div className="text-end">
                  <button type="button" className="modalButton2" onClick={this.callApi_edit.bind(this, idx)}>수정 완료</button>
                  <button type="button" className="modalButton1" onClick={this.EditFaq.bind(this, idx)}>취소</button>
                  </div>
          )
        }
        else if (this.state.list[idx].id === null){
          return(
            <div className="text-end">
                  <button type="button" className="modalButton2" onClick={this.callApi_add.bind(this, idx)}>추가 완료</button>
                  <button type="button" className="modalButton1" onClick={this.AddFaq.bind(idx)}>취소</button>
                  </div>
          )
        }
        else{
          return(
            <div className="text-end">
                  <button type="button" className="modalButton2" onClick={this.EditFaq.bind(this, idx)}>수정</button>
                  <button type="button" className="modalButton1" onClick={this.DeleteFaq.bind(this, idx)}>삭제</button>
                  </div>
                )
        }
      
      }
      else{
        return(<div></div>)
      }
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
      <section>
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
                {this.state.login === true && this.state.UserInfo.type==='admin' ? 
                (<div className="text-end">
                    <button type="button" className="modalButton2" onClick={() => {this.AddFaq(null)}}>추가하기</button>
                </div>) : (<div></div>)}
                <div className="accordion accordion-flush px-xl-5">

                  {this.state.list.map((contents, idx) => {
                    return (
                      <div className="accordion-item" id="mount1">
                        <h3 className="accordion-header">
                          <button className={"accordion-button " + (this.state.id.includes(idx)  ? "" : "collapsed")} onClick={this.OnClickEvent.bind(this, idx)} >
                            <i className="bi bi-question-circle question-icon"></i>
                            {this.state.edit === idx || this.state.list[idx].id === null? (<input type="text"  name="question" onChange={this.changeHandler.bind(this, idx)} value ={contents.question}  />): contents.question}
                            
                          
                          </button>
                        </h3>
                        <div className={"accordion-collapse " + (this.state.id.includes(idx)  ?  "" : "collapse")}>
                          <div className="accordion-body">
                          {this.state.edit === idx || this.state.list[idx].id === null ? (<input type="text"  name="answer" onChange={this.changeHandler.bind(this, idx)} value ={contents.answer}  />): contents.answer}
                            
                            {this.admin_return(idx)}
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
      </section>
    )
  };
}

export default FAQ;
