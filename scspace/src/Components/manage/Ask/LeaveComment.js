import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get, post} from 'axios';

class LeaveComment extends Component{

    constructor(props){
        super(props);
        this.state = {
            comment : '',
            dot : 'wait',
            id : this.props.props.match.params.id
            
        }
        this.handle = {wait: "대기중", receive: "접수됨", solve: "해결됨"}
    }

    handleChange(e) {
        let nextstate = Object.assign({}, this.state);
        nextstate[e.target.name] = e.target.value;
        this.setState(nextstate);
    }

    sendPost = () => {
        const url = '/api/ask/comment/create';
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
              this.props.props.history.push('/ask')
            })
  
        } 
       
        else{ alert('a') /* error 내용 출력 필요 */}
      }

    componentDidMount(){
        this.callApi()
            .then(res => this.setState({comment:res.comment, dot:res.state}))
            .catch(err => console.log(err));
    }
    

    callApi = async () => {
        const res = await get('/api/ask/comment/id?id='+ this.props.props.match.params.id);
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
                        <form onSubmit={this.handleSubmit} >
                                <select name="dot" value={this.state.dot} onChange={this.handleChange.bind(this)} className="ask-handle"> 
                                    <option value="wait">대기중</option>
                                    <option value="receive">접수됨</option>
                                    <option value="solve">해결됨</option>
                                </select>
                                {/* <input type="submit" value="Submit" /> */}
                            
                            <div class="row">
                                <div class="col form-group">
                                <textarea name="comment" class="form-control" value={this.state.comment} onChange={this.handleChange.bind(this)} placeholder="Your Comment"></textarea>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" >Post Comment</button>

                        </form>

                    </div>

                </div>
      )};
}

export default LeaveComment;