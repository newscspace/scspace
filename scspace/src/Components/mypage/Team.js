import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';


class Team extends Component{
    constructor(props) {
        super(props);
        this.state = {
            page_number : 1,
            list : [],
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

    render() {return (
        <main id="main">
            <div className="container">
                <h4><b>내 팀</b></h4>
                <hr></hr>

                <table className="table">
                    <thead>
                        <th>팀 이름</th>
                    </thead>

                    <tbody>
                        {this.state.list.slice((this.state.page_number-1)*5, this.state.page_number*5).map((contents) => {
                            return(
                                <tr>
                                    <td><Link to="../Team">동그라미세모네모</Link></td>
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

export default Team;