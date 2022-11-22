import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from "date-fns";
import 'react-datepicker/dist/react-datepicker.css';
import { withTranslation } from "react-i18next";
import WorkCheckbox from './Checkbox_list'


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

  const { t } = props;

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [rehersalStartDate, setrehersalStartDate] = useState();
  const [rehersalEndDate, setrehersalEndDate] = useState();
  const [lastRehersalStartDate, setlastrehersalStartDate] = useState();
  const [lastRehersalEndDate, setlastrehersalEndDate] = useState();
  const [workStartDate, setworkStartDate] = useState();
  const [workEndDate, setworkEndDate] = useState();
  const [isWork, setIsWork] = useState(false);

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
    //const realStartTime = new Date(startDate);
    const selectedTime = new Date(time);
    const limitTime =
      (props.limitdate.maxUseHour === -1 ?
        new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 24, 0)

        : new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + props.limitdate.maxUseHour, startTime.getMinutes()))
    return (startTime.getTime() < selectedTime.getTime()) && (limitTime.getTime() >= selectedTime.getTime())// && (selectedTime.getTime() <= realStartTime.getTime());
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

  const filterTimeWork = (time) => {
    const startTime = new Date(workStartDate);
    const selectedTime = new Date(time);
    const limitTime =
      (props.limitdate.maxUseHour === -1 ?
        new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 24, 0)

        : new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + props.limitdate.maxUseHour, startTime.getMinutes()))
    return (startTime.getTime() < selectedTime.getTime()) && (limitTime.getTime() >= selectedTime.getTime());
  }

  const handleValueChange_checkbox = (event) => { setIsWork(!isWork); }

  return (
    <div>
      <div className="row">
        <h5>{t('예약 시간')}</h5>
        <div className="col-md-6 form-group">
          {t('시작')}
          <DatePicker
            onChange={(date) => { setStartDate(date); props.onChangeHandler('timeFrom', date); setEndDate(date); }}
            selected={startDate}
            minDate={calcDate(new Date(), props.limitdate.mindays)}
            maxDate={calcDate(new Date(), props.limitdate.maxdays)}
            dateFormat="yyyy/MM/dd h:mm aa"
            className="form-control"
            selectsStart
            placeholderText={t('예약 시작 시간 ~')}
            timeIntervals={10}
            // startDate={startDate}
            // endDate={endDate}

            showTimeSelect
            required />
        </div>

        {startDate ?
          (<div className="col-md-6 form-group mt-3 mt-md-0">
            {t('끝')}
            <DatePicker
              onChange={(date) => { setEndDate(date); props.onChangeHandler('timeTo', date) }}
              selected={endDate}

              // minDate={startDate}
              // maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              //minTime = {startDate}
              //maxTime={getTime(startDate, 2)}
              dateFormat="yyyy/MM/dd h:mm aa"
              className="form-control"
              selectsEnd
              //includeTimes={calcTime(startDate, props.limitdate.maxUseHour)}
              // startDate={startDate}
              // endDate={endDate}a
              placeholderText={t('~ 예약 종료 시간')}
              filterTime={filterTime}
              timeIntervals={10}
              showTimeSelect
              required />
          </div>
          ) : (
            <div className="col-md-6 form-group mt-3 mt-md-0">
              {t('끝')}<DatePicker
                className="form-control"
                disabled
                required />
            </div>
          )
        }
      </div>

      {props.rehersal ?
        (<div className="row">
          <h5>{t('당일 리허설')}</h5>
          <div className="col-md-6 form-group">
            {t('시작')}<DatePicker
              onChange={(date) => { setrehersalStartDate(date); props.onChangeHandler('rehersalFrom', date, true); setrehersalEndDate(date); }}
              selected={rehersalStartDate}
              minDate={calcDate(new Date(), props.limitdate.mindays)}
              maxDate={calcDate(new Date(), props.limitdate.maxdays)}
              dateFormat="yyyy/MM/dd h:mm aa"
              className="form-control"
              selectsStart
              placeholderText={t("없을 시 생략")}
              timeIntervals={10}
              // startDate={startDate}
              // endDate={endDate}

              showTimeSelect
            />
          </div>

          {rehersalStartDate ?
            (<div className="col-md-6 form-group mt-3 mt-md-0">
              {t('끝')}
              <DatePicker
                onChange={(date) => { setrehersalEndDate(date); props.onChangeHandler('rehersalTo', date, true) }}
                selected={rehersalEndDate}

                // minDate={rehersalStartDate}
                // maxDate={calcDate(new Date(), props.limitdate.maxdays)}
                //minTime = {startDate}
                //maxTime={getTime(startDate, 2)}
                dateFormat="yyyy/MM/dd h:mm aa"
                className="form-control"
                selectsEnd
                //includeTimes={calcTime(startDate, props.limitdate.maxUseHour)}
                // startDate={startDate}
                // endDate={endDate}
                filterTime={filterTimeRehersal}
                timeIntervals={10}
                showTimeSelect
              />
            </div>
            ) : (
              <div className="col-md-6 form-group mt-3 mt-md-0">
                {t('끝')}
                <DatePicker className="form-control" disabled />
              </div>
            )
          }
        </div>) : <div></div>
      }

      {props.rehersalLastday ?
        (
          <div className="row">
            <h5>{t('전날 리허설')}</h5>
            <div className="col-md-6 form-group">
              {t('시작')}<DatePicker
                onChange={(date) => { setlastrehersalStartDate(date); props.onChangeHandler('rehersalLastdayFrom', date, true); setlastrehersalEndDate(date);  }}
                selected={lastRehersalStartDate}
                minDate={calcDate(new Date(), props.limitdate.mindays - 1)}
                maxDate={calcDate(new Date(), props.limitdate.maxdays)}
                dateFormat="yyyy/MM/dd h:mm aa"
                className="form-control"
                selectsStart
                placeholderText={"리허설이 없다면 생략"}
                timeIntervals={10}
                // startDate={startDate}
                // endDate={endDate}

                showTimeSelect
              />
            </div>

            {lastRehersalStartDate ?
              (<div className="col-md-6 form-group mt-3 mt-md-0">
                {t('끝')}<DatePicker
                  onChange={(date) => { setlastrehersalEndDate(date); props.onChangeHandler('rehersalLastdayTo', date, true) }}
                  selected={lastRehersalEndDate}

                  // minDate={lastRehersalStartDate}
                  // maxDate={calcDate(new Date(), props.limitdate.maxdays)}
                  //minTime = {startDate}
                  //maxTime={getTime(startDate, 2)}
                  dateFormat="yyyy/MM/dd h:mm aa"
                  className="form-control"
                  selectsEnd
                  //includeTimes={calcTime(startDate, props.limitdate.maxUseHour)}
                  // startDate={startDate}
                  // endDate={endDate}
                  filterTime={filterTimeLastRehersal}
                  timeIntervals={10}
                  showTimeSelect
                />
              </div>
              ) : (
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  {t('끝')}<DatePicker className="form-control" disabled/>
                </div>
              )

            }
          </div>) : <div></div>
      }
      { props.work ?
        (<WorkCheckbox checkboxlist = {{
          '장비를 다룰 수 없는 경우 클릭': 'Click if you can\'t treat the equipment'}
        } head="근로 배정" name="work" onChangeHandler={handleValueChange_checkbox} />)
        : <div/>
      }
      

      { isWork ? 
        (<div className="row">
        <h5>{t('근로 사용 시간')}</h5>
        <div className="col-md-6 form-group">
          {t('시작')}<DatePicker
            onChange={(date) => { setworkStartDate(date); props.onChangeHandler('workFrom', date, true); setworkEndDate(date);  }}
            selected={workStartDate}
            minDate={calcDate(new Date(), props.limitdate.mindays - 1)}
            maxDate={calcDate(new Date(), props.limitdate.maxdays)}
            dateFormat="yyyy/MM/dd h:mm aa"
            className="form-control"
            selectsStart
            placeholderText={""}
            timeIntervals={10}
            // startDate={startDate}
            // endDate={endDate}

            showTimeSelect
          />
        </div>

        {workStartDate ?
          (<div className="col-md-6 form-group mt-3 mt-md-0">
            {t('끝')}<DatePicker
              onChange={(date) => { setworkEndDate(date); props.onChangeHandler('workTo', date, true) }}
              selected={workEndDate}

              dateFormat="yyyy/MM/dd h:mm aa"
              className="form-control"
              selectsEnd

              filterTime={filterTimeWork}
              timeIntervals={10}
              showTimeSelect
            />
          </div>
          ) : (
            <div className="col-md-6 form-group mt-3 mt-md-0">
              {t('끝')}<DatePicker className="form-control" disabled/>
            </div>
          )
        }

        </div>): <div/>

      }
      <hr /><br />
    </div>

  )

}



export default withTranslation()(Time);