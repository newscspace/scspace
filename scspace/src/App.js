import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import Notice from './Components/notice/Notice';
import ViewNotice from './Components/notice/ViewNotice';
import CreateNotice from './Components/notice/CreateNotice';
import Space from './Components/Space';
import Ask from './Components/Ask';
import Faq from './Components/FAQ';
import Introduction from './Components/Introduction';
import Reservation from './Components/Reservation';
import Mypage from './Components/Mypage';
import Manage from './Components/Manage';
import Calendar from './Components/Calendar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
    
  }



  render() {return (
    <div className="App">
      <BrowserRouter>
      <Header>
      </Header>
      <Switch>
        
        <Route path="/" component={Main} exact/>
        <Route path="/notice" component={Notice} exact/>
        <Route path="/space/:name" render={(props) => (
          <Space key={props.match.params.name} {...props} exact/>
        )}/>
        <Route path="/introduction" component={Introduction} exact/>
        
        <Route path="/ask" component ={Ask} exact/>
        <Route path="/faq" component ={Faq} exact/>
        
        <Route path="/reservation" component={Reservation} exact/>
        <Route path="/mypage" component={Mypage} exact/>
        <Route path="/manage" component={Manage} exact/>
        <Route path="/calendar" component={Calendar} exact/>

        <Route path="/notice/view/:id" render={(props) => (
          <ViewNotice key={props.match.params.name} {...props} exact/>
        )}/>
        <Route path="/notice/create" component={CreateNotice} exact/>

        <Route path="*" render={() => (<h1>404 error</h1>)}/>
      </Switch>
   
      
      <Footer>
      </Footer>
      
      </BrowserRouter>
    </div>
  )};
}

export default App;
