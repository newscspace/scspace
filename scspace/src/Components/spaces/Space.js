import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Introduction from './Introduction';
import Usage from './Usage';
import Caution from './Caution';
import {get, post} from 'axios';
import LoginCheck from '../auth/LoginCheck';

//individual_practice_room_1','individual_practice_room_2','individual_practice_room_3','piano_room_1','piano_room_2','multipurpose_room','seminar_room_1','seminar_room_2',
//'dance_studio','group_practice_room','mirae_hall','ullim_hall','open_space','workshop'
// import Individual from './spaces/Individual/Individual.js';
// import Piano from './spaces/Piano/Piano.js';
// import Seminar from './spaces/Seminar/Seminar.js';
// import Practice from './spaces/Practice/Practice.js';
// import Dance from './spaces/Dance/Dance.js';
// import Ullim from './spaces/Ullim/Ullim.js';
// import Mirae from './spaces/Mirae/Mirae.js';
// import Workshop from './spaces/Workshop/Workshop.js';
// import Openspace from './spaces/Openspace/Openspace.js';



class Space extends Component{
    constructor(props){
        super(props);
        //this.space_list = ['individual-practice-room', 'piano-room', 'dance-studio', 'seminar-room', 'group-practice-room', 'ullim-hall', 'mirae-hall', 'open-space', 'workshop'];
      this.spaceDict = {
        'individual-practice-room': '개인연습실',
        'piano-room': '피아노실',
        'seminar-room': '세미나실',
        'group-practice-room': '합주실',
        'dance-studio': '무예실',
        'ullim-hall': '울림홀',
        'mirae-hall': '미래홀',
        'workshop': '창작공방',
        'open-space': '오픈스페이스'
      }
        this.state = {
            menu: 0,
            edit : false,
            spaceInfo : {roomName : '', shortintro : '', 
                introduction:{intro:'', content:[{title:'', body:{head:'', list:['']}}]},
                usage:{intro:'', content:[{title:'', body:{head:'', list:['']}}]},
                caution:{intro:'', content:[{title:'', body:{head:'', list:['']}}]}},            
          }

          
          LoginCheck()
          .then((result) => {
            if (result !== false) this.setState({login:true, UserInfo:result});
            else this.setState({login:false});
          })  

          this.callApi()
          .then(res => {
              this.setState({spaceInfo:res, shortintro:res.shortintro, menulist :{
                  0: <Introduction roomData={res.introduction} login = {this.state.login} UserInfo = {this.state.UserInfo} callApi={this.callApi_update}/>,
                  1: <Usage  roomData={res.usage} login = {this.state.login} UserInfo = {this.state.UserInfo} callApi={this.callApi_update}/>,
                  2: <Caution  roomData={res.caution} login = {this.state.login} UserInfo = {this.state.UserInfo} callApi={this.callApi_update}/>
              }});
          })
          .catch(err => console.log(err));
      
    }


      callApi= async () => {
        const res = await get('/api/space/read?space='+this.props.match.params.name);
        const body = await res.data;
        return body;
      }
      
      changeMenu = (menuIndex) =>{
        document.querySelector("#menu"+this.state.menu).classList.toggle('active');
        document.querySelector("#menu"+menuIndex).classList.toggle('active');
        this.setState({menu: menuIndex});
      }

      
    callApi_update = (spaceInfo, menu) => {
       
    const url = '/api/space/update';
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    
    let postData = Object.assign({}, this.state.spaceInfo);
    postData[menu] = spaceInfo;
    postData.menu = menu;
    post(url, JSON.stringify(postData), config)
    .then((res) => {  
      this.setState({spaceInfo:res.data,  menulist :{
        0: <Introduction roomData={res.data.introduction} login = {this.state.login} UserInfo = {this.state.UserInfo} callApi={this.callApi_update} />,
        1: <Usage  roomData={res.data.usage} login = {this.state.login} UserInfo = {this.state.UserInfo} callApi={this.callApi_update}/>,
        2: <Caution  roomData={res.data.caution} login = {this.state.login} UserInfo = {this.state.UserInfo} callApi={this.callApi_update}/>
    }})})
      .catch(err => console.log(err));}
  

    admin_return = (idx) => {

        if (this.state.login === true && this.state.UserInfo.type==='admin' ){
          if(this.state.edit === true){
            return (
              <div className="text-end">
                    <button type="button" className="modalButton2" onClick={() => {this.setState({edit:false}); this.callApi_update(this.state.shortintro, 'shortintro')}}>수정 완료</button>
                    <button type="button" className="modalButton1" onClick={() => {this.setState({edit:false, shortintro:this.state.spaceInfo.shortintro})}}>취소</button>
                    </div>
            )
          }
          else if (this.state.edit === false){
            return(
              <div className="text-end">  
                    <button type="button" className="modalButton2" onClick={() => {this.setState({edit:true}); }}>수정하기</button>
                    </div>
            )
          }
        }
        else{
          return(<div/>)
        }
    }

    
 
  changeHandler = (e) => {
      this.setState({shortintro : e.target.value})
  }

    render() {
        return (
        <div>
            <div class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                        <h2>{this.spaceDict[this.state.spaceInfo.roomName]}</h2>
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li>공간</li>
                        </ol>
                    </div>

                </div>
            </div>
            <section>

                <div class="section-header">
                    <h2>{this.spaceDict[this.state.spaceInfo.roomName]}</h2>
                    <p>{this.state.spaceInfo.roomName} </p>
                </div>
                <hr/>
        
        <section id="about" className="about">
          
          <div className="container">

            <div className="row g-4 g-lg-5">
              

              <div className="col-lg-5">
                <div className="about-img">
                  <img src={'/img/spaces/' + this.props.match.params.name + '.jpg'} className="img-fluid" alt=""/>
                </div>
              </div>

              <div className="col-lg-7">
                <h3 className="pt-0 pt-lg-5">{this.state.edit ? (<input type="text"  name="title" onChange={this.changeHandler.bind(this)} value ={this.state.shortintro}  required/>): this.state.spaceInfo.shortintro}</h3>
                {this.admin_return('edit')}
                <ul className="nav nav-pills mb-3">
                  <li onClick={() => this.changeMenu(0)} className="nav-link active" id="menu0">소개</li>
                  <li onClick={() => this.changeMenu(1)} className="nav-link" id="menu1">사용방법</li>
                  <li onClick={() => this.changeMenu(2)} className="nav-link" id="menu2">주의사항</li>
                </ul>

                <div className="tab-content">
                  {this.state.menulist ? this.state.menulist[this.state.menu] : (<div/>)}
                </div>

              </div>

            </div>

          </div>
        </section>     
        

            </section>
        </div>
      )};
}

export default withRouter(Space);