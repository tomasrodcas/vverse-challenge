import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavButtonWrapper } from "./styled";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavButtonProps {
  onClick: () => void;
  icon: IconProp;
}

export const NavButton = ({ onClick, icon }: NavButtonProps) => {
  return (
    <NavButtonWrapper onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </NavButtonWrapper>
  );
};
