import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

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
        <div>
            <h1>{this.state.which}페이지 구현</h1>
        </div>
      )};
}

export default withRouter(Ask);