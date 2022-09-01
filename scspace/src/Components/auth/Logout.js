import React, {Component} from 'react';

class Logout extends Component{
    constructor(props){
        super(props);
        this.location = 'https://iam2.kaist.ac.kr/api/sso/logout/?client_id=SCS&redirect_url='+encodeURI('http://localhost:5000/');
    }
    

    handleSubmit = (e) =>{

      window.location.href = this.location;
      
    }

    render() {
        this.handleSubmit()
        return (
        <div id="main">
        </div>
      )};
}

export default Logout;