import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import moment from 'moment';
import {VscEye} from 'react-icons/vsc';

class LeaveComment extends Component{

    constructor(props){
        super(props);
        this.state = {
            content : '',
            handle: {wait: "대기중", accept: "접수됨", solve: "해결됨"},  
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
                <div className="comments">
                    <div class="reply-form">

                        <h4>답변을 남겨주세요.</h4>
                        <p>* <Link to="#">마크다운</Link> 문법을 지원합니다.</p>
                        <form action="">
                            <form>
                                <select value={this.state.dot} onChange={this.handleChange} className="ask-handle"> 
                                    <option value="wait">대기중</option>
                                    <option value="accept">접수됨</option>
                                    <option value="solve">해결됨</option>
                                </select>
                                {/* <input type="submit" value="Submit" /> */}
                            </form>
                            <div class="row">
                                <div class="col form-group">
                                <textarea name="comment" class="form-control" placeholder="Your Comment"></textarea>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" onSubmit={this.handleSubmit}>Post Comment</button>

                        </form>

                    </div>

                </div>
      )};
}

export default LeaveComment;