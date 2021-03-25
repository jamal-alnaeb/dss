import { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Text from "../StyledComponents/Text";
import colors from "../StylingData/colors";
import icons from "../StylingData/icons";

const activeStyles = css`
  div {
    color: white;
  }
  font-family: "OpenSans-SemiBold";
  img {
    filter: brightness(0) invert(1) !important;
  }
  background: ${colors.darkPrimary};
`;

const inactiveStyles = css`
  img {
    filter: brightness(0) invert(1) brightness(0.5);
  }
`;

const SidebarItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  ${inactiveStyles};
  transition: all 0.3s ease-in-out;
  &:hover {
    ${activeStyles};
  }
  ${(p) => (p.active ? activeStyles : "")};
`;

const IconWrapper = styled.img`
  margin-right: 0.85rem;
`;

export interface SidebarItemProps extends InputHTMLAttributes<HTMLDivElement> {
  text: string;
  icon: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  text,
  icon,
  style,
  active,
  onClick,
}) => {
  return (
    <SidebarItemWrapper onClick={onClick} active={active}>
      <IconWrapper src={icon}></IconWrapper>
      <Text
        fontFamily="OpenSans-SemiBold"
        size="medium"
        color={colors.mediumGray}
      >
        {text}
      </Text>
    </SidebarItemWrapper>
  );
};

export default SidebarItem;
