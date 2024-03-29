import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from '../auth/LoginCheck';
import {post} from 'axios';
import {TiDeleteOutline} from 'react-icons/ti';
import {withTranslation} from "react-i18next";

class CreateTeam extends Component{
  constructor(props){
      super(props);
      this.state = {
        login:false,
        teamdata :{team_name : '', member : [{id:0, name:'', student_id:''}]}
      }

      LoginCheck() 
      .then((result) => {
        if (result === false) {this.props.history.push('/login'); }
        else {this.setState({login:true, UserInfo:result});}
       
      })


  }
  
  sendPost = () => {
    const url = '/api/team/create';
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    
    return post(url, JSON.stringify(this.state.teamdata), config);
  }

  checkSubmit = () => {
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errmsg = '';
    if(this.checkSubmit()){
      this.sendPost()
      .then((res) => {
        if(res.data.teamid){
          this.props.history.push({pathname : '/team', state: res.data.teamid });
        }
        else{alert('Error Occured')}
      })
    }
    else{ alert('a') /*error 내용 출력 필요*/}

  }

  Addmember = (idx) => {
    let nextstate = Object.assign({}, this.state);
    if(idx !== null) {     
      nextstate.teamdata.member = nextstate.teamdata.member.filter(mem => mem.id !== idx);
      this.setState(nextstate);
    } 
    else{
      nextstate.teamdata.member[this.state.teamdata.member.length]={id:this.state.teamdata.member.length, name:'', student_id:''};
      this.setState(nextstate);
    }
  }

  
  handleValueChange = (idx, e) => {
    let nextstate = Object.assign({}, this.state);   
    if (e.target.name === 'team_name'){
      nextstate.teamdata.team_name = e.target.value;
    }
    else{
      nextstate.teamdata.member[idx][e.target.name] = e.target.value;
    }
    this.setState(nextstate);
  }

  render() {

    const {t} = this.props;

    return (
      <main id="main">
        <div className="breadcrumbs">
          <div  className="container">
            <div  className="d-flex justify-content-between align-items-center">
              <h3>{t('팀 등록')}</h3>
              <ol>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/team">{t('팀 등록')}</Link></li>
              </ol>    
            </div>
          </div>
        </div>

        <section>
        <section className="cta">
        <div className="container aos-init aos-animate">

        <div className="row g-5">

          <div className="col-lg-8 col-md-6 content d-flex flex-column justify-content-center order-last order-md-first">
            <h2>{t('팀 등록')}</h2>
            <hr/>
            
            <p/>
            <div className="col-lg-10">
              <form className="php-email-form" onSubmit={this.handleSubmit}>
                <input style={{border:"none"}} type="text" name="team_name" className="form-control"  placeholder={t("팀 이름")}  onChange={this.handleValueChange.bind(this, null)}required/>
                <p></p>
                
                
                <div className="row">
                <b>{t('대표자')}</b>
                  <div className="col-5 form-group">
                    <input style={{border:"none"}} type="text" name="name" className="form-control" value={this.state.login ? this.state.UserInfo.name : ''} required/>
                  </div>
                  <div className="col-5 form-group mt-3 mt-md-0">
                    <input style={{border:"none"}} type="text" className="form-control" name="student_id" value={this.state.login ? this.state.UserInfo.student_id : ''}  required/>
                  </div>
                  <p/>
                </div> 
                
                {
                  this.state.teamdata.member.map((contents, idx) => {
                    return (<div className="row">
                      <div className="col-5 form-group">
                        <input style={{border:"none"}} type="text" className="form-control" name="name" placeholder={t("이름")} value={this.state.teamdata.member[idx].name}
                          onChange={this.handleValueChange.bind(this, idx)} required/>
                      </div>
                      <div className="col-5 form-group">
                        <input style={{border:"none"}} type="text" className="form-control" name="student_id" placeholder={t("학번")} value={this.state.teamdata.member[idx].student_id}
                          onChange={this.handleValueChange.bind(this, idx)} required/>
                      </div>
                      <div className="col-1">
                        <TiDeleteOutline size="27" className="delete" onClick={() => {this.Addmember(this.state.teamdata.member[idx].id)}}></TiDeleteOutline>
                      </div>
                      <p/>
                  </div>
                  )
                  })
                }
                
                <div>
                  <div className="add">
                  <button onClick={() => {this.Addmember(null)}}>+</button>
                  </div>
                  <div className="add">
                  <button>{t('등록')}</button>
                  </div>
                </div>
                  
              </form>
            
            </div>
  
          </div>

          <div className="col-lg-4 col-md-6 order-first order-md-last d-flex align-items-center">
            <div className="img">
              <img src="/img/business-1.jpg" className="img-fluid" alt></img>
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

export default withTranslation()(CreateTeam);
