import React, {Component} from 'react';
import {get} from 'axios';


class ShowComment extends Component{

    constructor(props){
        super(props);
        this.state = {
            comment : '',
            dot : 'wait',
            
        }
        this.handle = {wait: "대기중", receive: "접수됨", solve: "해결됨"}
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


    render() {return (
        <div>
        <br/>
        <article className="blog-details">
            <h4 className="title">문의에 대한 답변입니다.</h4>
            <div className="meta-top"/>
            <div className="content">
                <p>
                {this.state.comment}
                </p>

            </div>

        </article>
    </div>
      )};
}

export default ShowComment;