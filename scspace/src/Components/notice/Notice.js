import React, {Component, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';
import moment from 'moment';
import LoginCheck from '../auth/LoginCheck';

function Notice(props){
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPageNumber, setTPN] = useState(1);
    const [list, setList] = useState([]);
    const [content, setContent] = useState([]);
    const [login, setLogin] = useState(false);
    const [UserInfo, setUserInfo] = useState(null);

    LoginCheck()
    .then((result) => {
        if (result !== false)
        {
            setLogin(true);
            setUserInfo(result);
        }
    })

    const callApi= async () => {
        const res = await get('/api/notice/all');
        const body = await res.data;
        return body;
    }

    const onClickHandler = (link) => {
        console.log(link)
        props.history.push({pathname: link})
    }

    useEffect(() => {
        callApi()
        .then(res => {setList(res); setTPN(Math.ceil(res.length/10));} )
        .catch(err => console.log(err));
    }, [])

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
                    <h2>공지사항</h2>
                    <p>Notice</p>
                    <hr/>
                </div>

                <div className="container">
                    {login === true && UserInfo.type==='admin' ? 
                    (<div className="text-end">
                        <button type="button" className="modalButton1"><Link to="/notice/create">작성하기</Link></button>
                    </div>) : (<div></div>)}
                </div>
                <br/>
                <div className="container">
                    <table className="table manage">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>조회수</th>
                        </tr>
                        </thead>
                        <tbody>
                            {list.slice((pageNumber-1)*10, pageNumber*10).map((contents, idx) => {
                                return(
                                    <tr key={idx} onClick={(event) => onClickHandler("/notice/view/"+contents.id, event)}>
                                        <td>{contents.important ? <b style={{color:"var(--color-primary-light)"}}>필독</b>:(pageNumber-1)*10 + idx+1}</td> {/* 무엇으을 넣으으을까요오*/}
                                        <td>{contents.title}</td>
                                        <td>{moment(contents.time_edit === null ? contents.time_post : contents.time_edit).format('YYYY-MM-DD HH:mm:ss')}</td>
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
                                [...Array(totalPageNumber)].map((v,i) => i+1).map((pagenum) => {
                                    return(<li className={pageNumber === pagenum ? "active" : ""} onClick={() => {setPageNumber(pagenum)}}><Link to="#" >{pagenum}</Link></li>)
                                })    
                            }
                        </ul>
                    </div>
                </section>
            </section>
        </div>
    )
}

/*
class Notice extends Component{

    constructor(props){
        super(props);
        this.state = {
            page_number : 1,
            list : [],
            content : ''
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
        const res = await get('/api/notice/all');
        const body = await res.data;
        return body;
    }

    onClickHandler = (link) => {
        console.log(link)
        this.props.history.push({pathname: link})
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
            <section>
                <div  className="section-header">
                <h2>공지사항</h2>
                <p>Notice</p>
                    <hr/>
                </div>

                <div className="container">
                {this.state.login === true && this.state.UserInfo.type==='admin' ? 
                (<div className="text-end">
                    <button type="button" className="modalButton1"><Link to="/notice/create">작성하기</Link></button>
                </div>) : (<div></div>)}
                
                </div>
                <br/>

                <div className="container">
                    <table className="table manage">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>조회수</th>
                        </tr>
                        </thead>
                
                        <tbody>
                            {this.state.list.slice((this.state.page_number-1)*10, this.state.page_number*10).map((contents, idx) => {
                                return(
                                    <tr key={idx} onClick={(e) => this.onClickHandler("/notice/view/"+contents.id, e)}>
                                        
                                        <td>{contents.important ? <b style={{color:"var(--color-primary-light)"}}>필독</b>:(this.state.page_number-1)*10 + idx+1}</td>
                                        <td>{contents.title}</td>
                                        <td>{moment(contents.time_edit === null ? contents.time_post : contents.time_edit).format('YYYY-MM-DD HH:mm:ss')}</td>
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
*/

export default Notice;
