import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
            <div>
              <div className="col-md-6 form-group">
                <h5 >팀</h5>
                <select className="form-control" name="team_name" onChange={this.props.onChangeHandler} required> 
			            {this.props.teamlist.map((team) =>{
                      return (
                        <option key={team} value={team}>{team}</option>
                      )
                  })}
		            </select>
                    
              </div>
              <hr/><br/>
            </div>
        
      )};
}

export default Form;