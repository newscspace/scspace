import React, {Component} from 'react';
import {withTranslation} from "react-i18next";

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() 
    {
        const {t} = this.props;
        return (
        <div>
            <div className="form-group mt-3">
                <h5>{t('행사 내용')}</h5>
                <textarea className="form-control" name="contents" value={this.props.value} onChange = {this.props.onChangeHandler} placeholder="행사의 자세한 내용을 알려주세요. 이 내용은 학생문화공간위원회에 전달됩니다." required></textarea>
              </div>
              <hr/><br/>
      </div>
        
      )};
}

export default withTranslation()(Form);