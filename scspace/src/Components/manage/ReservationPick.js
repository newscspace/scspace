import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
        <div>
            {Object.keys(this.props.reservationlist).map((member) =>{
          return (
            <div className="form-check form-check-inline">
              <input className="modal-chk" type="radio" name="reservationlist" id="inlineRadio1" onChange={this.props.onChangeHandler} value={this.props.reservationlist[member]} required/>
              <label className="modal-second" for="inlineRadio1">{member}</label>
            </div>
            )
            })}
      </div>
        
      )};
}

export default Form;