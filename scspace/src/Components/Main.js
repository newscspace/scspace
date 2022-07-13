import React, {Component} from 'react';
import Banner from './Banner'
import Fast_Reservation from './Fast_reservation';

class Header extends Component{
    render() {return (
        <div>
            <Banner></Banner>

            <Fast_Reservation></Fast_Reservation>
        </div>
      )};
}

export default Header;