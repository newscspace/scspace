import React, {Component} from 'react';
import {post} from 'axios';


import Time from './form_component/Time';
import Agree from './form_component/Agree';
import SpacePick from './form_component/SpacePick';

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
<<<<<<< .merge_file_a29848
          space_name: 'individual-practice-room1',
=======
          spaceName: 'individual-practice-room1',
>>>>>>> .merge_file_a29052
          time_from : '',
          time_to : ''
  
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
                <SpacePick spacelist={{개인연습실1 : 'individual-practice-room1', 개인연습실2 : 'individual-practice-room2', 개인연습실3 : 'individual-practice-room3'}} onChangeHandler={this.handleValueChange}  />
                <Time time_from = {this.state.time_from} time_to = {this.state.time_to} onChangeHandler = {this.handleValueChange_time}/>
                <Agree/>
            <div className="text-end"><button type="submit">예약하기</button></div>
          </form>
        </div>
        
      )};
}

export default Form;