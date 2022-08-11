import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {post} from 'axios';
import LoginCheck from '../auth/LoginCheck';

class CreateFaq extends Component{
    constructor(props){
        super(props);
        this.state = {};

      LoginCheck()
      .then((result) => {
        if (result === false) this.props.history.push('/login'); 
        else if (result.type === 'admin') this.setState({login:true, UserInfo:result});
        else this.props.history.push('/faq');
      })

    }
    
    sendPost = () => {
       
      const url = '/api/faq/create';
      const config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    
      return post(url, JSON.stringify(this.state), config);
    }
    
    checkSubmit = () =>{
      return true;
    }

    handleSubmit = (e) =>{
      e.preventDefault()
      const errmsg = ''
      if(this.checkSubmit()){
          this.sendPost()
          .then((res) => {
            console.log(res.data);
            this.props.history.push('/faq')
          })

      } 
     
      else{ alert('a') /* error 내용 출력 필요 */}
    }

    handleValueChange = (e) => {
      let nextstate = Object.assign({}, this.state);
      nextstate[e.target.name] = e.target.value;
      this.setState(nextstate);
    }

    render() {
        return (
        <div id="main">
            <div  className="breadcrumbs">
              <div  className="container">
                  <div  className="d-flex justify-content-between align-items-center">
                      <h3>문의</h3>
                <ol>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/faq/create">faq</Link></li>
                </ol>
                </div>
              </div>
            </div> 
            <section>
            <div className="section-header">
                    <h2>FAQ 작성</h2>
                    <p>FAQ</p>
            </div>
            
            <hr/>


            <section id="contact" className="contact">
            <div className="container">
      
              <div className="row gy-5 gx-lg-5">
            <div>
            <form className="php-email-form" onSubmit={this.handleSubmit}>

            <div className="form-group mt-3">
                <input type="text" className="form-control" name="question" placeholder="질문" onChange={this.handleValueChange} required/>
            </div>
            <div className="form-group mt-3">
                <textarea className="form-control" name="answer" placeholder="문의 내용" onChange={this.handleValueChange} required></textarea>
              </div>
              
            <div className="text-center"><button type="submit">제출</button></div>
            </form>
          </div>
          </div>
          </div>
          </section>
          </section>
        </div>
      )};
}

export default CreateFaq;