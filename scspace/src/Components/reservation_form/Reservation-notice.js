import React, { Component } from 'react';


class ReservationNotice extends Component {
  constructor(props) {
    super(props);
   
  
    this.state = {
      notice: [
        { title: '1', contents: '2' },
        { title: '3', contents: '4' },
        { title: '5', contents: '6' }
      ]
    }


  }


  
  render() {
    return (
      
         <div className="col-lg-4">

            <div className="info">
                <h3>유의사항</h3>
                <p>유의사항을 잘 읽어주시면 굉장히 감사하겠네요</p>
            
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

export default ReservationNotice;