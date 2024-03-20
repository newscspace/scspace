import React, {useState} from 'react';
import {post} from "axios";

const ChangePW = (props) => {

    const [isClicked, setIsClicked] = useState(false);

    const sendPost = () => {
        const url = '/api/etc/new_grp';
        const config = {
            headers : {
            'Content-Type' : 'application/json'
            }
        }
        
        return post(url, JSON.stringify({}), config);
    }

    const handleValue = () => {
        if(props.space === "GRP"){
            sendPost()
            .then((res) => {setIsClicked(true);})
        }
    }

    return(
        <div>
            <div className="mid-align"><b>{isClicked ? "변경 완료!" : " "}</b></div>
            <div className="changepw-button">
                <button onClick={handleValue}>합주실 / 창작공방 비밀번호 변경</button>
            </div>
        </div>
    );
}

export default ChangePW;