import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from '../auth/LoginCheck';
import {withTranslation} from "react-i18next";

function Event(props){
    const {t} = props;

    const [login, changeLogin] = useState(false);
    const [UserInfo, changeUserInfo] = useState(null);

    useEffect(() => {
        LoginCheck()
        .then((result) => {
            if (result !== false)
            {
            changeLogin(true);
            changeUserInfo(result);
            }
        })
    }, [])

    const [s, changeS] = useState([
        
    ])

    return(
        <div id="main">
            <div  className="breadcrumbs">
                <div  className="container">
                    <div  className="d-flex justify-content-between align-items-center">
                        <h3>{t('이벤트')}</h3>
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/event">{t('이벤트')}</Link></li>
                        </ol>
                    </div>
                </div>
            </div>

            <section>
                <div  className="section-header">
                    <h2>{t('이벤트')}</h2>
                    <p>Event</p>
                    <hr/>
                </div>

                <div className="container">
                    {login === true && UserInfo.type==='admin' ? 
                    (<div className="text-end">
                        <Link to="/event/createevent"><button type="button" className="modalButton1">작성하기</button></Link>
                    </div>) : (<div></div>)}
                </div>
                <br/>

                <div className="container-fluid">

                    <div className="portfolio-isotope">
            
                        <div className="container">

                            <div className = "row row-cols-3">

                                <div className="col">
                                    <a href="https://us7.proxysite.com/process.php?d=gkeaUUazMTDtLLlfHvFnkss7WKWg9tSAbMTE9hnBrHGHVNu9861OvGStIYVO3k0xkZxj6cUxfMPYUNOH5QGFg5N%2FJ4JmCWYzSPVDn6dEh6odgCyLARXLFClLkiPO3g%3D%3D&b=1"><img src="img/logo.svg"/></a>
                                    <h4>Title1</h4>
                                </div>
                                <div className="col">
                                    <img src="img/logo.svg"/>
                                    <h4>Title2</h4>
                                </div>
                                <div className="col">
                                    <img src="img/logo.svg"/>
                                    <h4>Title3</h4>
                                </div>
                                <div className="col">
                                    <img src="img/logo.svg"/>
                                    <h4>Title4</h4>
                                </div>

                            </div>
                
                        </div>
            
                    </div>
        
                </div>
            </section>
        </div>
    )
}

export default withTranslation()(Event);