import React, {Component} from 'react';
import Banner from './Banner'
import FastNotice from './notice/FastNotice';
import FAQ from './faq/FAQ'
class Main extends Component{
    render() {return (
        <div>
            <Banner></Banner>
            <FastNotice></FastNotice>
            <FAQ main={true} history={this.props.history}></FAQ>
        </div>
      )};
}

export default Main;