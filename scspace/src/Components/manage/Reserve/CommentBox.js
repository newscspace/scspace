import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
        <div>
            <div>
                <input type="text" name="comment" class="modal-comment" onChange={this.props.onChangeHandler} required/>
            </div>
      </div>
        
      )};
}

export default Form;