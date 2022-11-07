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
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="AgreeToTerms" value="agree" required/>
                <label className="form-check-label" for="AgreeToTerms">{t('본인은 이용자 전체를 대표하여 유의사항 및 공간위 통합 약관을 확인했으며 이에 동의합니다.')}</label>
                &nbsp;
                <a href="https://scspace-public.s3.ap-northeast-2.amazonaws.com/ToS.pdf" target="_blank">{t('공간위 통합 약관 확인하기')}</a>
              </div>
              <hr/><br/>
      </div>
        
      )};
}

export default withTranslation()(Form);