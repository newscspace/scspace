import React, {Component} from 'react';
import DatePicker from 'react-datepicker'

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            form : props.form,
            startdate : new Date(),
            enddate : new Date(),
            rehersal_from : '',
            reheresal_to : '',
            rehersal_lastday_from : '',
            rehersal_lastday_to : ''

        }


    }
    

    render() {
        return (

        <div className="col-lg-8">
            <form action="forms/api/reservation" method="post" role="form" className="php-email-form"> {/*action 링크 변경 필요*/}
              
              
              <div className="col-md-6 form-group">
                <h5>단체 이름</h5>
                <input type="text" name="team_name" class="form-control" id="team_name" required/>
              </div>
              <hr/><br/>

              <div className="col-md-6 form-group">
                <h5>행사 이름</h5>
                <input type="text" name="team_name" class="form-control" id="team_name" required/>
              </div>
              <hr/><br/>

              <div className="row">
                <h5>시간</h5>
                <div className="col-md-6 form-group">
                행사 시간<DatePicker
                  onChange = {(date) => {this.setState({startdate:date})}}
                  selected = {this.state.startdate}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="form-control" 
                  showTimeInput
                  required/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                종료 시간<DatePicker
                  onChange = {(date) => {this.setState({enddate:date})}}
                  selected={this.state.enddate}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="form-control"
                  showTimeInput
                  required/>
                </div>
                
                <div className="col-md-6 form-group">
                리허설 시작 시간<DatePicker
                  onChange = {(date) => {this.setState({rehersal_from:date})}}
                  selected = {this.state.rehersal_from}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="form-control" 
                  showTimeInput
                  required/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                리허설 종료 시간<DatePicker
                  onChange = {(date) => {this.setState({rehersal_to:date})}}
                  selected={this.state.rehersal_to}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="form-control"
                  showTimeInput
                  required/>
                </div>

                <div className="col-md-6 form-group">
                전날 리허설 시작 시간<DatePicker
                  onChange = {(date) => {this.setState({rehersal_lastday_from:date})}}
                  selected = {this.state.rehersal_lastday_from}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="form-control" 
                  showTimeInput
                  required/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                전날 리허설 종료 시간<DatePicker
                  onChange = {(date) => {this.setState({rehersal_lastday_to:date})}}
                  selected={this.state.rehersal_lastday_to}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  className="form-control"
                  showTimeInput
                  required/>
                </div>

              </div>
              
                  <hr/><br/>
              
              <div className="row">
              <h5>예상 참여 인원</h5>
                <div className="col-md-6 form-group">
                  학내구성원
                  <input type='number' className="form-control" name="inner_number" min='0' max='200' step='1' required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  외부인
                  <input type='number' className="form-control" name="outer_number" min='0' max='200' step='1' required />
                </div>
              </div>
              <hr/><br/>
              
              <div className="form-group mt-3">
                <h5>행사 목적</h5>
                <input type="text" name="purpose" class="form-control" id="purpose" required/>
              </div>
              <hr/><br/>

              <div className="form-group mt-3">
                <h5>행사 내용</h5>
                <textarea className="form-control" name="contents" placeholder="행사의 자세한 내용을 알려주세요. 이 내용은 학생문화공간위원회에 전달됩니다." required></textarea>
              </div>
              <hr/><br/>

              <h5>장비 사용</h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "equipment" id="inlineCheckbox1" value="light" required/>
                  <label className="form-check-label" for="inlineCheckbox1">조명</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "equipment" id="inlineCheckbox1" value="sound" required/>
                  <label className="form-check-label" for="inlineCheckbox1">음향</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "equipment" id="inlineCheckbox1" value="projector" required/>
                  <label className="form-check-label" for="inlineCheckbox1">프로젝터</label>
                </div>
                <hr/><br/>

              <div className="row">
              <h5>책상과 의자</h5>
                <div className="col-md-6 form-group">
                  책상 수
                  <input type='number' className="form-control" name="desk" min='0' max='200' step='1' required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  의자 수
                  <input type='number' className="form-control" name="chair" min='0' max='200' step='1' required />
                </div>
              </div>
              <hr/><br/>

              <h5>로비</h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "lobby" id="inlineCheckbox1" value="agree" required/>
                  <label className="form-check-label" for="inlineCheckbox1">울림홀 앞 1층 로비를 사용합니다. </label>
                </div>
                <hr/><br/>

              <div className="form-group mt-3">
                <h5>음식</h5>
                <input type="text" name="purpose" class="form-control" id="food" placeholder = "음식물 섭취시 해당 음식물의 종류를 적어주세요. "required/>
              </div>
                <hr/><br/>

              <h5>약관 동의</h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="agree" required/>
                  <label className="form-check-label" for="inlineCheckbox1">유의사항을 확인했으며 이에 동의합니다.</label>
                </div>
                <hr/><br/>
                
              
            <div className="text-end"><button type="submit">예약하기</button></div>
          </form>
        </div>
        
      )};
}

export default Form;