import {post} from 'axios';


async function sendPost() {
       
  const url = '/api/jwt/verification';
  const config = {
    headers : {
      'Content-Type' : 'application/json',
      'x-access-token': localStorage.getItem('scspacetoken')
    }
  }

  return await post(url, JSON.stringify({}), config);
}


async function LoginCheck(){
    if(localStorage.getItem('scspacetoken') === null){
      return false;
    }
    
    let res = await sendPost();
    let body = await res.data;
    return body;
}


export default LoginCheck;