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
import Checkbox from './form_component/Checkbox_list';
import Recurrence from './form_component/Recurrence';

class Form extends Component{
    constructor(props){
        super(props);
        

        this.state =  this.props.reserveData ? 
        this.props.reserveData :
        {
          space : 'open-space',
          timeFrom : '',
          timeTo : '',
          content : {space : [], organizationName : '', eventName:'', innerNumber : 0, outerNumber : 0, character:[], eventPurpose:'',contents:'', rehersalFrom:null, rehersalTo:null}
      } 
      
    // 예약 가능 날짜 관련 변수
    this.limitdate = {mindays:5, maxdays:45, maxUseHour:336}


    }
    checkSubmit = () =>{
      if (this.state.content.space.length === 0 ){
        return '공간을 선택해주세요';
      }

       
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
    
      return true;
    }
    
    handleSubmit = (e) =>{
      e.preventDefault()
      const error = this.checkSubmit();
      error === true ? 
      this.sendPost()
        .then((res) => {
          if(res.data.reserveId){
            // 이스터에그 이벤트 수정사항(울림/미래/창작/오픈스페이스 제외)
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
            
                <Checkbox checkboxlist = {{옥상:"rooftop", '커뮤니티 마당':"community", 전시계단:"stair", '미디어 스페이스':'media', '2층 로비':"second_lobby", '3층 로비':"third_lobby", 모임터:'meeting'}} head="장소" name="space" onChangeHandler = {this.handleValueChange_checkbox}/>
                <OrganizationName onChangeHandler={this.handleValueChange_content} value={this.state.content.organizationName}/>
                <EventName onChangeHandler={this.handleValueChange_content} value={this.state.content.eventName}/>
                <Time rehersal={true} limitdate={this.limitdate} onChangeHandler = {this.handleValueChange_time} work={false}/>
                <Recurrence/>
                <Number onChangeHandler={this.handleValueChange_content} type={false}/>
                <Contents onChangeHandler = {this.handleValueChange_content} value={this.state.content.contents}/>
                <EventPurpose onChangeHandler = {this.handleValueChange_content} value={this.state.content.eventPurpose}/>
                <Checkbox checkboxlist = {{종교적:"religion", 영리성:"rentability", 정치적:"politic"}} head="성격" name="character" onChangeHandler = {this.handleValueChange_checkbox} hr={true}/>
                <Food onChangeHandler={this.handleValueChange_content} value={this.state.content.food}/>
                <Agree/>
                
              
            <div className="text-end"><button type="submit">{t('예약하기')}</button></div>
          </form>
        </div>
        
      )};
}

export default withTranslation()(Form);