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
                <h5>{t('행사 목적')}</h5>
                <input type="text" name="eventPurpose" class="form-control" onChange={this.props.onChangeHandler}   value={this.props.value} required/>
              </div>
              <hr/><br/>
      </div>
        
      )};
}

export default withTranslation()(Form);
