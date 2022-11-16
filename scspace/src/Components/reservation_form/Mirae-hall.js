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


class Form extends Component{
    constructor(props){
        super(props);
        this.state =  this.props.reserveData ? 
        this.props.reserveData :{
            space : 'mirae-hall',
            timeFrom : '',
            timeTo : '',
            content : {organizationName : '', eventName:'', innerNumber : 0, outerNumber : 0, eventPurpose:'',contents:'', rehersalFrom:null, rehersalTo:null, rehersalLastdayFrom : null, rehersalLastdayTo:null, equipment:[], food:''}
        }
        

      // 예약 가능 날짜 관련 변수
      this.limitdate = {mindays:10, maxdays:54, maxUseHour:-1}
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
    
    handleValueChange_time = (what, date, rehersal = false)=> {
      let nextstate = Object.assign({}, this.state);
      rehersal ? nextstate['content'][what] = date
      : nextstate[what] = date;
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
                <OrganizationName onChangeHandler={this.handleValueChange_content} value={this.state.content.organizationName}/>
                <EventName onChangeHandler={this.handleValueChange_content} value={this.state.content.eventName}/>
                <Time rehersal={true} rehersalLastday={true} limitdate={this.limitdate} onChangeHandler = {this.handleValueChange_time}/>
                <Number onChangeHandler={this.handleValueChange_content} type={false}/>
                <Contents onChangeHandler = {this.handleValueChange_content} value={this.state.content.contents}/>
                <EventPurpose onChangeHandler = {this.handleValueChange_content}value={this.state.content.eventPurpose}/>
                <Equipment checkboxlist = {{조명:"light", 음향:"sound", 프로젝터:"projector"}} head="장비 사용" name="equipment" onChangeHandler = {this.handleValueChange_checkbox}/>

              <Food onChangeHandler={this.handleValueChange_content} value={this.state.content.food}/>

              <Agree/>
              
            <div className="text-end"><button type="submit">{t('예약하기')}</button></div>
          </form>
        </div>
        
      )};
}

export default withTranslation()(Form);