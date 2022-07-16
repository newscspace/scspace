import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
//individual_practice_room_1','individual_practice_room_2','individual_practice_room_3','piano_room_1','piano_room_2','multipurpose_room','seminar_room_1','seminar_room_2',
//'dance_studio','group_practice_room','mirae_hall','ullim_hall','open_space','workshop'
import Individual from './spaces/Individual/Individual';

class Space extends Component{
    constructor(props){
        super(props);
        this.state = {
            space_name : '',
            space : {
                individual_practice_room: '개인연습실',
                piano_room: '피아노실',
                seminar_room : '세미나실',
                group_practice_room: '합주실',
                dance_studio: '무예실',
                ullim_hall: '울림홀',
                mirae_hall: '미래홀',
                workshop: '창작공방',
                open_space: '오픈스페이스'
            },
        }
    }

    componentDidMount(){
        const name = this.props.match.params.name.replace(/-/gi, '_');
        this.setState({
            space_name: name,
        })
     }

    render() {
        return (
        <div>
            <div class="breadcrumbs">
                <div class="container">

                    <div class="d-flex justify-content-between align-items-center">
                        <h2>{this.state.space[this.state.space_name]}</h2>
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li>공간</li>
                        </ol>
                    </div>

                </div>
            </div>
            <section>

                <div class="section-header">
                    <h2>{this.state.space[this.state.space_name]}</h2>
                    <p>{this.state.space_name.replace(/_/gi, ' ')}</p>
                </div>
                <hr/>
                <p>
                <Individual></Individual>
                </p>

            </section>
        </div>
      )};
}

export default withRouter(Space);