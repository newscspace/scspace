import React, {Component} from 'react';
import {withTranslation} from "react-i18next";

class Form extends Component{
    constructor(props){
        super(props);


    }


    render() {
        const {t} = this.props;
        return (
        <div>
            <div className="form-group mt-3">
                <h5>{t('음식')}</h5>
                <input type="text" name="food" class="form-control"  value={this.props.value} placeholder = "음식물 섭취시 해당 음식물의 종류를 적어주세요." onChange={this.props.onChangeHandler}/>
              </div>
                <hr/><br/>
      </div>
        
      )};
}

export default withTranslation()(Form);