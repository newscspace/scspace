import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from '../auth/LoginCheck';
import {get} from 'axios';

class Team extends Component{
    constructor(props){
        super(props);
        this.state = {
            login:false,
            teamdata :{team_name : '', member : [{name:'', student_id:''}]}
        }

        if (!this.props.location.state) {this.props.history.push({pathname:'/team/create'});}
        LoginCheck()
        .then((result) => {
          if (result === false) {this.props.history.push({pathname : '/login'});}
          else this.setState({login:true, UserInfo:result});
        });

        this.callApi()
        .then(res => {this.setState({teamdata:res}); } )
        .catch(err => console.log(err));
  
        
    }

    callApi= async () => {
        const res = await get('/api/team/id?id='+this.props.location.state);
        const body = await res.data;
        return body;
    }

    render() {return (
        <main id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                    <h3>나의 팀</h3>
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/introduction">나의 팀</Link></li>
                    </ol>
                    </div>
                </div>
            </div>

            <section className="section-header">
                <div className="contact">
                    <div className="confirm">            
                        <div className="info">
                            <h3>등록된 팀의 정보입니다.</h3>
                            <br/>
                                <div className="conf-item txt">
                                    <div>
                                        <h4>팀 정보</h4>
                                        <hr/>
                                        <div className="wrap">
                                            <p className="ptitle">팀 이름</p>
                                            <p className="ptxt">{this.state.teamdata.team_name}</p>
                                        </div>
                                        <div>
                                            <div className="wrap">
                                                <p className="ptitle">팀 대표자</p>
                                                <p className="pteamtxt">{this.state.login ? this.state.UserInfo.name : (<div/>)}</p>
                                                <p className="ptxt"></p>
                                            </div>
                                            <div className="wrap">
                                                <p className="team">학번</p>
                                                <p className="ptxt">{this.state.login ? this.state.UserInfo.student_id: (<div/>)}</p>
                                            </div>
                                            <div className="wrap">
                                                <p className="team">전화번호</p>
                                                <p className="ptxt">{this.state.login ? this.state.UserInfo.phone : (<div/>)}</p>
                                            </div>
                                            <div className="wrap">
                                                <p className="team">이메일</p>
                                                <p className="ptxt">{this.state.login ? this.state.UserInfo.email : (<div/>)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br/><br/>
                                    <div>
                                        <h4>팀원 정보</h4>
                                        <hr/>
                                        <table className="table">
                                            <thead>
                                                <th>#</th>
                                                <th>이름</th>
                                                <th>학번</th>
                                            </thead>
                                            <tbody>
                                                {this.state.teamdata.member.map((member, idx) => {
                                                    return (
                                                        <tr>
                                                            <td>{idx+1}</td>
                                                            <td>{member.name}</td>
                                                            <td>{member.student_id}</td>
                                                        </tr>
                                                    )
                                                })}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )};
}

export default Team;