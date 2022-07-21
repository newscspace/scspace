import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {post} from 'axios';

class Ask extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    sendPost = () => {
       
      const url = '/api/ask/create';
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
                 <li><Link to="/ask">문의</Link></li>
                </ol>
                </div>
              </div>
            </div> 
            <section>
            <div className="section-header">
                    <h2>문의하기</h2>
                    <p>Ask</p>
            </div>
            
            <hr/>


            <section id="contact" className="contact">
            <div className="container">
      
              <div className="row gy-5 gx-lg-5">
            <div>
            <form className="php-email-form" onSubmit={this.handleSubmit}>
            <div className="form-group mt-3">
                <input type="text" className="form-control" name="title" placeholder="제목" onChange={this.handleValueChange} required/>
            </div>
            <div className="form-group mt-3">
                <textarea className="form-control" name="content" placeholder="문의 내용" onChange={this.handleValueChange} required></textarea>
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

export default Ask;