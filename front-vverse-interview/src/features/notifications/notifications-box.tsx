import { useState } from "react";
import { NavButton } from "../../components/nav-button";
import { Overlay } from "../../components/overlay";
import { Wrapper } from "./styled";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { NotificationsList } from "./notifications-list";

export const NotificationsBox = () => {
  const [isVisible, setIsVisible] = useState(false);


  return (
    <Wrapper>
      <NavButton icon={faBell} onClick={() => setIsVisible(!isVisible)} />
      <Overlay visible={isVisible} onClose={() => setIsVisible(false)}>
            <NotificationsList />
      </Overlay>
    </Wrapper>
  );
};
