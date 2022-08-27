import React, {Component} from 'react';
import {post} from 'axios';
import {withTranslation} from "react-i18next";


import Time from './form_component/Time';
import Agree from './form_component/Agree';
import SpacePick from './form_component/SpacePick';

class Form extends Component{
    constructor(props){
        super(props);
        this.state =  this.props.reserveData ? 
        this.props.reserveData :{
          spaceName: 'piano-room1',
          timeFrom : '',
          timeTo : '',
          content : null
  
          
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
            this.props.history.push({pathname : '/confirmation', state: res.data.reserveId });
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
            <Time onChangeHandler = {this.handleValueChange_time} limitdate={this.limitdate}/>
                <Agree/>
            <div className="text-end"><button type="submit">{t('예약하기')}</button></div>
          </form>
        </div>
        
      )};
}

export default withTranslation()(Form);