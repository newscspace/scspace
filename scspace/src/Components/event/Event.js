import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {withTranslation} from "react-i18next";

function Event(props){
    const {t} = props;
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

            <div className="container-fluid">

                <div className="portfolio-isotope">
        
                    <div className="row g-0 portfolio-container">

                        <div className = "row row-cols-3">

                            <div className="col col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                            <img src="/img/logo.svg" className="img-fluid" alt=""/>
                                <div className="portfolio-info">
                                    <h4>App 1</h4>
                                    <a href="assets/img/portfolio/app-1.jpg" title="App 1" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                </div>
                            </div>

                            <div className="col col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                            <img src="/img/logo.svg" className="img-fluid" alt=""/>
                                <div className="portfolio-info">
                                    <h4>App 1</h4>
                                    <a href="assets/img/portfolio/app-1.jpg" title="App 1" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                </div>
                            </div>

                            <div className="col col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                            <img src="/img/logo.svg" className="img-fluid" alt=""/>
                                <div className="portfolio-info">
                                    <h4>App 1</h4>
                                    <a href="assets/img/portfolio/app-1.jpg" title="App 1" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
                                </div>
                            </div>

                            <div className="col col-xl-3 col-lg-4 col-md-6 portfolio-item filter-app">
                            <img src="/img/logo.svg" className="img-fluid" alt=""/>
                                <div className="portfolio-info">
                                    <h4>App 1</h4>
                                    <a href="assets/img/portfolio/app-1.jpg" title="App 1" className="glightbox preview-link"><i className="bi bi-zoom-in"></i></a>
                                    <a href="portfolio-details.html" title="More Details" className="details-link"><i className="bi bi-link-45deg"></i></a>
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