import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {Link} from 'react-router-dom';

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
                <br/>
              
              <p className="space">{t('팀이 없으면 팀 등록을 해주세요.')}<Link className="btn-getstarted scrollto" to="/team/create">&nbsp;{t('등록하기')}</Link></p>
                    
              </div>
              <hr/><br/>
            </div>
        
      )};
}

export default withTranslation()(Form);