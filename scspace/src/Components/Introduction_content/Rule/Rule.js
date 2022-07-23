import React, {Component} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/entry.webpack';
import scspace from './KAIST 학생문화공간위원회 회칙 (190320).pdf';
import space from './공간 운영 세칙(220511).pdf';
import post from './[학생문화공간위원회] 게시물 관리 규정 (170426).pdf';
import seminar from './[학생문화공간위원회] 세미나실 사용 관리 수칙 (220511).pdf';
import workspace from './[학생문화공간위원회] 창작공방 사용 관리 수칙 (220511).pdf';
import practice from './[학생문화공간위원회] 합주실 사용 관리 수칙 (220511).pdf';
import dance from './[학생문화공간위원회] 무예실 사용 관리 수칙 (220511).pdf';
import individual from './[학생문화공간위원회] 개인연습실 사용 관리 규칙 (220511).pdf';
import piano from './[학생문화공간위원회] 피아노실 사용 관리 규칙 (220511).pdf';
import ullim from './[학생문화공간위원회] 울림홀 사용 관리 수칙 (220511).pdf';
import mirae from './[학생문화공간위원회] 미래홀 사용 관리 수칙 (220511).pdf';
import openspace from './[학생문화공간위원회] 오픈스페이스 사용 규칙 (220511).pdf';
import group from './[학생문화공간위원회] 단체실 운영 규칙 (190327).pdf';
import goods from './[학생문화공간위원회] 물품대여 규칙 (190502).pdf';
import manage from './장영신 학생회관 운영준칙 (140612).pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
 
class Rule extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  constructor(props){
    super(props);

    this.state = {
      numPages: null,
      pageNumber: 1,
      file_name: scspace,
      file_title: "학생문화공간위원회 회칙",
      info: [
        {which:'학생문화공간위원회 회칙', file: scspace, title: "학생문화공간위원회 회칙", clicked:true},
        {which:'공간 운영 세칙', file: space , title: "공간 운영 세칙", clicked:false},
        {which:'- 1. 게시물 관리 규칙', file: post, title: "게시물 관리 규칙", clicked:false},
        {which:'- 2. 세미나실 운영 규칙', file: seminar, title: "세미나실 운영 규칙", clicked:false},
        {which:'- 3. 창작공방 운영 규칙', file: workspace, title: "창작공방 운영 규칙", clicked:false},
        {which:'- 4. 합주실 운영 규칙', file: practice, title: "합주실 운영 규칙", clicked:false},
        {which:'- 5. 무예실 운영 규칙', file: dance, title: "무예실 운영 규칙", clicked:false},
        {which:'- 6. 개인연습실 운영 규칙', file: individual, title: "개인연습실 운영 규칙", clicked:false},
        {which:'- 7. 피아노실 운영 규칙', file: piano, title: "피아노실 운영 규칙", clicked:false},
        {which:'- 8. 울림홀 운영 규칙', file:ullim, title: "울림홀 운영 규칙", clicked:false},
        {which:'- 9. 미래홀 운영 규칙', file: mirae, title: "미래홀 운영 규칙", clicked:false},
        {which:'- 10. 오픈스페이스 운영 규칙', file: openspace, title: "오픈스페이스 운영 규칙", clicked:false},
        {which:'- 11. 단체실 운영 규칙', file: group, title: "단체실 운영 규칙", clicked:false},
        {which:'물품 대여사업 운영 규칙', file: goods, title: "물품 대여사업 운영 규칙", clicked:false},
        {which:'장영신 학생회관 운영 준칙', file: manage, title:"장영신 학생회관 운영 준칙", clicked:false},
      ]
    }
}

OnClickEvent = (idx, e) =>{
    const copied_info = [...this.state.info];
    copied_info[idx].clicked = true;
    for (let i=0; i<3; i++)
      {
        if (i !== idx) {
          copied_info[i].clicked = false;
        }
      }
    this.setState({
        info:copied_info,
        file_name:copied_info[idx].file,
        file_title:copied_info[idx].title
    }) 
}

  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <section id="contact" className="pdf contact">
        <div className="container">
  
          <div className="row gy-5 gx-lg-5">
  
            <div className="col-lg-4">
  
              <div className="info">
                <h3>회칙</h3>
                <p>학생문화공간위원회의 모든 사업은 아래<br/>회칙/세칙을 중심으로 진행됩니다.</p>
                {this.state.info.map((contents, idx) => {
                        return (
                      <div className="info-item d-flex">
                        <div>
                          {/* <h4>{contents.which}</h4> */}
                          <p onClick={this.OnClickEvent.bind(this, idx)}>{contents.which}</p>
                        </div>
                        </div>
                      )
                    } 
                )}
    
              </div>
            </div>

            <div className="col-lg-8">
              <form className="php-email-form"> 
                <h4><b>{this.state.file_title}</b></h4>
                <hr></hr>
                <div className="container viewer img-fluid">
                  <Document
                    file={this.state.file_name}
                    onLoadSuccess={this.onDocumentLoadSuccess}>
                    {Array.apply(null, Array(numPages))
                    .map((x, i)=>i+1)
                    .map(page => <Page scale={1.2} pageNumber={page}/>)}
                  </Document>
                </div>
                  
                <div className="text-end"><button>
                  <a href={this.state.file_name} download>다운받기</a></button></div>
                
              </form>
            </div>
            
          </div>
        </div>
      </section>
    );
  }
}

export default Rule;