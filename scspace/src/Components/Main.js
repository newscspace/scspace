import React, {Component} from 'react';
import Banner from './Banner'
import Fast_notice from './Fast_notice';
import FAQ from './FAQ'
class Header extends Component{
    render() {return (
        <div>
            <Banner></Banner>
            <Fast_notice></Fast_notice>
            <FAQ main={true}></FAQ>
        </div>
      )};
}

export default Header;