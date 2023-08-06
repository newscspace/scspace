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
    let studentID = null;

    const callApi = async () => {
        const res = await get('/api/etc/check_reserved?id=' + studentID);
        const body = await res.data;
        return body;
    }

    useEffect(() => {
        LoginCheck()
        .then((result) => {
            studentID = result.student_id;
            if (result === false) setGprValid(false);
            else if (result.type === 'admin') setGprValid(true);
            else{
                callApi()
                .then((result) => { setGprValid(result); })
            }
        })
    }, []);

    return (
        <div>
            <div class="top-margin2">
                {gprValid === true ? <Password/> : null}
                {/* <EmergencyNotice/> */}
            </div>
            <Banner/>
            <FastNotice/>
            <FAQ main={true} history={props.history}/>
        </div>
    );
}

export default Main;