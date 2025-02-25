import { INotification } from "../models/notification.models";
import styled from "styled-components";
import { faHeart, faComment, faUserPlus, faBirthdayCake, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { forwardRef, useEffect } from "react";

dayjs.extend(relativeTime);

interface NotificationItemProps {
  notification: INotification;
  onVisible?: () => void;
}

const DEFAULT_PROFILE_IMAGE = "https://i.imgur.com/W5Ixhto.jpeg";


export const NotificationItem = forwardRef<HTMLDivElement, NotificationItemProps>(({ notification, onVisible }, ref) => {
    useEffect(() => {
        if(onVisible){
            onVisible()
        }
    }, [])

  return (
    <NotificationCard isRead={notification.is_read} ref={ref}>
      <ProfileImageWrapper>
          <ProfileImage src={DEFAULT_PROFILE_IMAGE} alt="User" />
          <NotificationIcon>{getNotificationIcon(notification.type)}</NotificationIcon>
      </ProfileImageWrapper>
      <NotificationContent>
        <Message>
          <strong>{notification.title}</strong> {notification.message}
        </Message>
        <Timestamp>{dayjs(notification.date).fromNow()}</Timestamp>
      </NotificationContent>
    
      {!notification.is_read && <UnreadIndicator />}
    </NotificationCard>
  );
}
)

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "reaction":
      return <FontAwesomeIcon icon={faHeart} color="red" />;
    case "comment":
      return <FontAwesomeIcon icon={faComment} color="blue" />;
    case "friend_request":
      return <FontAwesomeIcon icon={faUserPlus} color="green" />;
    case "birthday":
      return <FontAwesomeIcon icon={faBirthdayCake} color="orange" />;
    case "post":
      return <FontAwesomeIcon icon={faVideo} color="purple" />;
    default:
      return null;
  }
};


const NotificationCard = styled.div<{ isRead: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ isRead }) => (isRead ? "#fff" : "#e7f3ff")};
  cursor: pointer;
  &:hover {
    background-color: #dce8f5;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;

`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const NotificationContent = styled.div`
  padding: 10px;
  flex-grow: 1;
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: #888;
`;

const NotificationIcon = styled.div`
  margin-left: 8px;
  font-size: 18px;
  position: absolute;
  bottom: -10px;
  right: -3px;
`;

const UnreadIndicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: blue;
  border-radius: 50%;
  margin-left: 8px;
`;
