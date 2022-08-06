import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import moment from 'moment';

class ViewNotice extends Component{

    constructor(props){
        super(props);
        this.state = {
            content : ''
            
        }

        

    }

    componentDidMount(){
        this.callApi()
            .then(res => this.setState({content:res}))
            .catch(err => console.log(err));
    }
    

    callApi = async () => {
        const res = await get('/api/notice/id?id='+ this.props.match.params.id);
        const body = await res.data;
        return body;
    }

    callApi_delete = async () => {
      const res = await get('/api/notice/delete?id='+ this.props.match.params.id);
      const body = await res.data;
      return body;
    }
    EditNotice = () =>{
      this.props.history.push({pathname : '/notice/create', state: this.state});
    }

    DeleteNotice = () => {
      this.callApi_delete()
        .then(res => this.props.history.push('/notice'))
        .catch(err => console.log(err));
    }

    render() {return (
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
        
        <section className="blog">
            <div  className="section-header">
              <h2>공지사항</h2>
              <p>Notice</p>
                <hr/>
            </div>
    
      <div className="container" >

        <div className="row g-5">

          <div>

            <article className="blog-details">
              <h2 className="title">{this.state.content.title}</h2>

              <div className="meta-top">
                <ul>
                  <li className="d-flex align-items-center"><i className="bi bi-clock"></i> <a href="blog-details.html"><time>{moment(this.state.content.time_post).format('YYYY-MM-DD HH:mm:ss')}</time></a></li>
                  {/* <li className="d-flex align-items-center"><i className="bi bi-chat-dots"></i> <a href="blog-details.html">12 Comments</a></li> */}
                </ul>
              </div>

              <div className="content">
                <p>
                  {this.state.content.content}
                </p>

              </div>

              <div className="meta-bottom">
                <i className="bi bi-folder"></i>
                <ul className="cats">
                  <li><a href="#">Notice</a></li>
                </ul>

              </div>

            </article>
        </div>
        </div>

       
        </div>
        <br/>
        <div className="container">
          <div className="text-end">
            <button type="button" className="btn btn-primary" onClick={this.EditNotice}>수정</button>
					  &nbsp;
					  <button type="button" className="btn btn-danger" onClick={this.DeleteNotice}>삭제</button>
          </div>
        </div>

        </section>
      
      </div>
      )};
}

export default ViewNotice;