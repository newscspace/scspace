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
                <h5 >{t('팀')}</h5>
                <select className="form-control" name="teamId" onChange={this.props.onChangeHandler} required> 
			            {this.props.teamlist.map((team) =>{
                      return (
                        <option key={team.id} value={team.id}>{team.name}</option>
                      )
                  })}
		            </select>
                    
              </div>
              <hr/><br/>
            </div>
        
      )};
}

export default withTranslation()(Form);