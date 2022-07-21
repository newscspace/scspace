import React, {Component} from 'react';


class Caution extends Component{
    render() {return (
        <div className="tab-pane fade show active">

            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>공간 사용 규칙</h4>
            </div>
            <p>공간 사용 규칙은 <a href= 'https://docs.google.com/document/d/1JMkKPL_MZtwl6pU6FDbC8ZrNjWvyBwYp-B2dcVqHvGw/edit'>이 문서</a>를 참고해주세요.</p>

        </div>
    )}
}

export default Caution;