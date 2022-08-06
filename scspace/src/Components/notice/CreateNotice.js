import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {post} from 'axios';

class CreateNotice extends Component{
    constructor(props){
        super(props);
        this.state = {important:false};
    }

    sendPost = () => {
       
        const url = '/api/notice/' + this.mode ;
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
              this.props.history.push('/notice')
            })
            
        } 
       
        else{ alert('a') /* error 내용 출력 필요 */}
      }

      handleValueChange = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate[e.target.name] = e.target.value;
        this.setState(nextstate);
      }

      componentDidMount() {
       if (this.props.location.state) {
        this.setState(this.props.location.state.content);
        this.mode = 'update';
        }
        else{
            this.mode = 'create'
        }

      }

    render() {
        return (
        <div id="main">
            <div  className="breadcrumbs">
          <div  className="container">
            <div  className="d-flex justify-content-between align-items-center">
              <h3>공지사항</h3>
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/notice">공지사항</Link></li>
              </ol>
            </div>
          </div>
        </div>
        
        <section>
            <div  className="section-header">
              <h2>공지사항 작성</h2>
              <p>Notice</p>
                <hr/>
            </div>


            <section id="contact" className="contact">
            <div className="container">
      
              <div className="row gy-5 gx-lg-5">
            <div>
            <form className="php-email-form" onSubmit={this.handleSubmit}>
            <div className="form-group mt-3">
                <input type="text" className="form-control" name="title" placeholder="제목" value={this.state.title} onChange={this.handleValueChange} required/>
            </div>
            

            <div className="form-group mt-3">
                <textarea className="form-control" name="content" placeholder="공지 내용"  value={this.state.content} onChange={this.handleValueChange} required></textarea>
              </div>
              
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="important" type="checkbox" id="inlineCheckbox1" checked={this.state.important ? true : false} onChange={() => {this.setState({important:!this.state.important})}}/>
              <label className="form-check-label" for="inlineCheckbox1">중요 공지</label>
            </div>
            
            <div className="text-center"><button type="submit">작성하기</button></div>
            </form>
          </div>
          </div>
          </div>
          </section>
          </section>
        </div>
      )};
}

export default CreateNotice;