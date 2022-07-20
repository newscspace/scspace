import React, {Component} from 'react';
import DatePicker from 'react-datepicker';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
        <div>
            <div className="row">
            <h5>시간</h5>
            <div className="col-md-6 form-group">
            시작 시간<DatePicker
              onChange = {(date) => {this.props.onChangeHandler('time_from', date)}}
              selected = {this.props.time_from}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control" 
              showTimeInput
              required/>
            </div>
            <div className="col-md-6 form-group mt-3 mt-md-0">
            종료 시간<DatePicker
              onChange = {(date) => {this.props.onChangeHandler('time_to', date)}}
              name = "time_to"
              selected={this.props.time_to}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
              showTimeInput
              required/>
            </div>
          </div>

          {this.props.rehersal?
          (<div className="row">
           <div className="col-md-6 form-group">
           리허설 시작 시간<DatePicker
             onChange = {(date) => {this.props.onChangeHandler('rehersal_from', date, true)}}
             selected = {this.props.rehersal_from}
             timeInputLabel="Time:"
             dateFormat="MM/dd/yyyy h:mm aa"
             className="form-control" 
             showTimeInput
             required/>
           </div>
           <div className="col-md-6 form-group mt-3 mt-md-0">
           리허설 종료 시간<DatePicker
             onChange = {(date) => {this.props.onChangeHandler('rehersal_to', date, true)}}
             selected={this.props.rehersal_to}
             timeInputLabel="Time:"
             dateFormat="MM/dd/yyyy h:mm aa"
             className="form-control"
             showTimeInput
             required/>
           </div>
          </div>) : <div></div>
          }

          {this.props.rehersal_lastday?
          (
            <div className="row">
            <div className="col-md-6 form-group">
           전날 리허설 시작 시간<DatePicker
             onChange = {(date) => {this.props.onChangeHandler('rehersal_lastday_from', date, true)}}
             selected = {this.props.rehersal_lastday_from}
             timeInputLabel="Time:"
             dateFormat="MM/dd/yyyy h:mm aa"
             className="form-control" 
             showTimeInput
             required/>
           </div>
           <div className="col-md-6 form-group mt-3 mt-md-0">
           전날 리허설 종료 시간<DatePicker
             onChange = {(date) => {this.props.onChangeHandler('rehersal_lastday_to', date, true)}}
             selected={this.props.rehersal_lastday_to}
             timeInputLabel="Time:"
             dateFormat="MM/dd/yyyy h:mm aa"
             className="form-control"
             showTimeInput
             required/>
           </div>
          </div>
          ) : <div></div>
          }
              <hr/><br/>
        </div>
        
      )};
}

export default Form;