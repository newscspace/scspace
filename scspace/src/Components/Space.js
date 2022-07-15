import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
//individual_practice_room_1','individual_practice_room_2','individual_practice_room_3','piano_room_1','piano_room_2','multipurpose_room','seminar_room_1','seminar_room_2',
//'dance_studio','group_practice_room','mirae_hall','ullim_hall','open_space','workshop'

class Space extends Component{
    constructor(props){
        super(props);
        this.state = {
            space_name : '',
            space : {
                individual_practice_room: '개인연습실',
                piano_room: '피아노실',
                group_practice_room: '합주실',
                dance_studio: '무예실',
                ullim_hall: '울림홀',
                mirae_hall: '미래홀',
                workshop: '창작공방',
                open_space: '오픈스페이스'
            }
        }
    }

    //'개인연습실', '피아노실', '합주실', '무예실', '울림홀', '미래홀', '창작공방', '오픈스페이스'
    //'/space/individual-practice-room', '/space/piano-room', '/space/group-practice-room', '/space/dance-studio', '/space/ullim-hall', '/space/mirae-hall', '/space/workshop', '/space/open-space'
    

    componentDidMount(){
        const name = this.props.match.params.name.replace(/-/gi, '_');
        // {this.state.space.map((language, idx) =>{
        //     if (language[idx].English === e_name) {k_name = language[idx].Korean}  
        // })}
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
                            <li>{this.state.space[this.state.space_name]}</li>
                        </ol>
                    </div>

                </div>
            </div>
            <div class="container">

                <div class="section-header">
                    <h2>{this.state.space[this.state.space_name]}</h2>
                    <p>Example inner page template</p>
                </div>

                <p>
                {this.state.space_name} 공간소개 페이지 구현
                </p>

            </div>
            {/* <h1>{this.state.space_name}공간소개 페이지 구현</h1> */}
        </div>
      )};
}

export default withRouter(Space);