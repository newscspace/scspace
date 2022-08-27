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
            <div className="col-md-6 form-group">
                <h5>{t('단체 이름')}</h5>
                <input type="text" name="organizationName" class="form-control"   value={this.props.value} onChange={this.props.onChangeHandler} required/>
              </div>
              <hr/><br/> 
      </div>
        
      )};
}

export default withTranslation()(Form);