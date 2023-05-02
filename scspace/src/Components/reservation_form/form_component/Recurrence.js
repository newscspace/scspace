import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {Dropdown, DropdownButton} from 'react-bootstrap';

const Recurrence = (props) => {

    const [isRecurrence, setIsRecurrence] = useState(false);
    const [freq, setFreq] = useState("weekly");
    const [interval, setInterval] = useState(1);
    const [recurRule, setRecurRule] = useState("never");
    const [recurUntil, setRecurUntil] = useState(null);
    const [recurCount, setRecurCount] = useState(null);
    const [byday, setByday] = useState([2]);
    const [byMonthDay, setByMonthDay] = useState(1);
    const [byMonth, setByMonth] = useState(1);

    const month2day = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const handleIsRecur = () => {
        setIsRecurrence(!isRecurrence);
        props.onChangeHandler("TOGGLE", 0);
    }

    const handleFreq = (event) => {
        let newFreq = event.target.textContent;
        setFreq(newFreq);
        props.onChangeHandler("FREQ", newFreq);
        if(newFreq === 'weekly'){
            setByday([2]);
        }
        if(newFreq === 'monthly'){
            setByMonthDay(1);
        }
        if(newFreq === 'yearly'){
            setByMonthDay(1);
            setByMonth(1);
        }
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

    const handleValueCount = (event) => {
        if(!isNaN(event.target.value) && event.target.value !== ""){
            setRecurCount(parseInt(event.target.value));
            props.onChangeHandler("COUNT", event.target.value);
        }
    }

    const decreaseIntervalCount = () => {
        if(recurCount > 1){
            setRecurCount(recurCount - 1);
            props.onChangeHandler("COUNT", recurCount - 1);
        }
    }

    const increaseIntervalCount = () => {
        setRecurCount(recurCount + 1);
        props.onChangeHandler("COUNT", recurCount + 1);
    }

    const handleCheckbox = (event) => {
        setRecurRule(event.target.value);
        if(event.target.value === "never"){
            setRecurUntil(null);
            setRecurCount(null);
            props.onChangeHandler("UNTIL", -1);
            props.onChangeHandler("COUNT", -1);
        }
        if(event.target.value === "until"){
            setRecurUntil(new Date());
            setRecurCount(null);
            props.onChangeHandler("UNTIL", new Date());
            props.onChangeHandler("COUNT", -1);
        }
        if(event.target.value === "count"){
            setRecurUntil(null);
            setRecurCount(1);
            props.onChangeHandler("UNTIL", -1);
            props.onChangeHandler("COUNT", 1);
        }
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

    const handleValueMonthDay = (event) => {
        if(!isNaN(event.target.value) && event.target.value !== ""){
            setByMonthDay(parseInt(event.target.value));
            props.onChangeHandler("BYMONTHDAY", event.target.value);
        }
    }

    const decreaseIntervalMonthDay = () => {
        if(byMonthDay > 1){
            setByMonthDay(byMonthDay - 1);
            props.onChangeHandler("BYMONTHDAY", byMonthDay - 1);
        }
    }

    const increaseIntervalMonthDay = () => {
        if(byMonthDay < 31){
            setByMonthDay(byMonthDay + 1);
            props.onChangeHandler("BYMONTHDAY", byMonthDay + 1);
        }
    }

    const handleValueByMonthInYear = (eventKey) => {
        setByMonth(eventKey);
        props.onChangeHandler("BYMONTH", eventKey);
    }

    const handleValueByMonthDayInYear = (eventKey) => {
        setByMonthDay(eventKey);
        props.onChangeHandler("BYMONTHDAY", eventKey);
    }

    return(
        <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" onChange={handleIsRecur}/>
              <label className="form-check-label">정기예약</label>
            </div>
            {isRecurrence ? (
            <div className="container features" id="features">
                 <div>
                    <button type="button" key={1} className={freq === "hourly"  ? "active-freq-button" : "freq-button"} onClick={handleFreq}>hourly</button>
                    <button type="button" key={2} className={freq === "daily"   ? "active-freq-button" : "freq-button"} onClick={handleFreq}>daily</button>
                    <button type="button" key={3} className={freq === "weekly"  ? "active-freq-button" : "freq-button"} onClick={handleFreq}>weekly</button>
                    <button type="button" key={4} className={freq === "monthly" ? "active-freq-button" : "freq-button"} onClick={handleFreq}>monthly</button>
                    <button type="button" key={5} className={freq === "yearly"  ? "active-freq-button" : "freq-button"} onClick={handleFreq}>yearly</button>
                </div>

                {freq === "hourly"?(
                <div className="mid-align">
                    <h5 className="top-margin1">간격(시간)</h5>
                    <div className="interval-block">
                        <button type="button" onClick={decreaseInterval}>-</button>
                        <input type="text" value={interval} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValue}/>
                        <button type="button" onClick={increaseInterval}>+</button>
                    </div>
                </div>
                ):<div/>}

                {freq === "daily"?(
                <div className="mid-align">
                    <h5 className="top-margin1">간격(일)</h5>
                    <div className="interval-block">
                        <button type="button" onClick={decreaseInterval}>-</button>
                        <input type="text" value={interval} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValue}/>
                        <button type="button" onClick={increaseInterval}>+</button>
                    </div>
                </div>
                ):<div/>}

                {freq === "weekly"?(
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
                ):<div/>}

                {freq === "monthly"?(
                <div className="mid-align">
                    <h5 className="top-margin1">일자 선택</h5>
                    <div className="monthday-block"> {/* interval-block 이랑 count-block이 색깔 차이밖에 없으면 어떻게 좀 바꿀까 */}
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
                ):<div/>}

                {freq === "yearly"?(
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
                ):<div/>}

                <div className="mid-align recur-checkbox">
                    <h5>종료 시점 선택</h5>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" name="repeatuntil" type="checkbox" id="MemberChkBx1" checked={recurRule === "never"} value="never" onChange={handleCheckbox}/>
                        <label className="form-check-label" for="MemberChkBx1">영구</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" name="repeatuntil" type="checkbox" id="MemberChkBx2" checked={recurRule === "until"} value="until" onChange={handleCheckbox}/>
                        <label className="form-check-label" for="MemberChkBx2">종료 시점 선택</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" name="repeatuntil" type="checkbox" id="MemberChkBx3" checked={recurRule === "count"} value="count" onChange={handleCheckbox}/>
                        <label className="form-check-label" for="MemberChkBx3">일정 횟수 반복</label>
                    </div>
                </div>

                {recurRule === "until"?(
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
                ):<div/>}

                {recurRule === "count"?(
                <div className="mid-align">
                    <div className="count-block">
                        <button type="button" onClick={decreaseIntervalCount}>-</button>
                        <input type="text" value={recurCount} inputMode="decimal" min="1" max="undef" step="1" onChange={handleValueCount}/>
                        <button type="button" onClick={increaseIntervalCount}>+</button>
                    </div>
                </div>
                ):<div/>}

            </div>
            ):<div/>}
            <hr/>
            <br/>
        </div>
    );
}

export default Recurrence;