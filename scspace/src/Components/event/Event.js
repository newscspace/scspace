import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from '../auth/LoginCheck';
import {withTranslation} from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

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
        AOS.init();
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

            <section id="portfolio" class="portfolio">
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

                <div className="container-fluid" data-aos-delay="200">

                    <div className="portfolio-isotope">
            
                        <div className="container">

                            <div className="row g-0 portfolio-container">

                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                                    <img src="/img/instagram-test2.jpg" className="img-fluid" alt=""/>
                                        <div className="portfolio-info">
                                            <h4>월드컵 이벤트</h4>
                                            <a href="https://www.instagram.com/p/CkChrcphRuE/" target="_blank" title="App 1" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                            <a href="https://docs.google.com/forms/d/1yRqLRhGucR6zWy34vNgAcXduuY0stqAssQxUUbiz8Cw/edit" target="_blank" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                        </div>
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