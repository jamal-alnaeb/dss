import styled from "styled-components";
import colors from "../StylingData/colors";

type TextSize = "small" | "medium" | "large" | "buttonSize" | "xl";

const textSizeObj: { [k in TextSize]: string } = {
   small: "12px",
   medium: "14px",
   large: "18px",
   buttonSize: "16px",
   xl: "40px",
};

type FontFamily = "OpenSans" | "OpenSans-SemiBold";

export default styled.div<{
   size?: TextSize;
   fontFamily?: FontFamily;
   color?: string;
   margin?: string;
}>`
   font-size: ${(p) => textSizeObj[p.size || "medium"]};
   font-family: ${(p) => p.fontFamily};
   color: ${(p) => p.color || colors.lightBlack};
   margin: ${(p) => p.margin || "0px"};
`;
