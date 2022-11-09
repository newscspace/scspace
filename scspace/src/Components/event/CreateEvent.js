import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from '../auth/LoginCheck';

function CreateEvent(props){
    const [s, changeS] = useState([
        
    ])

    return(
        <div id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                        <h3>이벤트</h3>
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/event">이벤트</Link></li>
                        </ol>
                    </div>
                </div>
            </div>
            <section>
                <div  className="section-header">
                    <h2>이벤트 작성</h2>
                    <p>Event</p>
                    <hr/>
                </div>
            </section>
        </div>
    )
}

export default CreateEvent;