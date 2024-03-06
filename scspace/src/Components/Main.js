import React, {useState, useEffect} from 'react';
import Password from './Password';
import EmergencyNotice from './notice/EmergencyNotice'
import Banner from './Banner'
import FastNotice from './notice/FastNotice';
import FAQ from './faq/FAQ'
import LoginCheck from './auth/LoginCheck';
import {get} from 'axios';


const Main = (props) => {

    const [gprValid, setGprValid] = useState(false);
    const [wsValid, setWsValid] = useState(false);
    let studentID = null;

    const callApi_grp = async () => {
        const res = await get('/api/etc/check_reserved_grp?id=' + studentID);
        const body = await res.data;
        return body;
    }
    const callApi_ws = async () => {
        const res = await get('/api/etc/check_reserved_ws?id=' + studentID);
        const body = await res.data;
        return body;
    }

    useEffect(() => {
        LoginCheck()
        .then((result) => {
            studentID = result.student_id;
            if (result === false){
                setGprValid(false);
                setWsValid(false);
            }
            else if (result.type === 'admin'){
                setGprValid(true);
                setWsValid(true);
            }
            else{
                callApi_grp()
                .then((result) => { setGprValid(result); })
                callApi_ws()
                .then((result) => { setWsValid(result); })
            }
        })
    }, []);

    return (
        <div>
            <div class="top-margin2">
                {gprValid === true ? <Password space="grp" /> : null}
                {wsValid === true ? <Password space="ws" /> : null}
                <EmergencyNotice/>
            </div>
            <Banner/>
            <FastNotice/>
            <FAQ main={true} history={props.history}/>
        </div>
    );
}

export default Main;