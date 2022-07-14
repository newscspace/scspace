import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import FAQ from './FAQ'
class Ask extends Component{
    constructor(props){
        super(props);
        this.state = {
            which : ''
        }
    }
     componentDidMount(){
        const which = this.props.match.params.which;
        this.setState({
            which : which
        })
     }

    render() {
        return (
        <section>
            {this.state.which === 'ask' ? <h1>문의 페이지 구현</h1> : <FAQ></FAQ>}
        </section>
      )};
}

export default withRouter(Ask);