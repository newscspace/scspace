import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'axios';

class Notice extends Component{

    constructor(props){
        super(props);
        this.state = {
            page_number : 1,
            list : [],
            content : ''
            
        }

        

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
        <table className="table">
            <thead>
               <tr>
                <th>No</th>
                <th>제목</th>
                <th>날짜</th>
                <th>조회수</th>
               </tr>
            </thead>
    
    <tbody>
        {this.state.list.slice((this.state.page_number-1)*10, this.state.page_number*10).map((contents) => {
            return(
                <tr>
                    
                    <td>{contents.important ? <b style={{color:"red"}}>필독</b>:contents.id}</td> {/* 무엇으을 넣으으을까요오*/}
                    <td><Link to={"/notice/view/"+contents.id}>{contents.title}</Link></td>
                    <td>{contents.date}</td>
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

export default Notice;