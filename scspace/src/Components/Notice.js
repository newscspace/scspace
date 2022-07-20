import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Notice extends Component{

    constructor(props){
        super(props);
        this.a = 0;
        this.state = {
            page_number : 1,
            list : [
                {id:1, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:1, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:1, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:1, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:1, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:1, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:1, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:2, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:3, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:4, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3},
                {id:5, title:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", date:"2019-12-28 00:26:01", hit:3}

            ]
                
            
        }

        

    }

    componentDidMount(){
        this.setState({total_page_number : Math.ceil(this.state.list.length/10)});
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
                    <td>{contents.id}</td>
                    <td>{contents.title}</td>
                    <td>{contents.date}</td>
                    <td>{contents.hit}</td>
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