import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
        <div>
            <div className="col-md-6 form-group">
                <h5>단체 이름</h5>
                <input type="text" name="organizationName" class="form-control" onChange={this.props.onChangeHandler} required/>
              </div>
              <hr/><br/> 
      </div>
        
      )};
}

export default Form;