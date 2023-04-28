import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {post} from 'axios';
import LoginCheck from '../auth/LoginCheck';

function CreateEvent(props){
    const [_state, _changeState] = useState({});
    const [UserInfo, changeUserInfo] = useState({});

    const sendPost = () => {
        const url = '/api/event/' + _state.mode ;
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
            props.history.push('/event')})
        }
    else{ alert('a') /*error 내용 출력 필요*/}

    }

    const handleValueChange = (event) => {
        let nextstate = Object.assign({}, _state);
        nextstate[event.target.name] = event.target.value;
        _changeState(nextstate);
    }

    const onChangeValue = () => {
        let nextstate = Object.assign({}, _state);
        nextstate.important = !_state.important
        _changeState(nextstate)
    }

    useEffect(() => {
        LoginCheck() 
        .then((result) => {
            if (result === false) {props.history.push('/login'); }
            else if (result.type === 'admin') {changeUserInfo({login:true, UserInfo:result});}
            else {props.history.push('/event');}
        })

        if(props.location.state) {
            props.location.state.content.mode = 'update'
            _changeState(props.location.state.content);
            }
            else{
            _changeState({mode:'create', important:false});
            }
    }, [])

    return(
        <div id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                        <h3>이벤트</h3>
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/event">이벤트</Link></li>
                        </ol>
                    </div>
                </div>
            </div>
            <section>
                <div  className="section-header">
                    <h2>이벤트 작성</h2>
                    <p>Event</p>
                    <hr/>
                </div>
                <section id="contact" className="contact">
                    <div className="container">
                    <h2>지금 이 페이지의 기능은 작동하지 않습니다...<br></br> 사용하면 서버에 무슨 일이 일어날 지 모르니 사용하지 말아주세요.... - 관리국 분들께</h2>
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
                            {/* <div className="text-center"><button type="submit">작성하기</button></div> 혹시 몰라서 주석으로 막아놓긴 했네요 */}
                            </form>
                        </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default CreateEvent;