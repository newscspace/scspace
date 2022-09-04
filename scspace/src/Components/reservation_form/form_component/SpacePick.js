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
            <h5 >{t('장소')}</h5>
            {Object.keys(this.props.spacelist).map((space, index) => {
                return (
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="spaceName" id={"SpaceRadio"+index} onChange={this.props.onChangeHandler} value={this.props.spacelist[space]} required/>
                    <label className="form-check-label" for={"SpaceRadio"+index}>{t(space)}</label>
                </div>
                )
            })}
                <hr/><br/>
      </div>
        
      )};
}

export default withTranslation()(Form);