import styled from "styled-components";
import Button from "../StyledComponents/Button";
import Text from "../StyledComponents/Text";
import colors from "../StylingData/colors";
import icons from "../StylingData/icons";
import SidebarItem from "./SidebarItem";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, userActions, useSelector } from "../index";
import { useHistory, useLocation } from "react-router-dom";
import StateManager from "react-select";
import Toggle from "./Toggle";
const SidebarWrapper = styled.div`
   display: flex;
   flex-direction: column;
   width: 25%;
   background: ${colors.offWhite};
   align-items: flex-start;
   padding: 2rem;
   min-height: 100%;
   justify-content: space-between;
   @media (max-width: 800px) {
      position: fixed;
      left: 0;
      top: 0;
      min-height: 100vh;
      width: 50%;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      background: white;
      z-index: 1;
   }
   @media (max-width: 500px) {
      width: 75%;
   }
`;

const NomadLogo = styled.img`
   margin-bottom: 4rem;
`;
const JDLogoWrapper = styled.div`
   height: 2.3rem;
   width: 2.3rem;
   display: flex;
   justify-content: center;
   align-items: center;
   background: ${colors.primary};
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
   transform: rotate(45deg);
   border-radius: 10px;
   margin-bottom: 2rem;
`;

const JDText = styled.div`
   font-family: "OpenSans-SemiBold";
   font-size: 1rem;

   color: white;
   transform: rotate(-45deg);
`;

const FirstSidebarItemWrapper = styled.div`
   margin-bottom: 3.5rem;
   width: 100%;
   margin-top: 3.5rem;
`;
const TopContentWrapper = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
`;

const BarsIconWrapper = styled.div`
   height: 40px;
   width: 40px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: white;
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.04);
   position: fixed;
   top: 10px;
   left: 10px;
   border-radius: 0.25rem;
   cursor: pointer;
`;

const Sidebar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [width, setWidth] = useState(window.innerWidth);

   const location = useLocation();

   const sidebar = useRef<HTMLDivElement>(null);
   const dispatch = useAppDispatch();
   const userData = useSelector((state) => state.userData);
   const history = useHistory();
   const logout = () => {
      dispatch(userActions.logout());
      history.push("/");
      localStorage.removeItem("loggedIn");
   };
   useEffect(() => {
      const func = () => {
         setWidth(window.innerWidth);
      };
      window.addEventListener("resize", func);
      return () => window.removeEventListener("resize", func);
   }, [setWidth]);
   useEffect(() => {
      const func = (e: MouseEvent): void => {
         if (isOpen) {
            if (!(e.target as HTMLElement).contains(sidebar.current)) {
               setIsOpen(false);
            }
         }
      };
      window.addEventListener("click", func);
      return () => window.removeEventListener("click", func);
   }, [setIsOpen, isOpen]);
   const SidebarJSX = (
      <SidebarWrapper ref={sidebar} onBlur={() => setIsOpen(false)}>
         <TopContentWrapper>
            <NomadLogo src={icons.nomadLogo} />
            <JDLogoWrapper>
               <JDText>JD</JDText>
            </JDLogoWrapper>
            <Text size="medium" fontFamily="OpenSans-SemiBold">
               {userData.name}
            </Text>
            <Text margin="0.25rem 0" size="medium" color={colors.lightGray}>
               Premium Nomad
            </Text>
            <FirstSidebarItemWrapper>
               <SidebarItem
                  text="Bookings"
                  icon={icons.inbox}
                  active={location.pathname === "/booking-view"}
                  onClick={() => history.push("/booking-view")}
               ></SidebarItem>
            </FirstSidebarItemWrapper>
            <SidebarItem text="Refer and Earn" icon={icons.bed}></SidebarItem>
            <SidebarItem
               onClick={() => history.push("/account-view")}
               text="Account Settings"
               icon={icons.userSettings}
               active={location.pathname === "/account-view"}
            ></SidebarItem>
            <Text
               style={{ marginTop: "2rem", marginBottom: "1rem" }}
               size="small"
            >
               SUPPORT
            </Text>

            <SidebarItem text="Contact us" icon={icons.lifeRing}></SidebarItem>
            <SidebarItem text="FAQ" icon={icons.externalLink}></SidebarItem>
         </TopContentWrapper>
         <div
            onClick={() => logout()}
            style={{ display: "flex", cursor: "pointer" }}
         >
            <Toggle></Toggle>
            <Text fontFamily="OpenSans-SemiBold">Sign out</Text>
         </div>
      </SidebarWrapper>
   );
   if (width <= 800) {
      if (isOpen) {
         return SidebarJSX;
      } else {
         return (
            <BarsIconWrapper onClick={() => setIsOpen(true)}>
               <img src={icons.bars} />
            </BarsIconWrapper>
         );
      }
   }
   return SidebarJSX;
};

export default Sidebar;
