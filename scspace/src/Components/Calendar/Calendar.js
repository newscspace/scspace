import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import ContextMenu from 'devextreme-react/context-menu';

import {get, post} from 'axios';

import LoginCheck from '../auth/LoginCheck';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import {withTranslation} from "react-i18next";

//import AppointmentTooltip from './AppointmentTooltip';

const views = ['week', 'month', 'agenda'];

const appointmentClassName = '.dx-scheduler-appointment';
const cellClassName = '.dx-scheduler-date-table-cell';


const resourcesData = [
  {text: '개인연습실 1', id: 'individual-practice-room1', color: '#D81159',}, 
  {text: '개인연습실 2', id: 'individual-practice-room2', color: '#D81159',},
  {text: '개인연습실 3', id: 'individual-practice-room3', color: '#D81159',},  
  {text: '피아노실 1', id: 'piano-room1', color: '#FF773D',}, 
  {text: '피아노실 2', id: 'piano-room2', color: '#FF773D',}, 
  {text: '합주실', id: 'group-practice-room', color: '#4B644A',}, 
  {text: '무예실', id: 'dance-studio', color: '#717EC3',}, 
  {text: '울림홀', id: 'ullim-hall', color: '#0EB1D2',},
  {text: '미래홀', id: 'mirae-hall',color: '#192A51',},
  {text: '세미나실 1', id: 'seminar-room1',color: '#B0228C',},
  {text: '세미나실 2', id: 'seminar-room2',color: '#B0228C',},
  {text: '창작공방', id: 'workshop',color: '#858786',},
  {text: '오픈스페이스', id: 'open-space',color: '#221E22',},
  {text: '개인연습실 1 (미승인)', id: 'individual-practice-room1-unaccepted', color: '#EB88AC',}, 
  {text: '개인연습실 2 (미승인)', id: 'individual-practice-room2-unaccepted', color: '#EB88AC',},
  {text: '개인연습실 3 (미승인)', id: 'individual-practice-room3-unaccepted', color: '#EB88AC',},  
  {text: '피아노실 1 (미승인)', id: 'piano-room1-unaccepted', color: '#FFBB9E',}, 
  {text: '피아노실 2 (미승인)', id: 'piano-room2-unaccepted', color: '#FFBB9E',}, 
  {text: '합주실 (미승인)', id: 'group-practice-room-unaccepted', color: '#A5B1A4',}, 
  {text: '무예실 (미승인)', id: 'dance-studio-unaccepted', color: '#B8BEE1',}, 
  {text: '울림홀 (미승인)', id: 'ullim-hall-unaccepted', color: '#86D8E8',},
  {text: '미래홀 (미승인)', id: 'mirae-hall-unaccepted',color: '#8C94A8',},
  {text: '세미나실 1 (미승인)', id: 'seminar-room1-unaccepted',color: '#D790C5',},
  {text: '세미나실 2 (미승인)', id: 'seminar-room2-unaccepted',color: '#D790C5',},
  {text: '창작공방 (미승인)', id: 'workshop-unaccepted',color: '#C2C3C2',},
  {text: '오픈스페이스 (미승인)', id: 'open-space-unaccepted',color: '#908E90',},
];

