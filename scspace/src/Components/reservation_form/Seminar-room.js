import React, {Component} from 'react';
import DatePicker from 'react-datepicker'

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            form : props.form,
            startdate : new Date(),
            enddate : new Date()
        }


    }
    

    render() {
        return (

        <div className="col-lg-8">
            <form action="forms/api/reservation" method="post" role="form" className="php-email-form"> {/*action 링크 변경 필요*/}
              
                <h5 >장소</h5>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="space" id="inlineRadio1" value="seminar-room1" required/>
                    <label className="form-check-label" for="inlineRadio1">세미나실1</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="space" id="inlineRadio1" value="seminar-room2"/>
                    <label className="form-check-label" for="inlineRadio1">세미나실2</label>
                </div>
                
                <hr/><br/>
              
              <div className="col-md-6 form-group">
                <h5>단체 이름</h5>
                <input type="text" name="team_name" class="form-control" id="team_name" required/>
              </div>
              <hr/><br/>

              <div className="row">
                <h5>시간</h5>
                <div className="col-md-6 form-group">
                시작 시간<DatePicker
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
              </div>
                  <hr/><br/>

              <div className="col-md-6 form-group">
              <h5>예상 참여 인원</h5>
                  <input type='number' className="form-control" name="number" min='0' max='30' step='1' required />
              </div>
              <hr/><br/>


              <div className="form-group mt-3">
                <h5>행사 내용</h5>
                <textarea className="form-control" name="contents" placeholder="행사의 자세한 내용을 알려주세요. 이 내용은 학생문화공간위원회에 전달됩니다." required></textarea>
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