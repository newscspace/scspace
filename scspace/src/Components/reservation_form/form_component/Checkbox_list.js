import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
        <div>
            <h5 >{this.props.head}</h5>
            {Object.keys(this.props.checkboxlist).map((member) =>{
          return (
            <div className="form-check form-check-inline">
              <input className="form-check-input" name={this.props.name} type="checkbox" id="inlineCheckbox1" value={this.props.checkboxlist[member]} onChange={this.props.onChangeHandler}/>
              <label className="form-check-label" for="inlineCheckbox1">{member}</label>
            </div>
            )
            })}
        <hr/><br/>
      </div>
        
      )};
}

export default Form;