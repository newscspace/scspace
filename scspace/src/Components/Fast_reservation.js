import React, {Component} from 'react';
import Datepicker from "react-datepicker";
import {Link} from 'react-router-dom';
import "../css/style.css"
import "../css/bootstrap.min.css"
import "../css/flaticon.css"

class Fast_reservation extends Component{



    render() {return (
        <section className="booking_part">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="booking_menu">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                            <a className="nav-link active" id="hotel-tab" data-toggle="tab" role="tab" aria-controls="hotel" aria-selected="true">예약</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="booking_content">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="hotel" role="tabpanel" aria-labelledby="hotel-tab">
                                <div className="booking_form">
                                    <form action="#">
                                        <div className="form-row">
                                            <div className="form_colum">
                                                <select className="nc_select">
                                                    <option selected>공간 종류</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="form_colum">
                                                <input id="datepicker_1" placeholder="기간"></input>
                                            </div>
                                            <div className="form_colum">
                                                <input id="datepicker_2" placeholder="사용 시간"></input>
                                            </div>

                                            <div className="form_colum">
                                                <select className="nc_select">
                                                    <option selected>사용 인원 </option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>

                                            <div className="form_btn">
                                                <Link to="/reservation" className="btn_1">예약</Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
      )};
}



export default Fast_reservation;