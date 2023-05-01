import React, {Component} from 'react';
import {post} from 'axios';
import {withTranslation} from "react-i18next";


import Time from './form_component/Time';
import Agree from './form_component/Agree';
import SpacePick from './form_component/SpacePick';
import Recurrence from './form_component/Recurrence';

class Form extends Component{
    constructor(props){
        super(props);
        this.state =  this.props.reserveData ? 
        this.props.reserveData :{
          space: 'piano-room1',
          timeFrom : '',
          timeTo : '',
          content : {}
  
          
      }


      // 예약 가능 날짜 관련 변수
      this.limitdate = {mindays:1, maxdays:14, maxUseHour:2}


    }
    
    checkSubmit = () =>{
      if(new Date(this.state.timeFrom).getTime() >= new Date(this.state.timeTo).getTime()){
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
            this.props.history.push({pathname : '/confirmation', state: res.data.reserveId, hashid : res.data.hashid });
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
            <SpacePick spacelist={{'피아노실 1' : 'piano-room1', '피아노실 2' : 'piano-room2'}} onChangeHandler={this.handleValueChange}  />
            <Time onChangeHandler = {this.handleValueChange_time} limitdate={this.limitdate} work={false} />
            {this.props.UserInfo.type === "admin" ? <Recurrence onChangeHandler = {this.handleValueChange_recur}/> : <div/>}
            <Agree/>
            <div className="text-end"><button type="submit">{t('예약하기')}</button></div>
          </form>
        </div>
        
      )};
}

export default withTranslation()(Form);