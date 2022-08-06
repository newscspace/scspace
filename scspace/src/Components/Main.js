import React, {Component} from 'react';
import Banner from './Banner'
import FastNotice from './notice/FastNotice';
import FAQ from './faq/FAQ'
class Header extends Component{
    render() {return (
        <div>
            <Banner></Banner>
            <FastNotice></FastNotice>
            <FAQ main={true}></FAQ>
        </div>
      )};
}

export default Header;