const spaceDict = {};
resourcesData.forEach(resource => {
  spaceDict[resource.id] = resource.text;
} );
const spaceDictAccepted = {};
resourcesData.slice(0, 13).forEach(resource => {
  spaceDictAccepted[resource.id] = resource.text;
} );

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.scheduler = React.createRef();
    this.state = {
      currentDate: new Date(),
      contextMenuItems: [],
      target: appointmentClassName,
      disabled: true,
      editing : {
        allowAdding: false,
        allowDeleting: false,
        allowUpdating: false,
      }, 
      filter : 'individual-practice-room1',
      data : []
    };
    this.changeSpace = this.changeSpace.bind(this)
    this.onAppointmentContextMenu = this.onAppointmentContextMenu.bind(this);
    this.onContextMenuItemClick = this.onContextMenuItemClick.bind(this);
    this.onCellContextMenu = this.onCellContextMenu.bind(this);
    this.customizeDateNavigatorText=this.customizeDateNavigatorText.bind(this);

    this.currentDate = '';
    LoginCheck()
    .then((result) => {
      if (result !== false && result.type==='admin') {this.setState({login:true, UserInfo:result, 
        editing : {
        allowAdding: true,
        allowDeleting: true,
        allowUpdating: true}});}
      else {this.setState({login:false});  }
    })
  }


  render() {
    const {
      contextMenuItems, target, disabled, currentDate, groups, crossScrollingEnabled, editing, filter, data
    } = this.state;
    const {t} = this.props;
    
    return (
      <div className="container py-5">
        <div className="calendar form-inline shadow bg-white p-5">
          <React.Fragment>
            <Dropdown >
              <Dropdown.Toggle className="space-filter" id="dropdown-basic" >
                {t(spaceDictAccepted[this.state.filter])}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(spaceDictAccepted).map((space) =>{
                  return (
                    <Dropdown.Item onClick={() =>{this.setState({filter:space}) }}>{t(spaceDictAccepted[space])}</Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
                        
            <Scheduler
              ref={this.scheduler}
              timeZone="Asia/Seoul"
              dataSource={data.filter((r)=>{return (r.space === filter || r.space === filter+"-unaccepted") })}
              views={views}
              groups={groups}
              crossScrollingEnabled={crossScrollingEnabled}
              defaultCurrentView="month"
              currentDate={currentDate}
              startDayHour={0}
              recurrenceEditMode="series"
              onAppointmentContextMenu={this.onAppointmentContextMenu}
              onAppointmentAdded={this.onAppointmentAdded}
              onAppointmentUpdated={this.onAppointmentUpdated}
              onAppointmentDeleted={this.onAppointmentDeleted}
              onCellContextMenu={this.onCellContextMenu}
              //appointmentTooltipComponent={AppointmentTooltip}

              customizeDateNavigatorText={this.customizeDateNavigatorText}

              editing={editing}
              height={1200}
            >
              <Resource
                dataSource={resourcesData}
                fieldExpr="space"
                label="Space"
              />
            </Scheduler>
            
            <ContextMenu
              dataSource={contextMenuItems}
              width={200}
              target={target}
              disabled={disabled}
              onItemClick={this.onContextMenuItemClick}
              itemRender={this.AppointmentMenuTemplate}
              />
          </React.Fragment>
        </div>
      </div>
    );
  }

  callApi = async (date) => {
    
    await get('/api/reservation/calendar/read?date='+date)
    .then((res) => {
      let newData = this.changeSpace(res.data)
      this.setState({data:newData})
    })
    .catch((err) => {console.log(err)})
  }

  changeSpace = (data) => {

    return data.map((r) => {
      r.space = (r.state === 'wait' ? r.space+"-unaccepted" : r.space)
      return r
    })
  }

  customizeDateNavigatorText(e){
    if (moment(this.currentDate).format('YYYY - MM') !== moment(e.startDate).format('YYYY - MM')){
      this.currentDate = e.startDate;
      this.callApi(e.startDate)
    }


    return e.text  
  }
  onAppointmentDeleted({appointmentData}){
    get('/api/reservation/delete?id='+appointmentData.id)
    .then((res) => {res.data ? alert('삭제가 완료되었습니다.') : alert('삭제에 실패했습니다.');  this.callApi(new Date())})
  }

  onAppointmentAdded({appointmentData}) {
    const url = '/api/reservation/calendar/create';
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    
    if(appointmentData.space.indexOf("-unaccepted") != -1){
      const removePos = appointmentData.space.indexOf("-unaccepted")
      appointmentData.space = appointmentData.space.substring(0, removePos)
    }

    post(url, JSON.stringify(appointmentData), config)
    .then((res) => {res.data ? alert('예약이 정상적으로 처리되었습니다.') : alert('예약이 처리되지 않았습니다.');  this.callApi(new Date())})
  }

  onAppointmentUpdated({appointmentData}){
    const url = '/api/reservation/calendar/update';
    const config = {
      headers : {
        'Content-Type' : 'application/json'
      }
    }
  
    post(url, JSON.stringify(appointmentData), config)
    .then((res) => {res.data ? alert('예약이 정상적으로 처리되었습니다.') : alert('예약이 처리되지 않았습니다.'); this.callApi(new Date())})
  }

  AppointmentMenuTemplate(itemData) {
    return (<div>
      {itemData.color ? <div className="item-badge" style={{ backgroundColor: itemData.color }} /> : ''}
      {itemData.text}
    </div>);
  }
  
  
  onAppointmentContextMenu({ appointmentData, targetedAppointmentData }) {

    if (this.state.login && this.state.UserInfo.type=='admin'){
      const scheduler = this.scheduler.current.instance;
      const resourceItems = resourcesData.map((item) => ({
        ...item,
        onItemClick: ({ itemData }) => scheduler.updateAppointment(appointmentData, {
          ...appointmentData,
          ...{ space: [itemData.id] },
        }),
      }));
      this.setState((state) => ({
        ...state,
        target: appointmentClassName,
        disabled: false,
        contextMenuItems: [
          {
            text: 'Open',
            onItemClick: () => scheduler.showAppointmentPopup(appointmentData),
          },
          {
            text: 'Delete',
            onItemClick: () => scheduler.deleteAppointment(appointmentData),
          },
          {
            text: 'Repeat Weekly',
            beginGroup: true,
            onItemClick: () => scheduler.updateAppointment(appointmentData, {
              startDate: targetedAppointmentData.startDate,
              recurrenceRule: 'FREQ=WEEKLY',
            }),
          },
           { text: 'Set Room', beginGroup: true, disabled: true },
          ...resourceItems,
        ],
      }));
    }
   
  }

  onContextMenuItemClick(e) {
    e.itemData.onItemClick(e);
  }

  onCellContextMenu({ cellData }) {

    const scheduler = this.scheduler.current.instance;
    this.setState((state) => ({
      ...state,
      target: cellClassName,
      disabled: false,
      contextMenuItems: [
        {
          text: '새 예약',
          onItemClick: () => scheduler.showAppointmentPopup(
            { startDate: cellData.startDate },
            true,
          ),
        },
        {
          text: '새 정기예약',
          onItemClick: () => scheduler.showAppointmentPopup(
            {
              startDate: cellData.startDate,
              recurrenceRule: 'FREQ=DAILY',
            },
            true,
          ),
        },
        {
          text: '팀 예약',
          beginGroup: true,
          onItemClick: () => {
            if (this.groups) {
              this.setState((currentState) => ({
                ...currentState,
                crossScrollingEnabled: false,
                groups: null,
              }));
            } else {
              this.setState((currentState) => ({
                ...currentState,
                crossScrollingEnabled: true,
                groups: ['space'],
              }));
            }
          },
        },
        {
          text: '오늘',
          onItemClick: () => {
            this.setState((currentState) => ({
              ...currentState,
              currentDate: new Date(),
            }));
          },
        },
      ],
    }));
  }
}

export default withTranslation()(Calendar);
