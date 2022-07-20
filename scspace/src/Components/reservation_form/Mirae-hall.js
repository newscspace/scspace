import React, {Component} from 'react';
import {post} from 'axios';


import Time from './Time';
import Contents from './Contents';
import Agree from './Agree';
import Organization_name from './Organization_name';
import Number from './Number';
import Event_name from './Event_name';
import Event_purpose from './Event_purpose'
import Food from './Food';
import Equipment from './Checkbox_list';

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            space_name : 'mirae-hall',
            time_from : '',
            time_to : '',
            content : {organization_name : '', event_name:'', inner_number : 0, outer_number : 0, event_purpose:'',contents:'', rehersal_from:'', rehersal_to:'', rehersal_lastday_from : '', rehersal_lastday_to:'', equipment:[], food:''}
        }
    }
    

    checkSubmit = () =>{
      return true;
    }
    
    handleSubmit = (e) =>{
      e.preventDefault()
      const error_content = this.checkSubmit() ? 
      this.sendPost()
        .then((res) => {
          console.log(res.data);
        })
      : alert('a') /* error 내용 출력 필요 */
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
      const url = 'http://localhost:5000/api/reservation/create';
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
                <Organization_name onChangeHandler={this.handlevalueChange_content}/>
                <Event_name onChangeHandler={this.handleValueChange_content}/>
                <Time time_from = {this.state.time_from} time_to = {this.state.time_to} rehersal={true} rehersal_lastday={true} rehersal_from={this.state.content.rehersal_from} rehersal_to={this.state.content.rehersal_to} rehersal_lastday_from={this.state.content.rehersal_lastday_from} rehersal_lastday_to={this.state.content.rehersal_lastday_to} onChangeHandler = {this.handleValueChange_time}/>
                <Number onChangeHandler={this.handleValueChange_content} type={false}/>
                <Contents onChangeHandler = {this.handleValueChange_content}/>
                <Event_purpose onChangeHandler = {this.handleValueChange_content}/>
                <Equipment checkboxlist = {{조명:"light", 음향:"sound", 프로젝터:"projector"}} head="장비 사용" name="equipment" onChangeHandler = {this.handleValueChange_checkbox}/>


              <Food onChangeHandler={this.handleValueChange_content}/>

              <Agree/>
              
            <div className="text-end"><button type="submit">예약하기</button></div>
          </form>
        </div>
        
      )};
}

export default Form;