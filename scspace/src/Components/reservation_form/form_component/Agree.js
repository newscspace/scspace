import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
        <div>
           <h5></h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="agree" required/>
                  <label className="form-check-label" for="inlineCheckbox1">유의사항을 확인했으며 이에 동의합니다.</label>
                </div>
                <hr/><br/>
      </div>
        
      )};
}

export default Form;