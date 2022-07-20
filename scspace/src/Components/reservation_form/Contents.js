import React, {Component} from 'react';

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        return (
        <div>
            <div className="form-group mt-3">
                <h5>행사 내용</h5>
                <textarea className="form-control" name="contents" onChange = {this.props.onChangeHandler} placeholder="행사의 자세한 내용을 알려주세요. 이 내용은 학생문화공간위원회에 전달됩니다." required></textarea>
              </div>
              <hr/><br/>
      </div>
        
      )};
}

export default Form;