import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get, post} from 'axios';
import ReservModal from './ReserveModal';
import moment from 'moment'
import LoginCheck from '../../auth/LoginCheck';

class ReservationList extends Component{
    constructor(props) {
        super(props);
        LoginCheck() .then((result) => { 
            if (result === false) this.props.history.push('/login'); 
            else if (result.type === 'admin') this.setState({login:true, UserInfo:result}); 
            else this.props.history.push('/'); })

        this.state = {
            page_number : 1,
            list : [],
            selectedList : [],
            showHide : false,
            reservation : null,    
            spaceFilter : 'all',
            stateFilter : 'all',
            handle: {wait: "대기중", grant: "승인됨", rejected: "거절됨"},  
            workHandle: {nowork: "근로 없음", notassigned: "배정 안됨", assigned: "배정 완료"},
        }; 
        
        
        this.spaceDict = {
            'all' : '전체',
            'individual-practice-room1': '개인연습실 1',
            'individual-practice-room2': '개인연습실 2',
            'individual-practice-room3': '개인연습실 3',
            'piano-room1': '피아노실 1',
            'piano-room2': '피아노실 2',
            'group-practice-room': '합주실',
            'dance-studio': '무예실',
            'ullim-hall': '울림홀',
            'mirae-hall': '미래홀',
            'seminar-room1': '세미나실 1',
            'seminar-room2': '세미나실 2',
            'workshop': '창작공방',
            'open-space': '오픈스페이스'
          }
        
    }

    componentDidMount(){
        this.callApi()
            .then(res => {this.setState({list:res, selectedList:res});  this.setState({total_page_number : Math.ceil(res.length/10)});} )
            .catch(err => console.log(err));
    }
    
    callApi= async () => {
        const res = await get('/api/reservation/all');
        const body = await res.data;
        return body;
    }

    handleModalShowHide = (contents, e) => {
        this.setState({
            showHide: !this.state.showHide,            
        })
    }

    callApi_user= async (id) => {
        const res = await get('/api/users/id?id='+id);
        const body = await res.data;
        return body;
    }

    setInfo = (contents, e) => {
        
        this.callApi_user(contents.reserver_id)
            .then(res => {
                this.setState({
                    reservation: contents,
                    reserverInfo : res,
                    showHide: !this.state.showHide,            
                })
            } )
            .catch(err => console.log(err));
    
      
    }

    workStateChange = (work) => {
        if(work === null || work === undefined) return "nowork";
        if(work === false) return "notassigned";
        return "assigned";
    }

    workStateChangeInverse = (work) => {
        if(work === "nowork") return null;
        if(work === "notassigned") return false;
        if(work === "assigned")return true;
    }

    handleValueChange = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate['reservation'][e.target.name] = e.target.value;
        this.setState(nextstate);
    }

    handleValueChange_work = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate['reservation']['content'][e.target.name] = this.workStateChangeInverse(e.target.value);
        this.setState(nextstate);
    }


    handleChange = (e) => {
        let nextstate = Object.assign({}, this.state);
        nextstate[e.target.name] = e.target.value;
        nextstate.selectedList = [];
        
        this.state.list.map((contents) => {
        if ((nextstate.spaceFilter === contents.space || nextstate.spaceFilter === 'all') && (nextstate.stateFilter === contents.state || nextstate.stateFilter === 'all')){
                nextstate.selectedList.push(contents)
        }   
        })

        nextstate.total_page_number = Math.ceil(nextstate.selectedList.length / 5)
        this.setState(nextstate);
      }

      
    sendPost = () => {
        const url = '/api/reservation/comment/create';
        const config = {
          headers : {
            'Content-Type' : 'application/json'
          }
        }
      
        return post(url, JSON.stringify(this.state.reservation), config);
      }

      
   
      handleSubmit = (e) =>{
        e.preventDefault()
        const errmsg = ''
        if(this.checkSubmit()){
            this.sendPost()
            .then((res) => {
              this.setState({showHide:!this.state.showHide})
            })
  
        } 
       
        else{ alert('a') /* error 내용 출력 필요 */}
      }

      checkSubmit = () => {
        return true;
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
            <div className="container">
                <br/>
                <h4><b>최신 예약신청 목록</b></h4>
                <hr></hr>

                <table className="table manage">
                    <thead>
                        <th> 
                            <select name="spaceFilter" value={this.state.space} onChange={this.handleChange}> 
                                {
                                    Object.keys(this.spaceDict).map((space) => {
                                        return (<option value={space}>{this.spaceDict[space]}</option>)
                                    })

                                }
        
                                
                            </select></th>
                        <th>예약자</th>
                        <th>예약 id</th>
                        <th>시간</th>
                        <th>예약한 시간</th>
                        <th> <select name="stateFilter"value={this.state.state} onChange={this.handleChange}> 
                                <option value="all">전체 상태</option>
                                <option value="grant">승인</option>
                                <option value="rejected">거절</option>
                                <option value="wait">대기 중</option>
                            </select></th>
                        <th>근로 배정</th>
                    </thead>

                    <tbody>
                        {this.state.selectedList.slice((this.state.page_number-1)*10, this.state.page_number*10).map((contents) => {
                            return(
                                <tr onClick={(e) => this.setInfo(contents, e)}>
                                    <td>{this.spaceDict[contents.space]}</td>
                                    <td>{contents.reserver_id}</td>
                                    <td>{contents.id}</td>
                                    <td>{moment(contents.time_from).format('MM월 DD일 HH:mm') + '~' + moment(contents.time_to).format('MM월 DD일 HH:mm')}</td>
                                    <td>{moment(contents.time_request).format('MM월 DD일 HH:mm')}</td>
                                    <td><div className={contents.state}/>{this.state.handle[contents.state]}</td>
                                    {contents.content === null ? <td><div className="nowork"/>근로 없음</td> :
                                        <td><div className={this.workStateChange(contents.content.workComplete)}/>{this.state.workHandle[this.workStateChange(contents.content.workComplete)]}</td>
                                    }
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
                <ReservModal modal={this.state} onClickHandler={this.handleModalShowHide} handleSubmit={this.handleSubmit}onChangeHandler2={this.handleValueChange} onChangeHandler3={this.handleValueChange_work}/>

      </main>
      )};
}

export default ReservationList;