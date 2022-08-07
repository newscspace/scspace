import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';


class LatestAsk extends Component{
    constructor(props) {
        super(props);
        this.state = {
            page_number : 1,
            list : [],
            navigation: '',
        };  
    }

    componentDidMount(){
        this.callApi()
            .then(res => {this.setState({list:res});  this.setState({total_page_number : Math.ceil(res.length/5)});} )
            .catch(err => console.log(err));
    }
    
    callApi= async () => {
        const res = await get('/api/notice/all');
        const body = await res.data;
        return body;
    }
    onClickHandler = (link) => {
        console.log(link)
        this.props.history.push({pathname: link})
    }
    render() {return (
        <main id="main">
            <div className="container">
                <br/>
                <h4><b>최신 문의 목록</b></h4>
                <hr></hr>

                <table className="table manage">
                    <thead>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>작성 시간</th>
                        <th>처리 상태</th>
                    </thead>

                    <tbody>
                        {this.state.list.slice((this.state.page_number-1)*5, this.state.page_number*5).map((contents, idx) => {
                            return(
                                <tr key={idx} onClick={(e) => this.onClickHandler("/ask/view/"+contents.id, e)}>
                                    <td>{contents.title}</td>
                                    <td>글쓴이</td>
                                    <td>작성 시간</td>
                                    <td>처리상태</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 

            </div>
      </main>
      )};
}

export default LatestAsk;