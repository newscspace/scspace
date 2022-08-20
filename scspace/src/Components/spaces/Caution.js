import React, {Component} from 'react';


class Introduction extends Component {

    constructor(props){
        super(props);
        this.state = {  edit : false, add:[]}
        this.state.roomData = JSON.parse(JSON.stringify(this.props.roomData))

    }




  
  editContent = (mode, idx=null) => {
    let nextstate = Object.assign({}, this.state);
    if(mode === 'cancel') {
      nextstate.roomData = JSON.parse(JSON.stringify(this.props.roomData))
      nextstate.edit = false;
      this.setState(nextstate);

    } 
    else if (mode === 'add') {
      nextstate.roomData.content[this.state.roomData.content.length]={title:'', body:{head:'', list:[]}};
      this.setState(nextstate);
    }

    else if (mode === 'edit'){
        nextstate.edit = true;
        this.setState(nextstate);
    }

    else if (mode === 'delete'){
        nextstate.roomData.content.splice(idx, 1);
        this.setState(nextstate);
    }

    else if (mode === 'complete'){
        nextstate.edit = false;
        this.setState(nextstate);

        this.props.callApi(this.state.roomData, 'caution');
    }
    else if (mode === 'listadd'){
        nextstate.roomData.content[idx].body.list.push(' ');
        this.setState(nextstate);
    }
    else if (mode === 'listdelete'){
        nextstate.roomData.content[idx].body.list.pop();
        this.setState(nextstate);
    }
  }
 
  changeHandler = (idx, e) => {
      let nextstate = Object.assign({}, this.state);
      if (e.target.name === 'intro'){
        nextstate.roomData.intro = e.target.value;
      }
      else if (e.target.name === 'title'){ 
        nextstate.roomData.content[idx][e.target.name]= e.target.value; 
      }
      else if (e.target.name === 'head') {
        nextstate.roomData.content[idx]['body'][e.target.name]= e.target.value; 
      }
      else if (e.target.name === 'list'){
        nextstate.roomData.content[idx]['body'][e.target.name][parseInt( e.target.id)]= e.target.value; 
      }
      this.setState(nextstate);
      
  }

  admin_return = (mode, idx=null) => {

      if (this.props.login === true && this.props.UserInfo.type==='admin' ){
        if(this.state.edit === true && mode === 'edit'){
          return (
            <div className="text-end">
                  <button type="button" className="modalButton2" onClick={() => {this.editContent('complete')}}>수정 완료</button>
                  <button type="button" className="modalButton1" onClick={() => {this.editContent('cancel')}}>취소</button>
                  </div>
          )
        }
        else if (this.state.edit === false && mode === 'edit'){
          return(
            <div className="text-end">  
                  <button type="button" className="modalButton2" onClick={() => {this.editContent('edit')}}>수정하기</button>
                  </div>
          )
        }
        else if(this.state.edit === true && mode ==='add') {
            return(
                <div className="text-end">
                <button type="button" className="modalButton2" onClick={() => {this.editContent('add')}}>추가하기</button>
                <hr/>
                 </div>
            )
        }

        else if(this.state.edit === true && mode ==='list') {
            return(
                <div className="text-end">
                <button type="button" className="modalButton2 " onClick={() => {this.editContent('listadd',idx )}}>li 추가</button>
                <button type="button" className="modalButton2 " onClick={() => {this.editContent('listdelete',idx )}}>li 삭제</button>
                 </div>
            )
        }



        else if (this.state.edit === true && mode === 'delete'){
          return(
            <div className="text-end">
                  <button type="button" className="modalButton1" onClick={() => {this.editContent('delete', idx)}}>삭제</button>
            </div>
                )
        }

       
      
      }
      else{
        return(<div/>)
      }
  }


   render(){ return (
        <div className="tab-pane fade show active space">
        
        <p class="fst-italic">{this.state.edit ? (<textarea name="intro" onChange={this.changeHandler.bind(this, 0)} value ={this.state.roomData.intro} />): this.state.roomData.intro}</p>

      

        {this.state.roomData.content.map((contents, idx) => {
            return (
            <div>
            <div className="d-flex align-items-center mt-4">
                <i className="bi bi-check2"></i>
                <h4>{this.state.edit ? (<input type="text"  name="title" onChange={this.changeHandler.bind(this, idx)} value ={contents.title}  required/>): contents.title}</h4>
            </div>
            {this.admin_return('list', idx)}
            <p>{this.state.edit ? (<textarea name="head" onChange={this.changeHandler.bind(this, idx)} value ={contents.body.head} required />): contents.body.head}</p>
            <ul>
                {contents.body.list.map((list, idx2) => {
                    return(
                        <li>{this.state.edit ? (<textarea  name="list" id={idx2} onChange={this.changeHandler.bind(this, idx)} value ={list} required />): list}</li>
                    )
                })}
            </ul>
            {this.admin_return('delete', idx)}
            </div>
            )})
        }
        <br/>
        <hr/>
        {this.admin_return('add')}      
        {this.admin_return('edit')}

        </div>
        
    )}
}

export default Introduction;