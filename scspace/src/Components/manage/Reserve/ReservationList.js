import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';


class ReservationList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value1: 'all',
            value2: 'all',
            page_number : 1,
            list : [],
        };  

        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange1(event) { 
        this.setState({value1: event.target.value1});
    }
    handleChange2(event) { 
        this.setState({value2: event.target.value2});
    }
    
    handleSubmit(event) {
        // 공간별/상태별 보여주는 함수 작성해야할듯
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
    render() {return (
        <main id="main">
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

            <div className='container'>
                <br/>
                <h4><b>최신 예약신청 목록</b></h4>
                <hr></hr>

                <table className="table">
                    <thead>
                        <th><form onSubmit={this.handleSubmit} className="mypage">
                            <select value={this.state.value} onChange={this.handleChange1}> 
                                <option value="all">전체 공간</option>
                                <option value="piano1">피아노실 1</option>
                                <option value="piano2">피아노실 2</option>
                                <option value="individual1">개인연습실 1</option>
                                <option value="individual2">개인연습실 2</option>
                                <option value="individual3">개인연습실 3</option>
                                <option value="practice">합주실</option>
                                <option value="dance">무예실</option>
                                <option value="ullim">울림홀</option>
                                <option value="mirae">미래홀</option>
                                <option value="seminar1">세미나실1</option>
                                <option value="seminar2">세미나실2</option>
                                <option value="work">창작공방</option>
                                <option value="openspace">오픈스페이스</option>
                            </select>
                            {/* <input type="submit" value="Submit" /> */}
                        </form></th>
                        <th>예약자</th>
                        <th>예약 시간</th>
                        <th>예약한 시간</th>
                        <th><form onSubmit={this.handleSubmit} className="mypage">
                            <select value={this.state.value} onChange={this.handleChange2}> 
                                <option value="all">전체 상태</option>
                                <option value="approved">승인</option>
                                <option value="declined">거절</option>
                                <option value="wait">대기 중</option>
                            </select>
                            {/* <input type="submit" value="Submit" /> */}
                        </form></th>
                    </thead>

                    <tbody>
                        {this.state.list.slice((this.state.page_number-1)*10, this.state.page_number*10).map((contents) => {
                            return(
                                <tr>
                                    <td>개인연습실 1</td>
                                    <td>김네모</td>
                                    <td>07월 25일 00:20 ~ 07월 25일 01:21</td>
                                    <td>07월 24일 00:18</td>
                                    <td>승인</td>
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
            
        </main>
      )};
}

export default ReservationList;