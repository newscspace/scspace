import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import moment from 'moment';
import {VscEye} from 'react-icons/vsc';
import LeaveComment from '../manage/Ask/LeaveComment';

class ViewAsk extends Component{

    constructor(props){
        super(props);
        this.state = {
            content : '',
            handle: {wait: "대기중", receive: "접수됨", solve: "해결됨"},  
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // this.setState({dot: event.target.value});
    }

    handleSubmit(event) {
        // 예약처리 저장하는 함수 작성해야할듯
    }

    componentDidMount(){
        this.callApi()
            .then(res => this.setState({content:res}))
            .catch(err => console.log(err));
    }
    

    callApi = async () => {
        const res = await get('/api/ask/id?id='+ this.props.match.params.id);
        const body = await res.data;
        return body;
    }

    // callApi_delete = async () => {
    //   const res = await get('/api/notice/delete?id='+ this.props.match.params.id);
    //   const body = await res.data;
    //   return body;
    // }

    // EditNotice = () =>{
    //   this.props.history.push({pathname : '/notice/create', state: this.state});
    // }

    // DeleteNotice = () => {
    //   this.callApi_delete()
    //     .then(res => this.props.history.push('/notice'))
    //     .catch(err => console.log(err));
    // }

    render() {return (
    <div id="main">
        <div  className="breadcrumbs">
            <div  className="container">
                <div  className="d-flex justify-content-between align-items-center">
                <h3>관리자 페이지</h3>
                <ol>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/manage">관리자 페이지</Link></li>
                </ol>
                </div>
                
            </div>
        </div>       
        <section className="blog"> 
            <div className="container" >
                <h4><b>문의사항</b></h4>
                <hr/>
                <div className="row g-5">
                    <div>
                        <article className="blog-details">
                            <h2 className="title">{this.state.content.title}</h2>
                            <div className="meta-top">
                                <ul>
                                <li class="d-flex align-items-center"><i class="bi bi-person"></i>{this.state.content.writer_id}</li>
                                <li className="d-flex align-items-center"><i className="bi bi-clock"></i> <time>{moment(this.state.content.time_post).format('YYYY-MM-DD HH:mm:ss')}</time></li>
                                <li className="d-flex align-items-center"><VscEye className="color-secondary-light"/>&nbsp;{this.state.content.hits}</li>
                                </ul>
                            </div>
                            <div className="content">
                                <p>
                                {this.state.content.content}
                                </p>

                            </div>
                            <div className="meta-bottom manage">
                                <p className="cats"><div className={this.state.content.state}/>{this.state.handle[this.state.content.state]}</p>
                            </div>
                        </article>
                    </div>
                </div>

                <LeaveComment/>
                
            </div>

        </section>
      
      </div>
      )};
}

export default ViewAsk;