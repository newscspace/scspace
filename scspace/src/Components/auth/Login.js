import React, {Component} from 'react';
import {post} from 'axios';
import LoginCheck from './LoginCheck';

/* 임시 로그인 기능 구현
일단은 localstorage에 저장합시다 */
class Login extends Component{
    constructor(props){
        super(props);

        this.location = 'https://iam2.kaist.ac.kr/api/sso/commonLogin?client_id=SCS&state='+new Date().getTime()+'&redirect_url='+encodeURI('http://localhost:5000/');
        
    }
    
   

    
    checkSubmit = async () =>{
        
            let res = await LoginCheck();
            if (res === false){
                return true;
            }
            else{
                return false;
            }
          
        
    }

    handleSubmit = (e) =>{

      this.checkSubmit()
        .then (result => {
          if(result){
              window.location.href = this.location;
    
          } 
         
          else{ alert('이미 로그인 되어 있습니다.');this.props.history.push({pathname : '/'})  }

        })
      
      
    }


    render() {
        this.handleSubmit()
        return (
        <div id="main">
        </div>
      )};
}

export default Login;