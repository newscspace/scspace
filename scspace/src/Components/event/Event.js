import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import LoginCheck from '../auth/LoginCheck';
import {withTranslation} from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

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
        AOS.init();
    }, [])

    const [s, changeS] = useState([])

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

                <div className="container-fluid" data-aos-delay="200"> {/* 주석 */}

                    <div className="portfolio-isotope">
            
                        <div className="container">

                            <div className="row g-0 portfolio-container">

                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                                    <img src="/img/dinosaur.png" className="img-fluid" alt=""/>
                                        <div className="portfolio-info">
                                            <h4>공룡간식 이벤트</h4>
                                            <a href="https://www.instagram.com/p/CxUykS0LYx6/" target="_blank" title="인스타그램 링크" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                            <a href="/" target="_blank" title="관련 링크" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                        </div>
                                </div>

                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                                    <img src="/img/championsleague2.jpg" className="img-fluid" alt=""/>
                                        <div className="portfolio-info">
                                            <h4>챔스 단체관람</h4>
                                            <a href="https://www.instagram.com/p/Cry1FEDhxxr/" target="_blank" title="인스타그램 링크" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                            <a href="https://forms.gle/TmSdqVe6gMQK2ou77" target="_blank" title="관련 링크" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                        </div>
                                </div>

                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                                    <img src="/img/findtreasure2.jpg" className="img-fluid" alt=""/>
                                        <div className="portfolio-info">
                                            <h4>신학관 보물찾기</h4>
                                            <a href="https://www.instagram.com/p/CqCSxTkr5oH/" target="_blank" title="인스타그램 링크" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                            <a href="https://forms.gle/T4yu2NyKrbfSBtJQ7" target="_blank" title="관련 링크" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                        </div>
                                </div>

                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                                    <img src="/img/easteregg2.jpg" className="img-fluid" alt=""/>
                                        <div className="portfolio-info">
                                            <h4>이스터에그 이벤트</h4>
                                            <a href="https://www.instagram.com/p/ClQb721uO2_/" target="_blank" title="인스타그램 링크" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                            <a href="https://forms.gle/WjM1s2e7gkJJpZ4M6" target="_blank" title="관련 링크" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                        </div>
                                </div>

                                <div className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                                    <img src="/img/worldcup2.jpg" className="img-fluid" alt=""/>
                                        <div className="portfolio-info">
                                            <h4>월드컵 이벤트</h4>
                                            <a href="https://www.instagram.com/p/ClNzE_ludaz/" target="_blank" title="인스타그램 링크" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                            <a href="https://docs.google.com/forms/d/1yRqLRhGucR6zWy34vNgAcXduuY0stqAssQxUUbiz8Cw/edit" target="_blank" title="관련 링크" className="details-link"><i className="bi bi-link-45deg"></i></a>
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