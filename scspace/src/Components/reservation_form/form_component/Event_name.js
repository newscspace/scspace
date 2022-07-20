import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);
    }


    render() {
        return (
        <div>
           <div className="col-md-6 form-group">
                <h5>행사 이름</h5>
                <input type="text" name="event_name" class="form-control" id="team_name" onChange={this.props.onChangeHandler} required/>
              </div>
              <hr/><br/>
        </div>
        
      )};
}

export default Form;