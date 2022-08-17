import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';
import Notice from './Components/notice/Notice';
import ViewNotice from './Components/notice/ViewNotice';
import CreateNotice from './Components/notice/CreateNotice';
import Space from './Components/Space';
import Ask from './Components/Ask/Ask';
import Faq from './Components/faq/FAQ';
import Introduction from './Components/Introduction';
import Reservation from './Components/Reservation';
import Mypage from './Components/mypage/Mypage';
import Manage from './Components/manage/Manage';
import Calendar from './Components/Calendar';
import CreateTeam from './Components/team/CreateTeam';
import CreateFaq from './Components/faq/CreateFaq';
import Confirmation from './Components/Confirmation';
import Team from './Components/team/Team';
import ReservationList from './Components/manage/Reserve/ReservationList';
import CreateAsk from './Components/Ask/CreateAsk';
import ViewAsk from './Components/Ask/ViewAsk';


import Login from './Components/auth/Login';
import Logout from './Components/auth/Logout';

//
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
        <Route path="/ask/create" component ={CreateAsk} exact/>
        <Route path="/ask/view/:id" render={(props) => (
          <ViewAsk key={props.match.params.name} {...props} exact/>
        )}/>

        <Route path="/faq" component ={Faq} exact/>
        <Route path="/faq/create" component ={CreateFaq} exact/>
        <Route path="/reservation" component={Reservation} exact/>
        <Route path="/mypage" component={Mypage} exact/>
        <Route path="/manage" component={Manage} exact/>
        <Route path="/calendar" component={Calendar} exact/>

        <Route path="/notice/view/:id" render={(props) => (
          <ViewNotice key={props.match.params.name} {...props} exact/>
        )}/>
        <Route path="/notice/create" component={CreateNotice} exact/>
        <Route path="/team/create" component={CreateTeam} exact/>
        <Route path="/confirmation" component={Confirmation} exact/>
        <Route path="/team" component={Team} exact/>

        <Route path="/manage/reservation" component={ReservationList} exact/>

        <Route path="/login" component={Login} exact/>
        <Route path="/logout" component={Logout} exact/>


        <Route path="*" render={() => (<h1>404 error</h1>)}/>
      </Switch>
   
      
      <Footer>
      </Footer>
      
      </BrowserRouter>
    </div>
  )};
}

export default App;
