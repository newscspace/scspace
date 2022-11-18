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
            <h5 >{t(this.props.head)}</h5>
            {Object.keys(this.props.checkboxlist).map((member, index) =>{
          return (
            <div className="form-check form-check-inline">
              <input className="form-check-input" name={this.props.name} type="checkbox" id={"MemberChkBx"+index} value={this.props.checkboxlist[member]} onChange={this.props.onChangeHandler}/>
              <label className="form-check-label" for={"MemberChkBx"+index}>{member}</label>
            </div>
            )
            })}
          {this.props.hr ? <hr/> : null}
      <br/>
      </div>
        
      )};
}

export default withTranslation()(Form);