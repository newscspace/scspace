import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {Dropdown, DropdownButton} from 'react-bootstrap';

const Recurrence = (props) => {

    const [isRecurrence, setIsRecurrence] = useState(false);
    const [interval, setInterval] = useState(1);
    const [recurUntil, setRecurUntil] = useState(null);
    const [byday, setByday] = useState([2]);

    const month2day = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const handleIsRecur = () => {
        props.onChangeHandler("TOGGLE", 0);
        setIsRecurrence(!isRecurrence);
    }

    const handleValue = (event) => {
        if(!isNaN(event.target.value) && event.target.value !== ""){
            setInterval(parseInt(event.target.value));
            props.onChangeHandler("INTERVAL", event.target.value);
        }
    }

    const decreaseInterval = () => {
        if(interval > 1){
            setInterval(interval - 1);
            props.onChangeHandler("INTERVAL", interval - 1);
        }
    }

    const increaseInterval = () => {
        setInterval(interval + 1);
        props.onChangeHandler("INTERVAL", interval + 1);
    }

    const handleDay = (event) => {
        let x = parseInt(event.target.id);
        let new_byday = byday.slice();
        if(byday.includes(x)){
            new_byday.splice(byday.indexOf(x), 1);
            setByday(new_byday);
        }
        else{
            new_byday.push(x);
            setByday(new_byday);
        }
        props.onChangeHandler("BYDAY", new_byday);
    }

    return(
        <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" onChange={handleIsRecur}/>
              <label className="form-check-label">정기예약</label>
            </div>
            {isRecurrence ? (
            <div className="container features" id="features">
                 {/* {<div>
                    <button type="button" key={1} className={freq === "hourly"  ? "active-freq-button" : "freq-button"} onClick={handleFreq}>hourly</button>
                    <button type="button" key={2} className={freq === "daily"   ? "active-freq-button" : "freq-button"} onClick={handleFreq}>daily</button>
                    <button type="button" key={3} className={freq === "weekly"  ? "active-freq-button" : "freq-button"} onClick={handleFreq}>weekly</button>
                    <button type="button" key={4} className={freq === "monthly" ? "active-freq-button" : "freq-button"} onClick={handleFreq}>monthly</button>
                    <button type="button" key={5} className={freq === "yearly"  ? "active-freq-button" : "freq-button"} onClick={handleFreq}>yearly</button>
                </div>} */}

                {/* {freq === "hourly"?(
                <div className="mid-align">
                    <h5 className="top-margin1">간격(시간)</h5>
                    <div className="interval-block">
                        <button type="button" onClick={decreaseInterval}>-</button>
                        <input type="text" value={interval} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValue}/>
                        <button type="button" onClick={increaseInterval}>+</button>
                    </div>
                </div>
                ):<div/>} */}

                {/* {freq === "daily"?(
                <div className="mid-align">
                    <h5 className="top-margin1">간격(일)</h5>
                    <div className="interval-block">
                        <button type="button" onClick={decreaseInterval}>-</button>
                        <input type="text" value={interval} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValue}/>
                        <button type="button" onClick={increaseInterval}>+</button>
                    </div>
                </div>
                ):<div/>} */}

                
                <div className="mid-align">
                    <div className="top-margin1 selectday">
                        <h5>해당 날짜</h5>
                        <div>
                            <button type="button" id={1} className={byday.includes(1) ? "active_day" : "inactive_day"} onClick={handleDay}>MON</button>
                            <button type="button" id={2} className={byday.includes(2) ? "active_day" : "inactive_day"} onClick={handleDay}>TUE</button>
                            <button type="button" id={3} className={byday.includes(3) ? "active_day" : "inactive_day"} onClick={handleDay}>WED</button>
                            <button type="button" id={4} className={byday.includes(4) ? "active_day" : "inactive_day"} onClick={handleDay}>THR</button>
                            <button type="button" id={5} className={byday.includes(5) ? "active_day" : "inactive_day"} onClick={handleDay}>FRI</button>
                            <button type="button" id={6} className={byday.includes(6) ? "active_day" : "inactive_day"} onClick={handleDay}>SAT</button>
                            <button type="button" id={7} className={byday.includes(7) ? "active_day" : "inactive_day"} onClick={handleDay}>SUN</button>
                        </div>
                    </div>
                    <h5 className="top-margin1">간격(주)</h5>
                    <div className="interval-block">
                        <button type="button" onClick={decreaseInterval}>-</button>
                        <input type="text" value={interval} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValue}/>
                        <button type="button" onClick={increaseInterval}>+</button>
                    </div>
                </div>
                

                {/* {freq === "monthly"?(
                <div className="mid-align">
                    <h5 className="top-margin1">일자 선택</h5>
                    <div className="monthday-block">
                        <button type="button" onClick={decreaseIntervalMonthDay}>-</button>
                        <input type="text" value={byMonthDay} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValueMonthDay}/>
                        <button type="button" onClick={increaseIntervalMonthDay}>+</button>
                    </div>
                    <h5 className="top-margin1">간격(월)</h5>
                    <div className="interval-block">
                        <button type="button" onClick={decreaseInterval}>-</button>
                        <input type="text" value={interval} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValue}/>
                        <button type="button" onClick={increaseInterval}>+</button>
                    </div>
                </div>
                ):<div/>} */}

                {/* {freq === "yearly"?(
                <div className="mid-align">
                    <h5 className="top-margin1">월과 날짜 선택</h5>
                    <div className="yearday">
                        <DropdownButton
                        className="yearday-block"
                        id="dropdown-yearly"
                        drop="down"
                        title={String(byMonth) + "월"}
                        onSelect={handleValueByMonthInYear}>
                            <div className="selectbar">
                            {[...Array(12).keys()].map((month) => {return(
                                <Dropdown.Item eventKey={month+1}>{month + 1}</Dropdown.Item>
                            )})}
                            </div>
                        </DropdownButton>
                    <div className="width-margin-block1"/>
                        <DropdownButton
                        className="yearday-block"
                        id="dropdown-monthly"
                        drop="down"
                        title={String(byMonthDay) + "일"}
                        onSelect={handleValueByMonthDayInYear}>
                            <div className="selectbar">
                            {[...Array(month2day[byMonth - 1]).keys()].map((day) => {return(
                                <Dropdown.Item eventKey={day+1}>{day + 1}</Dropdown.Item>
                            )})}
                            </div>
                        </DropdownButton>
                    </div>
                    <h5 className="top-margin1">간격(년)</h5>
                    <div className="interval-block">
                        <button type="button" onClick={decreaseInterval}>-</button>
                        <input type="text" value={interval} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValue}/>
                        <button type="button" onClick={increaseInterval}>+</button>
                    </div>
                </div>
                ):<div/>} */}

                <div className="recur-until-timebox">
                    <DatePicker
                        onChange={(date) => {setRecurUntil(date); props.onChangeHandler("UNTIL", date);}}
                        selected={recurUntil}
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        selectsStart
                        placeholderText="종료 시각"
                        timeIntervals={10}
                    />
                </div>

            </div>
            ):<div/>}
            <hr/>
            <br/>
        </div>
    );
}

export default Recurrence;