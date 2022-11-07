import React, {Component} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/entry.webpack';

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
      file_name: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%ED%9A%8C%EC%B9%99.pdf',
      file_title: "학생문화공간위원회 회칙",
      info: [
        {which:'학생문화공간위원회 회칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%ED%9A%8C%EC%B9%99.pdf', title: "학생문화공간위원회 회칙", clicked:true},
        {which:'학생문화공간위원회 통합 약관', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/ToS.pdf' , title: "학생문화공간위원회 통합 약관", clicked:false},
        {which:'공간 운영 세칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EA%B3%B5%EA%B0%84+%EC%9A%B4%EC%98%81+%EC%84%B8%EC%B9%99.pdf' , title: "공간 운영 세칙", clicked:false},
        {which:'- 1. 게시물 관리 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EA%B2%8C%EC%8B%9C%EB%AC%BC+%EA%B4%80%EB%A6%AC+%EA%B7%9C%EC%A0%95.pdf', title: "게시물 관리 규칙", clicked:false},
        {which:'- 2. 세미나실 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EC%84%B8%EB%AF%B8%EB%82%98%EC%8B%A4+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EC%88%98%EC%B9%99.pdf', title: "세미나실 운영 규칙", clicked:false},
        {which:'- 3. 창작공방 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EC%B0%BD%EC%9E%91%EA%B3%B5%EB%B0%A9+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EC%88%98%EC%B9%99.pdf', title: "창작공방 운영 규칙", clicked:false},
        {which:'- 4. 합주실 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%ED%95%A9%EC%A3%BC%EC%8B%A4+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EC%88%98%EC%B9%99.pdf', title: "합주실 운영 규칙", clicked:false},
        {which:'- 5. 무예실 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EB%AC%B4%EC%98%88%EC%8B%A4+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EC%88%98%EC%B9%99.pdf', title: "무예실 운영 규칙", clicked:false},
        {which:'- 6. 개인연습실 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EA%B0%9C%EC%9D%B8%EC%97%B0%EC%8A%B5%EC%8B%A4+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EA%B7%9C%EC%B9%99.pdf', title: "개인연습실 운영 규칙", clicked:false},
        {which:'- 7. 피아노실 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%ED%94%BC%EC%95%84%EB%85%B8%EC%8B%A4+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EA%B7%9C%EC%B9%99.pdf', title: "피아노실 운영 규칙", clicked:false},
        {which:'- 8. 울림홀 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EC%9A%B8%EB%A6%BC%ED%99%80+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EC%88%98%EC%B9%99.pdf', title: "울림홀 운영 규칙", clicked:false},
        {which:'- 9. 미래홀 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EB%AF%B8%EB%9E%98%ED%99%80+%EC%82%AC%EC%9A%A9+%EA%B4%80%EB%A6%AC+%EC%88%98%EC%B9%99.pdf', title: "미래홀 운영 규칙", clicked:false},
        {which:'- 10. 오픈스페이스 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EC%98%A4%ED%94%88%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4+%EC%82%AC%EC%9A%A9+%EA%B7%9C%EC%B9%99.pdf', title: "오픈스페이스 운영 규칙", clicked:false},
        {which:'- 11. 단체실 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EB%8B%A8%EC%B2%B4%EC%8B%A4+%EC%9A%B4%EC%98%81+%EA%B7%9C%EC%B9%99.pdf', title: "단체실 운영 규칙", clicked:false},
        {which:'물품 대여사업 운영 규칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EB%AC%BC%ED%92%88%EB%8C%80%EC%97%AC+%EA%B7%9C%EC%B9%99.pdf', title: "물품 대여사업 운영 규칙", clicked:false},
        {which:'장영신 학생회관 운영 준칙', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EC%9E%A5%EC%98%81%EC%8B%A0+%ED%95%99%EC%83%9D%ED%9A%8C%EA%B4%80+%EC%9A%B4%EC%98%81%EC%A4%80%EC%B9%99.pdf', title:"장영신 학생회관 운영 준칙", clicked:false},
        {which:'예약 판단 기준', file: 'https://scspace-public.s3.ap-northeast-2.amazonaws.com/%5B%ED%95%99%EC%83%9D%EB%AC%B8%ED%99%94%EA%B3%B5%EA%B0%84%EC%9C%84%EC%9B%90%ED%9A%8C%5D+%EC%98%88%EC%95%BD+%ED%8C%90%EB%8B%A8+%EA%B8%B0%EC%A4%80.pdf', title:"예약 판단 기준", clicked:false},
      ]
    }
}

OnClickEvent = (idx, e) =>{
    const copied_info = [...this.state.info];
    copied_info[idx].clicked = true;
    for (let i=0; i<15; i++)
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
                  
                <div className="text-end"><a href={this.state.file_name} download><button type="button">다운받기</button></a></div>
                
              </form>
            </div>
            
          </div>
        </div>
      </section>
    );
  }
}

export default Rule;
