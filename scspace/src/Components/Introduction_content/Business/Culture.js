import React, {Component} from 'react';

class Culture extends Component{
    render() {return (
        <div className="tab-pane active show">
            <div className="row gy-4">
                <div className="col-lg-8 order-2 order-lg-1">
                <h3>문화사업 기획</h3>
                <p><b>
                학생들이 기획하는 행사 이외에도 공간위가 스스로 기획하는 문화사업도 많이 있습니다. 
                2015년에는 야잠 컨테스트, 계단에 뽁뽁이 설치, 크리스마스에 대형트리 설치 등 일상의 소소한 문화를 위해 사업을 진행하였습니다. 
                또한 2016년에는 그림자 만들기, 밤샘책읽기 행사, 영화제 등 규모가 큰 행사도 진행하였습니다.
                </b></p>
                </div>
                <div className="col-lg-4 order-1 order-lg-2 text-center">
                    <img src="/img/features-1.svg" alt="" className="img-fluid"/> {/*이미지 수정 해야함*/}
                </div>
            </div>
        </div>
      )};
}

export default Culture;