import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import SpaceInfo from './spaces/SpaceInfo';
import Room from './spaces/Room';
//individual_practice_room_1','individual_practice_room_2','individual_practice_room_3','piano_room_1','piano_room_2','multipurpose_room','seminar_room_1','seminar_room_2',
//'dance_studio','group_practice_room','mirae_hall','ullim_hall','open_space','workshop'
// import Individual from './spaces/Individual/Individual.js';
// import Piano from './spaces/Piano/Piano.js';
// import Seminar from './spaces/Seminar/Seminar.js';
// import Practice from './spaces/Practice/Practice.js';
// import Dance from './spaces/Dance/Dance.js';
// import Ullim from './spaces/Ullim/Ullim.js';
// import Mirae from './spaces/Mirae/Mirae.js';
// import Workshop from './spaces/Workshop/Workshop.js';
// import Openspace from './spaces/Openspace/Openspace.js';



class Space extends Component{
    constructor(props){
        super(props);
        this.state = {
            spaceName : '',
            spaceInfo : new SpaceInfo(0)
        }
    }

    componentDidMount(){
        this.setState({
            spaceName: this.props.match.params.name,
            spaceInfo: new SpaceInfo(this.props.match.params.name)
        })
    }
    
    render() {
        return (
        <div>
            <div class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                        <h2>{this.state.spaceInfo.roomname}</h2>
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li>공간</li>
                        </ol>
                    </div>

                </div>
            </div>
            <section>

                <div class="section-header">
                    <h2>{this.state.spaceInfo.roomname}</h2>
                    <p>{this.state.spaceInfo.roomname} 여긴 나중에 다국어 지원으로 땜빵</p>
                </div>
                <hr/>
                <p><Room roomCode={this.state.spaceInfo.roomcode}/></p>

            </section>
        </div>
      )};
}

export default withRouter(Space);