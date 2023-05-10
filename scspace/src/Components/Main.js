import React, {useState, useEffect} from 'react';
import Password from './Password';
import Banner from './Banner'
import FastNotice from './notice/FastNotice';
import FAQ from './faq/FAQ'
import LoginCheck from './auth/LoginCheck';
import {get} from 'axios';


const Main = (props) => {

    const [gprValid, setGprValid] = useState(false);

    const callApi = async () => {
        const res = await get('/api/etc/check_reserved');
        const body = await res.data;
        return body;
    }

    useEffect(() => {
        LoginCheck()
        .then((result) => { 
            if (result === false) setGprValid(false);
            else if (result.type === 'admin') setGprValid(true);
            else if (callApi()) setGprValid(true);
        })
    }, []);

    return (
        <div>
            <Password></Password>
            <Banner></Banner>
            <FastNotice></FastNotice>
            <FAQ main={true} history={props.history}></FAQ>
        </div>
    );
}

export default Main;