import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom';

function FastNotice(props){

  const [fastNotice, changeFastNotice] = useState([
    {link:"#", title:"학생문화공간위원회 홈페이지 개편", content:"홈페이지 사용과 관련 문의사항이 있다면 이메일 혹은 문의하기를 통해 연락해주세요. "},
    {link:"https://forms.gle/Qm2gLrpCFukRRXuM6", title:"홈페이지 버그 관련 공지", content:"현재 홈페이지는 베타 버전입니다. 만약 홈페이지에 버그가 발생한다면 클릭해 제보해주시면 빠른 조치 취하겠습니다."},
    {link:"#", title:"합주실 카드키 관련 공지", content:"합주실 카드키는 상근 시간에 공간위실에서 수령 가능합니다."},
    {link:"https://docs.google.com/document/d/1iaHYLSHobzjnzDbwi4nagN0XSlpAaNAezSdpwASngWo/edit?usp=sharing", title:"물품 대여 공지", content:"물품 대여 확인서 작성 후 물품 대여가 가능합니다. 클릭하면 확인서 양식으로 넘어갑니다."},

  ])

  return(
    <section className="featured-services">
        <div className="container">
          <div className="row gy-4">
          {
            fastNotice.map((contents) => {
            return(
            <div className="col-xl-3 col-md-6 d-flex" >
              <div className="service-item position-relative">
                <div className="icon"><i className="bi bi-broadcast icon"></i></div>
                  <h4><a href={contents.link} className="stretched-link">{contents.title}</a></h4>
                  <p className="newline">{contents.content}</p>
                </div>
              </div>)
            })
          }
          </div>
        </div>
      </section>
  )
}



export default FastNotice;
