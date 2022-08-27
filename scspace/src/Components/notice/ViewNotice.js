import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import moment from 'moment';
import LoginCheck from '../auth/LoginCheck';
import {VscEye} from 'react-icons/vsc';
import {withTranslation} from "react-i18next";

function ViewNotice(props){
  const [content, setContent] = useState('')
  const [login, setLogin] = useState(false);
  const [UserInfo, setUserInfo] = useState(null);
  const {t} = props;

  LoginCheck()
  .then((result) => {
    if (result !== false)
    {
      setLogin(true);
      setUserInfo(result);
    }
  })

  const callApi = async () => {
    const res = await get('/api/notice/id?id='+ props.match.params.id);
    const body = await res.data;
    return body;
  }

  const callApi_delete = async () => {
    const res = await get('/api/notice/delete?id='+ props.match.params.id);
    const body = await res.data;
    return body;
  }

  const EditNotice = () =>{
    props.history.push({pathname : '/notice/create', state: {
      content: content,
      login: login,
      UserInfo: UserInfo
    }});
  }

  const DeleteNotice = () => {
    callApi_delete()
    .then(res => props.history.push('/notice'))
    .catch(err => console.log(err));
  }

  useEffect(() => {
    callApi()
    .then(res => setContent(res))
    .catch(err => console.log(err));
  }, [])

  return (
    <div id="main">
      <div  className="breadcrumbs">
        <div  className="container">
          <div  className="d-flex justify-content-between align-items-center">
            <h3>{t('공지사항')}</h3>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/notice">{t('공지사항')}</Link></li>
            </ol>
          </div>
        </div>
      </div>  
      <section className="blog">
        <div  className="section-header">
          <h2>{t('공지사항')}</h2>
          <p>Notice</p>
          <hr/>
        </div>
        <div className="container" >
          <div className="row g-5">
            <div>
              <article className="blog-details">
                <h2 className="title">{content.title}</h2>
                <div className="meta-top">
                  <ul>
                    <li className="d-flex align-items-center"><i className="bi bi-clock"></i> <time>{moment(content.time_edit === null ? content.time_post : content.time_edit).format('YYYY-MM-DD HH:mm:ss')}</time></li>
                    <li className="d-flex align-items-center"><VscEye className="color-secondary-light"/>&nbsp;{content.hits}</li>
                  </ul>
                </div>
                <div className="content">
                  <p>
                    {content.content}
                  </p>
                </div>
                <div className="meta-bottom">
                  <i className="bi bi-folder"></i>
                  <ul className="cats">
                    <li><a href="#">Notice</a></li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
        <br/>
        <div className="container">
          {login === true && UserInfo.type==='admin' ? 
          (<div className="text-end">
            <button type="button" className="modalButton2" onClick={EditNotice}>수정</button>
            <button type="button" className="modalButton1" onClick={DeleteNotice}>삭제</button>
          </div>) : (<div></div>)}
        </div>
      </section>
    </div>
  )

}

/*
class ViewNotice extends Component{

    constructor(props){
        super(props);
        this.state = {
            content : ''  
            
        }

        LoginCheck()
      .then((result) => {
        if (result !== false) this.setState({login:true, UserInfo:result});
        else this.setState({login:false});
      })

    }

    componentDidMount(){
        this.callApi()
            .then(res => this.setState({content:res}))
            .catch(err => console.log(err));
    }
    

    callApi = async () => {
        const res = await get('/api/notice/id?id='+ this.props.match.params.id);
        const body = await res.data;
        return body;
    }

    callApi_delete = async () => {
      const res = await get('/api/notice/delete?id='+ this.props.match.params.id);
      const body = await res.data;
      return body;
    }

    EditNotice = () =>{
      this.props.history.push({pathname : '/notice/create', state: this.state});
    }

    DeleteNotice = () => {
      this.callApi_delete()
        .then(res => this.props.history.push('/notice'))
        .catch(err => console.log(err));
    }

    render() {return (
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
        
        <section className="blog">
            <div  className="section-header">
              <h2>공지사항</h2>
              <p>Notice</p>
                <hr/>
            </div>
    
      <div className="container" >

        <div className="row g-5">

          <div>

            <article className="blog-details">
              <h2 className="title">{this.state.content.title}</h2>

              <div className="meta-top">
                <ul>
                  <li className="d-flex align-items-center"><i className="bi bi-clock"></i> <time>{moment( this.state.content.time_edit === null ? this.state.content.time_post : this.state.content.time_edit).format('YYYY-MM-DD HH:mm:ss')}</time></li>
                  <li className="d-flex align-items-center"><VscEye className="color-secondary-light"/>&nbsp;{this.state.content.hits}</li>
                </ul>
              </div>

              <div className="content">
                <p>
                  {this.state.content.content}
                </p>

              </div>

              <div className="meta-bottom">
                <i className="bi bi-folder"></i>
                <ul className="cats">
                  <li><a href="#">Notice</a></li>
                </ul>

              </div>

            </article>
        </div>
        </div>

       
        </div>
        <br/>
        <div className="container">
        {this.state.login === true && this.state.UserInfo.type==='admin' ? 
                (<div className="text-end">
                <button type="button" className="modalButton2" onClick={this.EditNotice}>수정</button>
                <button type="button" className="modalButton1" onClick={this.DeleteNotice}>삭제</button>
              </div>) : (<div></div>)}
          
        </div>

        </section>
      
      </div>
      )};
}
*/

export default withTranslation()(ViewNotice);
