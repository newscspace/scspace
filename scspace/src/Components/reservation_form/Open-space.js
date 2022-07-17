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
            reheresal_to : ''

        }


    }
    

    render() {
        return (

        <div className="col-lg-8">
            <form action="forms/api/reservation" method="post" role="form" className="php-email-form"> {/*action 링크 변경 필요*/}
            
            <h5>장소</h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "space" id="inlineCheckbox1" value="rooftop" required/>
                  <label className="form-check-label" for="inlineCheckbox1">옥상</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "space" id="inlineCheckbox1" value="community" required/>
                  <label className="form-check-label" for="inlineCheckbox1">커뮤니티 마당</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "space" id="inlineCheckbox1" value="stair" required/>
                  <label className="form-check-label" for="inlineCheckbox1">전시계단</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "space" id="inlineCheckbox1" value="media" required/>
                  <label className="form-check-label" for="inlineCheckbox1">미디어 스페이스</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "space" id="inlineCheckbox1" value="second_lobby" required/>
                  <label className="form-check-label" for="inlineCheckbox1">2층 로비</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "space" id="inlineCheckbox1" value="third_lobby" required/>
                  <label className="form-check-label" for="inlineCheckbox1">3층 로비</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "space" id="inlineCheckbox1" value="meeting" required/>
                  <label className="form-check-label" for="inlineCheckbox1">모임터</label>
                </div>
                <hr/><br/>
              
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

              <h5>성격</h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "character" id="inlineCheckbox1" value="religion"/>
                  <label className="form-check-label" for="inlineCheckbox1">종교적</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "character" id="inlineCheckbox1" value="rentability"/>
                  <label className="form-check-label" for="inlineCheckbox1">영리성</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name = "character" id="inlineCheckbox1" value="politic"/>
                  <label className="form-check-label" for="inlineCheckbox1">정치적</label>
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