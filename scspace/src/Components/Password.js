import React, {useState, useEffect} from "react";
import {get, post} from "axios";

const Password = (props) => {

    const [GRPPassword, setGRPPassword] = useState();

    const callApi = async () => {
        const res = await get('/api/etc/get_grp');
        const body = await res.data;
        return body;
    }

    useEffect(() => {
        callApi()
        .then((result) => {setGRPPassword(result);})
        .catch(err => console.log(err));
    }, [])

    return(
        <div className="password-container">
            <h2>합주실 비밀번호</h2>
            <h2>{GRPPassword}</h2>
        </div>
    )
}

export default Password;