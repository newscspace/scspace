import React, {Component} from 'react';
import '../static/css/calendar.css';
import {get} from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

class Calendar extends Component {

  constructor(props){
    super(props);

    this.daylist = {0:"Sun", 1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat"};
    this.monthlist = {0:"Jan", 1:"Feb", 2:"Mar", 3:"Apr", 4:"May", 5:"Jun", 6:"Jul", 7:"Aug", 8:"Sept", 9:"Oct", 10:"Nov", 11:"Dec"}
    this.state = {
      year : new Date().getFullYear(),
      month : new Date().getMonth(),
      date : new Date().getDate(),
      day : new Date().getDay(),
      filter : '전체',
      reservation_list : [] 
    }

    

    this.spacelist = {
      '전체' : 'all',
      '개인연습실':"individual-practice-room",
      '피아노실':"piano-room",
      '세미나실':"seminar-room",
      '합주실':"group-practice-room",
      '무예실':"dance-studio",
      '울림홀':"ullim-hall",
      '미래홀':"mirae-hall",
      '창작공방':"workshop",
      '오픈스페이스':"open"
    }
   
  }

  MonthChangeHandler = (e) =>{
    if (e.target.name === "prev"){
      let new_month = this.state.month - 1;
      if (new_month < 0) {
        new_month = 11;
        this.setState({month : new_month, year:this.state.year-1})
      }
      else{
        this.setState({month : new_month})
      }
    }
    else if (e.target.name === "next"){
      let new_month = this.state.month + 1;
      if (new_month > 11) {
        new_month = 0;
        this.setState({month : new_month, year:this.state.year+1})
      }
      else{
        this.setState({month : new_month})
      }
    }
    else{
      this.setState({year : new Date().getFullYear(),
      month : new Date().getMonth(),
      date : new Date().getDate(),
      day : new Date().getDay()})
    }
  }

  SpaceHandler = (space) => {
    this.setState({filter:space})
  }
componentDidMount(){
    this.callApi()
        .then(res => this.setState({reservation_list : res}))
        .catch(err => console.log(err));
}

callApi= async () => {
    const res = await get('/api/reservation/all');
    const body = await res.data;
    return body;
}



  render() {
    this.firstday = (1-new Date(this.state.year+'-'+(this.state.month+1)+'-'+ '1').getDay());
    this.lastdate =  (new Date(this.state.year, (this.state.month+1),'0').getDate());

    return (
        <section>
          
<div className="container py-5">
<div className="calendar form-inline shadow bg-white p-5">


    <div className="select col-lg-5">
    <div className="col-md-4">   
       
                <Dropdown >
              <Dropdown.Toggle className="btn-getstarted scrollto" id="dropdown-basic" >
                {this.state.filter}
              </Dropdown.Toggle>
        
              <Dropdown.Menu>
                {Object.keys(this.spacelist).map((team) =>{
                  return (
                    <Dropdown.Item onClick={() =>{this.SpaceHandler(team) }}>{team}</Dropdown.Item>
                  )
                })}
                
              
                
            
              </Dropdown.Menu>
            </Dropdown>
                    
    </div>
    </div>

  <div className="d-flex align-items-center">
    <h2 className="month font-weight-bold mb-0">{this.monthlist[this.state.month%12] + " " + this.state.year}</h2>
    

  </div>
  
  <div className="btn-group float-end">
    
    <button type="button" name="prev" className="btn btn-primary" onClick={this.MonthChangeHandler}>Prev</button>
  
    <button type="button" name="now" className="btn btn-light"  onClick={this.MonthChangeHandler} ></button>
    <button type="button" name="next" className="btn btn-success" onClick={this.MonthChangeHandler}>Next</button>
    
  </div>
  
   <br/><br/><br/>
  
  <ol className="day dayday-names list-unstyled">
    {Object.keys(this.daylist).map((day) => {
        return(
          <li className="font-weight-bold text-uppercase">{this.daylist[day]}</li>
        )
    })}
  </ol>

  <ol className="days list-unstyled">
    {
      [...Array(42)].map((n, index) => {
       return(<li className={(this.firstday+index < 1 ||  this.firstday+index > this.lastdate) ? "outside date" : "date"}>
                <div className={"date"}>
                  {new Date(this.state.year, this.state.month, this.firstday+index).getDate()}
                   
                </div>
                <i className="piano"></i>
              </li>)}) 
    }
  </ol>
</div>
</div>
        </section>
    );
  }
}

export default Calendar;  