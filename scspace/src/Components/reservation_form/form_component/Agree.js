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
           <h5></h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="AgreeToTerms" value="agree" required/>
                  <label className="form-check-label" for="AgreeToTerms">{t('유의사항을 확인했으며 이에 동의합니다.')}</label>
                </div>
                <hr/><br/>
      </div>
        
      )};
}

export default withTranslation()(Form);