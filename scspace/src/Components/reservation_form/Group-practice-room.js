import React, {Component} from 'react';
import {post} from 'axios';

import Team from './form_component/Team';
import Member from './form_component/Checkbox_list';
import Time from './form_component/Time';
import Contents from './form_component/Contents';
import Agree from './form_component/Agree';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
<<<<<<< .merge_file_a06804
        space_name: 'group-practice-room',
=======
        spaceName: 'group-practice-room',
>>>>>>> .merge_file_a02796
        team_id: null, /* team_id관련해서 코드 필요 */
        time_from : '',
        time_to : '',
        content : {team_name : '', event_name:'', team_member:[], contents:''}

    }
    this.teamlist = ['a', 'b', 'c'];
    this.memberlist = {c:0, d:1, e:3}; /* 멤버 이름 : UID */
    /* 팀 선택과 멤버 선택 코드는 추후 수정이 필요하다. */

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
                
              <Team teamlist= {this.teamlist} onChangeHandler = {this.handleValueChange_content}/>
              <Member checkboxlist = {this.memberlist} head="멤버" name="member" onChangeHandler = {this.handleValueChange_checkbox}/>
              <Time time_from = {this.state.time_from} time_to = {this.state.time_to} onChangeHandler = {this.handleValueChange_time}/>
              <Contents onChangeHandler = {this.handleValueChange_content}/>
              <Agree/>
              <div className="text-end"><button type="submit">예약하기</button></div>
            </form>
        </div>
        
      )};
}

export default Form;