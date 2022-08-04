import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);
    }


    render() {
        return (
        <div>
            <h5 >장소</h5>
            {Object.keys(this.props.spacelist).map((space) => {
                return (
                    <div className="form-check form-check-inline">
<<<<<<< .merge_file_a28352
                    <input className="form-check-input" type="radio" name="space_name" id="inlineRadio1" onChange={this.props.onChangeHandler} value={this.props.spacelist[space]} required/>
=======
                    <input className="form-check-input" type="radio" name="spaceName" id="inlineRadio1" onChange={this.props.onChangeHandler} value={this.props.spacelist[space]} required/>
>>>>>>> .merge_file_a06736
                    <label className="form-check-label" for="inlineRadio1">{space}</label>
                </div>
                )
            })}
                <hr/><br/>
      </div>
        
      )};
}

export default Form;