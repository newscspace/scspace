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
            {this.props.type ? (<div className="col-md-6 form-group">
              <h5>{t('예상 참여 인원')}</h5>
                  <input type='number' onChange={this.props.onChangeHandler} className="form-control" name="number" min='0' max='30' step='1' required />
              </div>) :  (
                 <div className="row">
                 <h5>{t('예상 참여 인원')}</h5>
                   <div className="col-md-6 form-group">
                     {t('학내구성원')}
                     <input type='number' onChange={this.props.onChangeHandler} className="form-control" name="inner_number" min='0' max='200' step='1' required />
                   </div>
                   <div className="col-md-6 form-group mt-3 mt-md-0">
                     {t('외부인')}
                     <input type='number' onChange={this.props.onChangeHandler} className="form-control" name="outer_number" min='0' max='200' step='1' required />
                   </div>
                 </div>
              )
            }
            <hr/><br/>
        </div>
        
      )};
}

export default withTranslation()(Form);