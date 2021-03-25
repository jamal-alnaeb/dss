import { useState } from "react";
import styled, { css } from "styled-components";
import colors from "../StylingData/colors";

const ToogleWrapper = styled.div`
   position: relative;
   background-color: rgba(0, 0, 0, 0.08);
   height: 1.25rem;
   width: 2.5rem;
   /* border-top-left-radius: 50px; */
   /* border-top-left-radius: 50px; */
   border-radius: 30px;
   margin-right: 1rem;
   cursor: pointer;
`;

const ToggleCircle = styled.div<{ isOn?: boolean }>`
   position: absolute;
   height: 1.15rem;
   width: 1.15rem;
   top: 50%;
   transform: translate(0, -50%);
   border-radius: 50%;
   background-color: ${colors.darkPrimary};
   right: 0.05rem;
`;

export interface ToggleProps {}

const Toggle: React.FC = () => {
   const [isOn, setIsOn] = useState(false);
   return (
      <ToogleWrapper>
         <ToggleCircle></ToggleCircle>
      </ToogleWrapper>
   );
};

export default Toggle;
