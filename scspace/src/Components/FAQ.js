import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class FAQ extends Component{
    constructor(props){
        super(props);

        this.state = {
          faq : [
            {question : "", answer : ""},
            {question : "", answer : ""},
            {question : "", answer : ""},
            {question : "", answer : ""},
            {question : "", answer : ""}
            
          ]
        }
    }


    render() {return (

<section id="faq" class="faq">
<div class="container-fluid">

  <div class="row gy-4">

    <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

      <div class="content px-xl-5">
        <h3>Frequently Asked <strong>Questions</strong></h3>
        <p>
          뭐라고 쓰면 되겠지

        </p>
      </div>

      <div class="accordion accordion-flush px-xl-5" id="faqlist">

        <div class="accordion-item">
          <h3 class="accordion-header">
            <button class="accordion-button collapsed" >
              <i class="bi bi-question-circle question-icon"></i>
              Non consectetur a erat nam at lectus urna duis?
            </button>
          </h3>
          <div id="faq-content-1" class="accordion-collapse collapse">
            <div class="accordion-body">
              Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h3 class="accordion-header">
            <button class="accordion-button collapsed"  >
              <i class="bi bi-question-circle question-icon"></i>
              1
            </button>
          </h3>
          <div id="faq-content-2" class="accordion-collapse collapse">
            <div class="accordion-body">
              2
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h3 class="accordion-header">
            <button class="accordion-button collapsed"  >
              <i class="bi bi-question-circle question-icon"></i>
              Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi?
            </button>
          </h3>
          <div id="faq-content-3" class="accordion-collapse collapse">
            <div class="accordion-body">
              Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis
            </div>
          </div>
        </div>

        <div class="accordion-item" >
          <h3 class="accordion-header">
            <button class="accordion-button collapsed" >
              <i class="bi bi-question-circle question-icon"></i>
              Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?
            </button>
          </h3>
          <div id="faq-content-4" class="accordion-collapse collapse" >
            <div class="accordion-body">
              <i class="bi bi-question-circle question-icon"></i>
              Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.
            </div>
          </div>
        </div>

        <div class="accordion-item" >
          <h3 class="accordion-header">
            <button class="accordion-button collapsed"  >
              <i class="bi bi-question-circle question-icon"></i>
              Tempus quam pellentesque nec nam aliquam sem et tortor consequat?
            </button>
          </h3>
          <div id="faq-content-5" class="accordion-collapse collapse" >
            <div class="accordion-body">
              Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="col-lg-5 align-items-stretch order-1 order-lg-2 img" >&nbsp;</div>
  </div>

</div>
</section>
     
      )};
}



export default FAQ;
