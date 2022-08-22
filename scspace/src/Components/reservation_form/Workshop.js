import React, {Component} from 'react';
import {post} from 'axios';

import Time from './form_component/Time';
import Contents from './form_component/Contents';
import Agree from './form_component/Agree';
import OrganizationName from './form_component/Organization_name';
import Number from './form_component/Number';

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
          spaceName: 'workshop',
          timeFrom : '',
          timeTo : '',
          content : {organizationName : '', eventName:'', number : 1, contents:''}
      }

      // 예약 가능 날짜 관련 변수
      this.limitdate = {mindays:0, maxdays:0, maxUseHour:0}
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
          console.log(res.data);
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
    
    handleValueChange_checkbox = (e) => {
      let nextstate = Object.assign({}, this.state);
      nextstate.content[e.target.name].includes(e.target.value)?  nextstate.content[e.target.name].pop(e.target.value) : nextstate.content[e.target.name].push(e.target.value);
      
      this.setState(nextstate);
    }
    
    sendPost = () => {
      const url = '/api/reservation/create';
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    
      return post(url, JSON.stringify(this.state), config);
    }

    render() {
        return (

        <div className="col-lg-8">
            <form className="php-email-form" onSubmit={this.handleSubmit}>
            <OrganizationName onChangeHandler={this.handlevalueChange_content}/>
            <Time onChangeHandler = {this.handleValueChange_time} limitdate={this.limitdate}/>
            <Number onChangeHandler={this.handleValueChange_content} type={true}/>
            <Contents onChangeHandler = {this.handleValueChange_content}/>
            <Agree/>
            <div className="text-end"><button type="submit">예약하기</button></div>
          </form>
        </div>
        
      )};
}

export default Form;