import React from 'react';
import styled from 'styled-components';
import EmailIcon from './email-icon.png';
import CrestLogo from './crest-logo.png';

const Main = styled.li`
    width: 90%;
    height: 55px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 5px 20px 30px rgba(0, 0, 0, 0.25);
    font-size: 10px;
    cursor: pointer;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    background-color: ${props => props.status === 'read' ? '#CBD3DC' : '#C6EEF0'};
    padding-left: 7px;
    padding-right: 7px;
`

const Message = styled.div`
    flex-grow: 2;
    display: flex;
    align-items: center;
`

const Sender = styled.div`
    margin-right: 6px;
`

const VectorContainer = styled.div`
    margin-right: 7px;
    height: auto;
    width: 15px;
    background-color: white;
    display: flex;
    align-items: center;
    border-radius: 2px;
`

const VectorImage = styled.img`
    width: 100%;
`

const HeaderPart = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

const Status = styled.div`

`

const timeIntToString = (time) => {
    let newTime = new Date(time);
    return newTime.toLocaleDateString() + ' ' + newTime.toLocaleTimeString()
}

class Notification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showReadButton: false
        }
    }

    toggleReadButton = () => {

        this.setState( prevState => ({showReadButton: !prevState.showReadButton}));
    }
    
    render() {
        let notiInfo = this.props.noti;
    
        return (
            
            <Main onClick={() => this.props.toggleNoti(notiInfo.invite_id)}>
                <Header onMouseEnter={this.toggleReadButton} status={notiInfo.status}>
                    <HeaderPart>
                        <VectorContainer>
                            <VectorImage src={notiInfo.vector === 'Email' ? EmailIcon : CrestLogo} />
                        </VectorContainer>
                        <Sender>{notiInfo.sender_id}</Sender>
                        {timeIntToString(notiInfo.invite_time)}
                    </HeaderPart>
                    <HeaderPart>
                        <Status >
                            {
                                notiInfo.status
                            }
                        </Status>
                    </HeaderPart>
                </Header>
                <Message>
                    {notiInfo.invite}
                </Message>
            </Main>
        );
    }
}

export default Notification;