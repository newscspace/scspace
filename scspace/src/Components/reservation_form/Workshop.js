import React, {Component} from 'react';
import {post} from 'axios';

import Time from './form_component/Time';
import Contents from './form_component/Contents';
import Agree from './form_component/Agree';
import Organization_name from './form_component/Organization_name';
import Number from './form_component/Number';

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
          spaceName: 'workshop',
          time_from : '',
          time_to : '',
          content : {organization_name : '', event_name:'', number : 1, contents:''}
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
            <Organization_name onChangeHandler={this.handlevalueChange_content}/>
            <Time time_from = {this.state.time_from} time_to = {this.state.time_to} onChangeHandler = {this.handleValueChange_time}/>
            <Number onChangeHandler={this.handleValueChange_content} type={true}/>
            <Contents onChangeHandler = {this.handleValueChange_content}/>
            <Agree/>
            <div className="text-end"><button type="submit">예약하기</button></div>
          </form>
        </div>
        
      )};
}

export default Form;