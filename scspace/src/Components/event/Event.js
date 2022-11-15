import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from '../auth/LoginCheck';
import {withTranslation} from "react-i18next";

function Event(props){
    const {t} = props;

    const [login, setLogin] = useState(false);
    const [UserInfo, setUserInfo] = useState(null);

    useEffect(() => {
        LoginCheck()
        .then((result) => {
            if (result !== false)
            {
            setLogin(true);
            setUserInfo(result);
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
                                    <a href="https://docs.google.com/forms/d/1yRqLRhGucR6zWy34vNgAcXduuY0stqAssQxUUbiz8Cw/edit"><img src="img/instagram-test2.jpg"/></a>
                                    <h4>Title1</h4>
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