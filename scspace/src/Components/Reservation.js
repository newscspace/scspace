import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state = {
            space_name : '',
            date : '',
            time : '',
            person : ''

        }
    }


    render() {
        return (
        <div>
            <h1>예약 페이지 구현</h1>
        </div>
      )};
}

export default Reservation;