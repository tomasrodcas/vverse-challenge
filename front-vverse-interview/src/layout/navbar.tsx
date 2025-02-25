import { NotificationsBox } from "../features/notifications/notifications-box";
import { NavbarWrapper, NavButtonsWrapper } from "./styled";

export const Navbar = () => {
  return (
    <NavbarWrapper>
      <div></div>
      <NavButtonsWrapper>
        <NotificationsBox />
      </NavButtonsWrapper>
    </NavbarWrapper>
  );
};
