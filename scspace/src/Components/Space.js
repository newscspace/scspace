import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
//individual_practice_room_1','individual_practice_room_2','individual_practice_room_3','piano_room_1','piano_room_2','multipurpose_room','seminar_room_1','seminar_room_2',
//'dance_studio','group_practice_room','mirae_hall','ullim_hall','open_space','workshop'

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