import React, { Component } from 'react';
import {withTranslation} from "react-i18next";


class ReservationNotice extends Component {
  constructor(props) {
    super(props);
   
  
    this.state = {
      notice: [
        { title: '회칙을 잘 확인해주세요.', contents: '홈페이지 소개 페이지에서 회칙 확인이 가능합니다. 회칙을 잘 읽고 예약해주세요.' },
        { title: '예약 현황을 확인해주세요.', contents: '홈페이지 예약 현황에서 공간의 예약 상황을 확인할 수 있습니다. 에약 현황 확인 후 예약해주세요.' },
        { title: '사용 후 공간을 잘 정리해주세요.', contents: '공간 사용 후 쓰레기, 분실물, 파손된 물품 등이 없게 해주세요. 추후 불이익이 있을 수 있습니다.' }
      ]
    }


  }


  
  render() {
    const {t} = this.props;
    return (
      
         <div className="col-lg-4">

            <div className="info">
                <h3>{t('유의사항')}</h3>
                <p>유의사항을 잘 확인해주세요.</p>
            
            {this.state.notice.map((contents, idx) => {
                return (
                    <div className="info-item d-flex">
                        <div>
                            <h4>{contents.title}</h4>
                            <p>{contents.contents}</p>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
  };
}

export default withTranslation()(ReservationNotice);