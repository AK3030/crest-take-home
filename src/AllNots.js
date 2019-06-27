import React from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import InvitationsJson from './invitations';
import NewInvitationsJson from './invitations_update';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  padding: 0;
  margin: 0;
  background-color: white;
  padding-bottom: 8px;
  min-width: 375px;
`

const convertToInviteObj = json => {
  let arr = json.invites;
  let obj = {};
  arr.forEach(invite => { obj[invite.invite_id] = invite });
  return obj;
}

const ShowUnreadToggle = styled.button`
  cursor: pointer;
  border: 1px solid grey;
  margin-top: 5px;
`

class AllNots extends React.Component {
  constructor(props) {
    super(props);
    this.isInititialRender = true;
    this.state = { 
      showread: true,
      notifications: convertToInviteObj(InvitationsJson) 
    };
  }

  componentDidMount = () => {
    setTimeout(() => { this.addNewNotifications(NewInvitationsJson) }, 3000);
  }

  addNewNotifications = (newNotications) => {
    let newNoticationsObj = convertToInviteObj(newNotications);
    this.setState(prevState => {
      let merged = Object.assign({}, prevState.notifications, newNoticationsObj);
      return { notifications: merged };
    })
  }

  toggleNotiStatusHelper = (inviteId, prevState) => {
    let notification = Object.assign({}, prevState.notifications[inviteId]);
    notification.status = notification.status === 'read'? 'unread' : 'read';
    let newNotis = Object.assign({}, prevState.notifications, {[inviteId]: notification});
    let newState = {notifications: newNotis}
    return newState;
  }

  toggleNotiStatus = (inviteId) => {
    this.setState(prevState => this.toggleNotiStatusHelper(inviteId, prevState));
  }

  toggleShowRead = () => {
    this.setState(prevState => ({showread: !prevState.showread}))
  }

  render() {
    let notiArray = Object.keys(this.state.notifications).map( key => this.state.notifications[key]);
    if (this.state.showread === false) {
      notiArray = notiArray.filter( noti => noti.status === 'unread');
    }
    let notiList = notiArray.map((noti) => {
      return <Notification toggleNoti={this.toggleNotiStatus} key={noti.invite_id} noti={noti}></Notification>
    });
    
    return (
      <Main>
        <ShowUnreadToggle onClick={this.toggleShowRead}>{this.state.showread? 'Hide Read' : 'Show Read'}</ShowUnreadToggle>
        {
          notiList
        }
      </Main>
    );
  }

}

export default AllNots;