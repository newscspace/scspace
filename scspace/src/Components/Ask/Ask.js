import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import moment from 'moment';
import LoginCheck from '../auth/LoginCheck';

class Ask extends Component{

    constructor(props){
        super(props);
        this.state = {
            page_number : 1,
            list : [],
            handle: {wait: "대기중", receive: "접수됨", solve: "해결됨"}, 
        }
        LoginCheck()
        .then((result) => {
          if (result !== false) this.setState({login:true, UserInfo:result});
          else this.setState({login:false});
        })
    }

    componentDidMount(){
        this.callApi()
            .then(res => {this.setState({list:res});  this.setState({total_page_number : Math.ceil(res.length/10)});} )
            .catch(err => console.log(err));
    }
    
    callApi= async () => {
        const res = await get('/api/ask/all');
        const body = await res.data;
        return body;
    }

    onClickHandler = (link) => {
        this.props.history.push({pathname: link})
    }

    render() {return (
        <div id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                    <h3>문의사항</h3>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/ask">문의사항</Link></li>
                    </ol>
                    </div>
                </div>
            </div>
            <section>
                <div  className="section-header">
                <h2>문의사항</h2>
                <p>Ask</p>
                    <hr/>
                </div>

                <div className="container">
                <div className="text-end">
                    {this.state.login ? (<button type="button" className="modalButton1"><Link to="/ask/create">작성하기</Link></button>) : (<div/>)}
                </div>
                </div>
                <br/>

                <div className="container">
                    <table className="table manage">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>처리 상태</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>날짜</th>
                            <th>조회수</th>
                        </tr>
                        </thead>
                
                        <tbody>
                            {this.state.list.slice((this.state.page_number-1)*10, this.state.page_number*10).map((contents, idx) => {
                                return(
                                    <tr key={idx} onClick={(e) => this.onClickHandler("/ask/view/"+contents.id, e)}>
                                        
                                        <td>{(this.state.page_number-1)*10 + idx+1}</td> 
                                        <td><div className={contents.state}/>{this.state.handle[contents.state]}</td>
                                        <td>{contents.title}</td>
                                        <td>{contents.writer_id}</td>
                                        <td>{moment(contents.time_post).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td>{contents.hits}</td>
                                        
                                    </tr>
                                    
                                )

                            })}
                                
                        </tbody>
                    </table>

                </div>
                <section className="blog">
                    <div className="blog-pagination">
                        <ul className="justify-content-center">

                            {
                                [...Array(this.state.total_page_number)].map((v,i) => i+1).map((page_num) => {
                                    return(<li className={this.state.page_number === page_num ? "active" : ""}onClick={() => {this.setState({page_number : page_num})}}><Link to="#" >{page_num}</Link></li>)

                                })
                                
                            }
                            
                        </ul>
                    </div>
                </section>
            
            </section>
        </div>
    )};
}

export default Ask;