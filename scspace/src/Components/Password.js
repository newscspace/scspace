import React, {useState, useEffect} from "react";
import {get, post} from "axios";

const Password = (props) => {

    const [GRPPassword, setGRPPassword] = useState();
    
    const encrypt_ws = (x) => {
        x = (parseInt(x * 91335078 / 10))   % 1000000;
        x = (parseInt(x * 32746609 / 1000)) % 1000000;
        x = (parseInt(x * 20186447 / 100))  % 1000000;
        x = (parseInt(x * 65840178 / 100))  % 1000000;
        return x;
    }

    const callApi = async () => {
        const res = await get('/api/etc/get_grp');
        const body = await res.data;
        return body;
    }

    useEffect(() => {
        callApi()
        .then((result) => {setGRPPassword(result);})
        .catch(err => console.log(err));
        console.log()
    }, [])

    return(
        <div>
            {props.space === "grp" ? (
                <div className="password-container">
                    <h2>합주실 비밀번호</h2>
                    <h2>{GRPPassword}</h2>
                </div>
            ) : (
                <div className="password-container">
                    <h2>창작공방 비밀번호</h2>
                    <h2>{encrypt_ws(GRPPassword)}</h2>
                </div>
            )}
        </div>
        
    )
}

export default Password;