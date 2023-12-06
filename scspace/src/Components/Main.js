import React, {useState, useEffect} from 'react';
import Password from './Password';
import EmergencyNotice from './notice/EmergencyNotice'
import Banner from './Banner'
import FastNotice from './notice/FastNotice';
import FAQ from './faq/FAQ'
import LoginCheck from './auth/LoginCheck';
import {get} from 'axios';


const Main = (props) => {

    const [studentID, setStudentID] = useState(null);
    const [gprValid, setGprValid] = useState(false);

    const callApi = async () => {
        const res = await get('/api/etc/check_reserved?id=' + studentID);
        const body = await res.data;
        return body;
    }

    useEffect(() => {
        LoginCheck()
        .then((result) => {
            setStudentID(result.student_id);
            console.log(studentID === "20230544")
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
                <EmergencyNotice isLJM={studentID === "20230544"}/>
            </div>
            <Banner/>
            <FastNotice/>
            <FAQ main={true} history={props.history}/>
        </div>
    );
}

export default Main;