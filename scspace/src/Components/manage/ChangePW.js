import React, {useState} from 'react';
import {post} from "axios";

const ChangePW = (props) => {

    const [isClicked, setIsClicked] = useState(false);

    const sendPost_GRP = () => {
        const url = '/api/etc/new_grp';
        const config = {
            headers : {
            'Content-Type' : 'application/json'
            }
        }
        
        return post(url, JSON.stringify({}), config);
    }
    const sendPost_WS = () => {
        const url = '/api/etc/new_ws';
        const config = {
            headers : {
            'Content-Type' : 'application/json'
            }
        }
        
        return post(url, JSON.stringify({}), config);
    }

    const handleValue = () => {
        if(props.space === "GRP"){
            sendPost_GRP()
            .then((res) => {setIsClicked(true);})
        }
        if(props.space === "WS"){
            sendPost_WS()
            .then((res) => {setIsClicked(true);})
        }
    }

    const kor = (space) => {
        if(space === "GRP") return "합주실";
        if(space === "WS")  return "창작공방"
    }

    return(
        <div>
            <div className="mid-align"><b>{isClicked ? "변경 완료!" : " "}</b></div>
            <div className="changepw-button">
                <button onClick={handleValue}>{kor(props.space)} 비밀번호 변경</button>
            </div>
        </div>
    );
}

export default ChangePW;