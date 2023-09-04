import React, {Component} from 'react';
import {post} from 'axios';
import {withTranslation} from "react-i18next";


import Time from './form_component/Time';
import Contents from './form_component/Contents';
import Agree from './form_component/Agree';
import OrganizationName from './form_component/Organization_name';
import Number from './form_component/Number';
import EventName from './form_component/Event_name';
import EventPurpose from './form_component/Event_purpose'
import Food from './form_component/Food';
import Equipment from './form_component/Checkbox_list'
import Recurrence from './form_component/Recurrence';

class Form extends Component{
    constructor(props){
        super(props);
        this.state =  this.props.reserveData ? 
        this.props.reserveData : {
            space : 'ullim-hall',
            timeFrom : '',
            timeTo : '',
            content : {organizationName : '', eventName:'', innerNumber : 0, outerNumber : 0, eventPurpose:'',contents:'', rehersalFrom:null, rehersalTo:null, rehersalLastdayFrom : null, rehersalLastdayTo:null, workFrom: null, workTo:null, workComplete:null, equipment:[], food:'', lobby:[], desk:0, chair:0}
        }
        

      // 예약 가능 날짜 관련 변수
      this.limitdate = {mindays:10, maxdays:44, maxUseHour:-1}
    }
    

    checkSubmit = () =>{
        
      if(new Date(this.state.timeFrom).getTime() >= new Date(this.state.timeTo).getTime()){
        return '시작 시간과 종료 시간을 올바르게 선택해주세요';
      }

      if (this.state.content.rehersalFrom !== null || this.state.content.rehersalTo !== null){
        if ( new Date(this.state.timeFrom.getFullYear(),this.state.timeFrom.getMonth(), this.state.timeFrom.getDate()).getDate() !== new Date(this.state.content.rehersalFrom.getFullYear(),this.state.content.rehersalFrom.getMonth(), this.state.content.rehersalFrom.getDate()).getDate() ){
          return '리허설 시간을 확인해주세요';
        }
        else if(new Date(this.state.content.rehersalFrom).getTime() >= new Date(this.state.content.rehersalTo).getTime()){
          return '당일 리허설 시작 시간과 종료 시간을 올바르게 선택해주세요';
        }

      }
      if (this.state.content.rehersalLastdayFrom !== null || this.state.content.rehersalLastdayTo !== null){
        if (new Date(this.state.timeFrom.getFullYear(),this.state.timeFrom.getMonth(), this.state.timeFrom.getDate() - 1).getDate() !== new Date(this.state.content.rehersalLastdayFrom.getFullYear(),this.state.content.rehersalLastdayFrom.getMonth(), this.state.content.rehersalLastdayFrom.getDate()).getDate()){
          return '리허설 시간을 확인해주세요';
        }  
      
        else if(new Date(this.state.content.rehersalLastdayFrom).getTime() >= new Date(this.state.content.rehersalLastdayTo).getTime()){
          return '전날 리허설 시작 시간과 종료 시간을 올바르게 선택해주세요';
        }

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
          else if (res.data.duplicate){
            alert('해당 시간에 이미 예약이 존재합니다.');
          }
        })
        : alert(error) 
      }
    
    handleValueChange = (e) => {
      let nextstate = Object.assign({}, this.state);
      nextstate[e.target.name] = e.target.value;
      this.setState(nextstate);
    }
    
    handleValueChange_time = (what, date, rehersalOrWork = false)=> {
      let nextstate = Object.assign({}, this.state);
      rehersalOrWork ? nextstate['content'][what] = date
      : nextstate[what] = date;
      if(what == 'workFrom') nextstate['content']['workComplete'] = false;
      this.setState(nextstate);
    }
    handleValueChange_content = (e) => {
      let nextstate = Object.assign({}, this.state);
      nextstate['content'][e.target.name] = e.target.value;
      this.setState(nextstate);
    }
    
    myString2JSON = (str) => {
      let strArr = str.split(';');
      let obj = {}
      let sArr = null;
      if(strArr[0] === '') return {};
      for(let s of strArr){
        sArr = s.split("=");
        obj[sArr[0]] = sArr[1];
      }
      return obj;
    }
    myJSON2String = (obj) => {
      let str = "";
      for(let s in obj){
        str = str + `${s}=${obj[s]};`;
      }
      return str.slice(0, -1);
    }
    arr2Yday(obj){
      let str = "";
      if(obj.indexOf(7) !== -1) str += "SU,";
      if(obj.indexOf(1) !== -1) str += "MO,";
      if(obj.indexOf(2) !== -1) str += "TU,";
      if(obj.indexOf(3) !== -1) str += "WE,";
      if(obj.indexOf(4) !== -1) str += "TH,";
      if(obj.indexOf(5) !== -1) str += "FR,";
      if(obj.indexOf(6) !== -1) str += "SA,";
      if(str.indexOf(',') !== -1) return str.slice(0, -1);
      else return str; // else 발동되면 안됨
    }
    myDate2Str(d){
      let str = d.toISOString().replace(/-/g, '').slice(0, 9);
      str += '145959Z';
      return str;
    }
    handleValueChange_recur = (key, cont) => {
      let nextstate = Object.assign({}, this.state);
      let state_obj = null;
      if(key === 'TOGGLE'){
        if(nextstate['content'].hasOwnProperty('recurrenceRule')){
          delete nextstate['content']['recurrenceRule'];
          this.setState(nextstate);
          return;
        }
        else{
          state_obj = {"FREQ": "weekly", "INTERVAL": 1, "BYDAY": "TU"};
        }
      }
      else{
        state_obj = this.myString2JSON(nextstate['content']['recurrenceRule']);
      }

      if(key === 'FREQ'){
        state_obj['FREQ'] = cont.toUpperCase();
        if(cont === 'hourly' || cont === 'daily'){
          if(state_obj.hasOwnProperty('BYDAY')) delete state_obj['BYDAY'];
          if(state_obj.hasOwnProperty('BYMONTHDAY')) delete state_obj['BYMONTHDAY'];
          if(state_obj.hasOwnProperty('BYMONTH')) delete state_obj['BYMONTH'];
        }
        if(cont === 'weekly'){
          state_obj['BYDAY'] = "TU";
          if(state_obj.hasOwnProperty('BYMONTHDAY')) delete state_obj['BYMONTHDAY'];
          if(state_obj.hasOwnProperty('BYMONTH')) delete state_obj['BYMONTH'];
        }
        if(cont === 'monthly'){
          if(state_obj.hasOwnProperty('BYDAY')) delete state_obj['BYDAY'];
          state_obj['BYMONTHDAY'] = 1;
          if(state_obj.hasOwnProperty('BYMONTH')) delete state_obj['BYMONTH'];
        }
        if(cont === 'yearly'){
          if(state_obj.hasOwnProperty('BYDAY')) delete state_obj['BYDAY'];
          state_obj['BYMONTHDAY'] = 1;
          state_obj['BYMONTH'] = 1;
        }
      }
      if(key === 'INTERVAL') state_obj['INTERVAL'] = parseInt(cont);
      if(key === 'BYDAY') state_obj['BYDAY'] = this.arr2Yday(cont);
      if(key === 'BYMONTHDAY') state_obj['BYMONTHDAY'] = parseInt(cont);
      if(key === 'BYMONTH') state_obj['BYMONTH'] = parseInt(cont);
      if(key === 'UNTIL'){
        if(cont === -1){
          if(state_obj.hasOwnProperty('UNTIL')) delete state_obj['UNTIL'];
        }
        else state_obj['UNTIL'] = this.myDate2Str(cont);
      }
      if(key === 'COUNT'){
        if(cont === -1){
          if(state_obj.hasOwnProperty('COUNT')) delete state_obj['COUNT'];
        }
        else state_obj['COUNT'] = parseInt(cont);
      }

      nextstate['content']['recurrenceRule'] = this.myJSON2String(state_obj);
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
                <OrganizationName onChangeHandler={this.handleValueChange_content} value={this.state.content.organizationName}/>
                <EventName onChangeHandler={this.handleValueChange_content} value={this.state.content.eventName}/>
                <Time rehersal={true} rehersalLastday={true} limitdate={this.limitdate} onChangeHandler = {this.handleValueChange_time} work={true}/>
                {this.props.UserInfo.type === "admin" ? <Recurrence onChangeHandler = {this.handleValueChange_recur}/> : <div/>}
                <Number onChangeHandler={this.handleValueChange_content} type={false}/>
                <Contents onChangeHandler = {this.handleValueChange_content} value={this.state.content.contents}/>
                <EventPurpose onChangeHandler = {this.handleValueChange_content} value={this.state.content.eventPurpose}/>
                <Equipment checkboxlist = {{조명:"light", 음향:"sound", 프로젝터:"projector"}} head="장비 사용" name="equipment" onChangeHandler = {this.handleValueChange_checkbox}/>

              <div className="row">
              <h5>{t('책상과 의자')}</h5>
                <div className="col-md-6 form-group">
                  {t('책상 수')}
                  <input type='number' className="form-control" name="desk" min='0' max='200' step='1' onChange={this.handleValueChange_content}/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  {t('의자 수')}
                  <input type='number' className="form-control" name="chair" min='0' max='200' step='1' onChange={this.handleValueChange_content}/>
                </div>
              </div>
              <hr/><br/>

              <h5>로비</h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "lobby" id="useLobby" value={true} onChange={this.handleValueChange_checkbox}/>
                  <label className="form-check-label" for="useLobby">{t('울림홀 앞 1층 로비를 사용합니다.')}</label>
                </div>
                <hr/><br/>

              <Food onChangeHandler={this.handleValueChange_content}/>

              <Agree/>
              
            <div className="text-end"><button type="submit">{t('예약하기')}</button></div>
          </form>
        </div>
        
      )};
}

export default withTranslation()(Form);