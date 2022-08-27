import React, {Component} from 'react';
import {get, post} from 'axios';

import Team from './form_component/Team';
import Member from './form_component/Checkbox_list';
import Time from './form_component/Time';
import Contents from './form_component/Contents';
import Agree from './form_component/Agree';
import EventName from './form_component/Event_name';

import {withTranslation} from "react-i18next";

class Form extends Component{
  constructor(props){
    super(props);
    this.state =  this.props.reserveData ? 
    this.props.reserveData :{
        spaceName: 'group-practice-room',
        teamId: null, 
        timeFrom : '',
        timeTo : '',
        content : {teamMember:[], contents:''},

        teamlist : [],
        memberlist : {}
    }

    // 예약 가능 날짜 관련 변수
    this.limitdate = {mindays:2, maxdays:14, maxUseHour:3}
    
    this.callApi_team()
    .then(res => {
        this.setState({teamlist:res, teamId:res[0].id})
  
        this.callApi_member(res[0].id)
            .then(res2 => 
              {
                let memberlist = {}
                res2.member.map((member) => {
                  memberlist[member.name] = member.id;
                })
                this.setState({'memberlist':memberlist});
                
              })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));




}


callApi_team= async () => {
  const res = await get('/api/team/mine');
  const body = await res.data;
  return body;
}

callApi_member= async (teamId) => {
  const res = await get('/api/team/id?id='+teamId);
  const body = await res.data;
  return body;
}



checkSubmit = () =>{
  if (this.state.content.teamMember.length === 0 ){
    return '팀 멤버를 선택해주세요';
  }

  else if(new Date(this.state.timeFrom).getTime() >= new Date(this.state.timeTo).getTime()){
    return '시작 시간과 종료 시간을 올바르게 선택해주세요';
  }
  
  return true;
}


handleSubmit = (e) =>{
  e.preventDefault()
  const error = this.checkSubmit();
  error === true ? 
  this.sendPost()
    .then((res) => {
      if(res.data.reserveId){
        this.props.history.push({pathname : '/confirmation', state: res.data.reserveId });
      }
    })
    : alert(error) 
  }

handleValueChange = (e) => {
  let nextstate = Object.assign({}, this.state);
  nextstate[e.target.name] = e.target.value;
  this.setState(nextstate);

  this.callApi_member(e.target.value)
  .then(res => 
    {
      let memberlist = {}
      res.member.map((member) => {
        memberlist[member.name] = member.id;
      })
      this.setState({'memberlist':memberlist});
      
    })
  .catch(err => console.log(err));
}

handleValueChange_time = (what, date)=> {
  let nextstate = Object.assign({}, this.state);
  nextstate[what] = date;
  this.setState(nextstate);
}
handleValueChange_content = (e) => {
  let nextstate = Object.assign({}, this.state);
  nextstate['content'][e.target.name] = e.target.value;
  this.setState(nextstate);
}

handleValueChange_checkbox = (e) => {
  let nextstate = Object.assign({}, this.state);
  nextstate.content[e.target.name].includes(e.target.value)?  nextstate.content[e.target.name].pop(e.target.value) : nextstate.content[e.target.name].push(e.target.value);
  
  this.setState(nextstate);
}

sendPost = () => {
  let mode = this.props.reserveData ? 'update' : 'create';
  const url = '/api/reservation/'+ mode;
  const config = {
    headers : {
      'Content-Type' : 'application/json'
    }
  }

  return post(url, JSON.stringify(this.state), config);
}
    

    render() {
      const {t} = this.props;
        return (

          <div className="col-lg-8">
            <form className="php-email-form" onSubmit={this.handleSubmit}> 
              <EventName onChangeHandler={this.handleValueChange_content} value={this.state.content.eventName}/>
              <Team teamlist= {this.state.teamlist} onChangeHandler = {this.handleValueChange} value={this.props.reserveData ? this.props.reserveData.team_id : null}/>
              <Member checkboxlist = {this.state.memberlist} head="멤버" name="teamMember" onChangeHandler = {this.handleValueChange_checkbox}/>
              <Time onChangeHandler = {this.handleValueChange_time} limitdate={this.limitdate}/>
              <Contents onChangeHandler = {this.handleValueChange_content} value={this.state.content.contents}/>
              <Agree/>
              <div className="text-end"><button type="submit">{t('예약하기')}</button></div>
            </form>
        </div>
        
      )};
}

export default withTranslation()(Form);