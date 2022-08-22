import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {setHours, setMinutes} from "date-fns";
import 'react-datepicker/dist/react-datepicker.css';

    const calcDate = (date, days) => {
      let startdate = new Date(date);
      return new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + days);
    }

    // const calcTime = (date, maxtime) => {
    //   let startdate = new Date(date);
    //   let possibleTimeList = [];
    //    for (let i = 1; i<= maxtime*60; i+=10){
    //     possibleTimeList.push(new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate(), startdate.getHours(), startdate.getMinutes() + i))
    //   }


    //   return possibleTimeList;
      
    // }

    // const getTime = (date, maxtime) => {
    //   let startdate= new Date(date);
      
      
    //   return new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate(), startdate.getHours()+maxtime, startdate.getMinutes())
    // }

 

    const Time = (props) => {

      const [startDate, setStartDate] = useState();
      const [endDate, setEndDate] = useState();
      const [rehersalStartDate, setrehersalStartDate] = useState();
      const [rehersalEndDate, setrehersalEndDate] = useState();
      const [lastRehersalStartDate, setlastrehersalStartDate] = useState();
      const [lastRehersalEndDate, setlastrehersalEndDate] = useState(); 

      const filterTime = (time) => {
        const startTime = new Date(startDate);
        const selectedTime = new Date(time);
        const limitTime = 
        (props.limitdate.maxUseHour === -1 ? 
          new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 24, 0)

          : new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + props.limitdate.maxUseHour, startTime.getMinutes()))

        return (startTime.getTime() < selectedTime.getTime()) && (limitTime.getTime() >= selectedTime.getTime());
    };

    const filterTimeRehersal = (time) => {
      const startTime = new Date(rehersalStartDate);
      const realStartTime = new Date(startDate);
      const selectedTime = new Date(time);
      const limitTime = 
      (props.limitdate.maxUseHour === -1 ? 
        new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 24, 0)

        : new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + props.limitdate.maxUseHour, startTime.getMinutes()))
      return (startTime.getTime() < selectedTime.getTime()) && (limitTime.getTime() >= selectedTime.getTime()) && (selectedTime.getTime() <= realStartTime.getTime());
  };

  const filterTimeLastRehersal = (time) => {
    const startTime = new Date(lastRehersalStartDate);
    const selectedTime = new Date(time);
    const limitTime = 
    (props.limitdate.maxUseHour === -1 ? 
      new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 24, 0)

      : new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + props.limitdate.maxUseHour, startTime.getMinutes()))
    return (startTime.getTime() < selectedTime.getTime()) && (limitTime.getTime() >= selectedTime.getTime());
};
    



      return (
        <div>
            <div className="row">
            <h5>시간</h5>
            <div className="col-md-6 form-group">
            시작 시간<DatePicker
              onChange = {(date) => {setStartDate(date); props.onChangeHandler('timeFrom', date)}}
              selected = {startDate}
              minDate={calcDate(new Date(), props.limitdate.mindays)}
              maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control" 
              selectsStart

              timeIntervals={10}
              // startDate={startDate}
              // endDate={endDate}

              showTimeSelect
              required/>
            </div>

            { startDate ? 
            (<div className="col-md-6 form-group mt-3 mt-md-0">
            종료 시간<DatePicker
              onChange = {(date) => {setEndDate(date); props.onChangeHandler('timeTo', date)}}
              selected={endDate}

              minDate={startDate}
              maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              //minTime = {startDate}
              //maxTime={getTime(startDate, 2)}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
              selectsEnd
              //includeTimes={calcTime(startDate, props.limitdate.maxUseHour)}
              // startDate={startDate}
              // endDate={endDate}
              filterTime ={filterTime}
              timeIntervals={10}
              showTimeSelect
              required/>
            </div>
          ) : (
            <div className="col-md-6 form-group mt-3 mt-md-0">
            종료 시간<DatePicker
              className="form-control"
              disabled
              required/>
            </div>
          )
          }
          </div>

          {props.rehersal?
          (<div className="row">
            <div className="col-md-6 form-group">
            당일 리허설 시작 시간<DatePicker
              onChange = {(date) => {setrehersalStartDate(date); props.onChangeHandler('rehersalFrom', date, true)}}
              selected = {rehersalStartDate}
              minDate={calcDate(new Date(), props.limitdate.mindays)}
              maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control" 
              selectsStart

              timeIntervals={10}
              // startDate={startDate}
              // endDate={endDate}

              showTimeSelect
              />
            </div>

            { rehersalStartDate ? 
            (<div className="col-md-6 form-group mt-3 mt-md-0">
            당일 리허설 종료 시간<DatePicker
              onChange = {(date) => {setrehersalEndDate(date); props.onChangeHandler('rehersalTo', date, true)}}
              selected={rehersalEndDate}

              minDate={rehersalStartDate}
              maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              //minTime = {startDate}
              //maxTime={getTime(startDate, 2)}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
              selectsEnd
              //includeTimes={calcTime(startDate, props.limitdate.maxUseHour)}
              // startDate={startDate}
              // endDate={endDate}
              filterTime ={filterTimeRehersal}
              timeIntervals={10}
              showTimeSelect
              />
            </div>
          ) : (
            <div className="col-md-6 form-group mt-3 mt-md-0">
            당일 리허설 종료 시간<DatePicker
              className="form-control"
              disabled
              />
            </div>
          )
          }
          </div>) : <div></div>
          }

          {props.rehersalLastday?
          (
            <div className="row">
            <div className="col-md-6 form-group">
            전날 리허설 시작 시간<DatePicker
              onChange = {(date) => {setlastrehersalStartDate(date); props.onChangeHandler('rehersalLastdayFrom', date, true)}}
              selected = {lastRehersalStartDate}
              minDate={calcDate(new Date(), props.limitdate.mindays-1)}
              maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control" 
              selectsStart

              timeIntervals={10}
              // startDate={startDate}
              // endDate={endDate}

              showTimeSelect
              />
            </div>

            { lastRehersalStartDate ? 
            (<div className="col-md-6 form-group mt-3 mt-md-0">
            전날 리허설 종료 시간<DatePicker
              onChange = {(date) => {setlastrehersalEndDate(date); props.onChangeHandler('rehersalLastdayTo', date, true)}}
              selected={lastRehersalEndDate}

              minDate={lastRehersalStartDate}
              maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              //minTime = {startDate}
              //maxTime={getTime(startDate, 2)}
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
              selectsEnd
              //includeTimes={calcTime(startDate, props.limitdate.maxUseHour)}
              // startDate={startDate}
              // endDate={endDate}
              filterTime ={filterTimeLastRehersal}
              timeIntervals={10}
              showTimeSelect
              />
            </div>
          ) : (
            <div className="col-md-6 form-group mt-3 mt-md-0">
            전날 리허설 종료 시간<DatePicker
              className="form-control"
              disabled
              />
            </div>
          )
          }
          </div>) : <div></div>
          }
              <hr/><br/>
        </div>
        
      )

    }
     


export default Time;