import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {post} from 'axios';
import LoginCheck from '../auth/LoginCheck';

function CreateNotice(props){
  const [_state, _setState] = useState({});
  const [UserInfo, setUserInfo] = useState({});
  
  const sendPost = () => {
    const url = '/api/notice/' + _state.mode ;
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    
    return post(url, JSON.stringify(_state), config);
  }

  const checkSubmit = () => {
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errmsg = '';
    if(checkSubmit()){
      sendPost()
      .then((res) => {
      props.history.push('/notice')})
    }
    else{ alert('a') /*error 내용 출력 필요*/}

  }

  const handleValueChange = (event) => {
    let nextstate = Object.assign({}, _state);
    nextstate[event.target.name] = event.target.value;
    _setState(nextstate);
  }

  const onChangeValue = () => {
    let nextstate = Object.assign({}, _state);
    nextstate.important = !_state.important
    _setState(nextstate)
  }

  useEffect(() => {
    LoginCheck() 
    .then((result) => {
      if (result === false) {props.history.push('/login'); }
      else if (result.type === 'admin') {setUserInfo({login:true, UserInfo:result});}
      else {props.history.push('/notice');}
    })

    if(props.location.state) {
      props.location.state.content.mode = 'update'
      _setState(props.location.state.content);
      }
      else{
        _setState({mode:'create', important:false});
      }
  }, [])

  return (
    <div id="main">
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
          <h2>공지사항 작성</h2>
          <p>Notice</p>
          <hr/>
        </div>
        <section id="contact" className="contact">
          <div className="container">
            <div className="row gy-5 gx-lg-5">
              <div>
                <form className="php-email-form" onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" name="title" placeholder="제목" value={_state.title} onChange={handleValueChange} required/>
                  </div>
                  <div className="form-group mt-3">
                    <textarea className="form-control" name="content" placeholder="공지 내용"  value={_state.content} onChange={handleValueChange} required></textarea>
                    </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" name="important" type="checkbox" id="isImportantNoticeChkbx" checked={_state.important ? true : false} onChange={onChangeValue}/>
                    <label className="form-check-label" for="isImportantNoticeChkbx">중요 공지</label>
                  </div>
                  <div className="text-center"><button type="submit">작성하기</button></div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  )

}
export default CreateNotice;
