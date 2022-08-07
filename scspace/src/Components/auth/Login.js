import React, {Component} from 'react';
import {post} from 'axios';
import LoginCheck from './LoginCheck';

/* 임시 로그인 기능 구현
일단은 localstorage에 저장합시다 */
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {name:'Queen', student_id:'20210263', email : 'jiyun@kaist.ac.kr', phone:'01000000000', type:'admin'};
    }
    
    sendPost = async () => {   
      const url = '/api/jwt/login';
      const config = {
        headers : {
          'Content-Type' : 'application/json',
        }
      }
    
      return await post(url, JSON.stringify(this.state), config);
    }
    
    checkSubmit = async () =>{
        if (localStorage.getItem('scspacetoken') !== null){
            
            let res = await LoginCheck();
            if (res === false){
                return true;
            }
            else{
                return false;
            }
          }
        else{
            return true;
        }
    }

    handleSubmit = (e) =>{
      e.preventDefault()
      const errmsg = ''
      
      this.checkSubmit()
        .then (result => {
          if(result){
              this.sendPost()
                .then((res) => {
                localStorage.setItem('scspacetoken', res.data);
              })
    
          } 
         
          else{ alert('이미 로그인 되어 있습니다.');this.props.history.push({pathname : '/'})  }

        })
      
      
    }


    render() {
        return (
        <div id="main">
          
            <section>
            <section id="contact" className="contact">
            <div className="container">
      
              <div className="row gy-5 gx-lg-5">
            <div>
            <form className="php-email-form" onSubmit={this.handleSubmit}>
              
            <div className="text-center"><button type="submit">로그인</button></div>
            </form>
          </div>
          </div>
          </div>
          </section></section>
        </div>
      )};
}

export default Login;