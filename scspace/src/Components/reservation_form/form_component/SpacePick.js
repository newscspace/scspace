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
                    <input className="form-check-input" type="radio" name="spaceName" id="inlineRadio1" onChange={this.props.onChangeHandler} value={this.props.spacelist[space]} required/>
                    <label className="form-check-label" for="inlineRadio1">{space}</label>
                </div>
                )
            })}
                <hr/><br/>
      </div>
        
      )};
}

export default Form;