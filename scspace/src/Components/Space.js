import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Space extends Component{
    constructor(props){
        super(props);
        this.state = {
            space_name : ''
        }
    }

    componentDidMount(){
        const name = this.props.match.params.name;
        this.setState({
            space_name : name
        })
     }

    render() {
        return (
        <div>
            <h1>{this.state.space_name}공간소개 페이지 구현</h1>
        </div>
      )};
}

export default withRouter(Space);