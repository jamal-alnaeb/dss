import React from "react";
import styled from "styled-components";
import colors from "../StylingData/colors";
import Select from "react-select";
import {
   formActions,
   InputName,
   useAppDispatch,
   userActions,
   useSelector,
} from "../index";
export interface InputProps {
   label?: string;
   link?: string;
   placeholder: string;
   type?: "text" | "password" | "number" | "select";
   options?: string[];
   name: InputName;
}
const FormLabel = styled.div`
   font-family: "OpenSans-SemiBold";
   color: ${colors.lightBlack};
   font-size: 12px;
`;

const FormLink = styled.div`
   font-family: "OpenSans-SemiBold";
   color: ${colors.linkBlue};
   font-size: 12px;
   cursor: pointer;
`;
const FormLabelWrapper = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;
   margin-bottom: 0.5rem;
`;

const InputSC = styled.input`
   background: white;
   outline: none;
   border: none;
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.02);
   padding: 0.9rem 0.7rem;
   border-radius: 0.25rem;
   font-size: 14px;
   ::placeholder {
      color: ${colors.lightGray};
      background: white;
   }
   color: ${colors.gray};
`;

const InputWrapper = styled.div`
   display: flex;
   flex-direction: column;
   margin-bottom: 1.5rem;
   width: 100%;
`;

const Input: React.SFC<InputProps> = ({
   label,
   placeholder,
   type = "text",
   link,
   options,
   name,
}) => {
   const formData = useSelector((state) => state.formData);

   console.log(formData);
   const dispatch = useAppDispatch();
   const onValueChange = (e: React.ChangeEvent) => {
      const value = (e.target as HTMLInputElement).value;
      dispatch(formActions.setFields({ [name]: value }));
   };
   if (type !== "select") {
      return (
         <InputWrapper>
            <FormLabelWrapper>
               <FormLabel>
                  {label} <span style={{ opacity: 0 }}>a</span>
               </FormLabel>
               {link ? <FormLink>{link}</FormLink> : ""}
            </FormLabelWrapper>
            <InputSC
               value={formData[name]}
               placeholder={placeholder}
               type={type}
               onChange={onValueChange}
            ></InputSC>
         </InputWrapper>
      );
   } else {
      return (
         <InputWrapper>
            <FormLabelWrapper>
               {label ? (
                  <FormLabel>{label}</FormLabel>
               ) : (
                  <FormLabel style={{ opacity: 1 }}>dummy</FormLabel>
               )}
               {link ? <FormLink>{link} </FormLink> : ""}
            </FormLabelWrapper>
            <Select
               styles={{
                  control: (base) => ({
                     ...base,
                     fontSize: "14px",
                     fontFamily: "OpenSans",
                     color: colors.lightGray,
                     border: "none",
                     boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.02)",
                     padding: "0.3rem 0.2rem",
                  }),
               }}
               options={(options || []).map((x) => ({ value: x, label: x }))}
               onChange={(v) =>
                  dispatch(formActions.setFields({ [name]: v!.value }))
               }
               placeholder={placeholder}
               type={type}
            ></Select>
         </InputWrapper>
      );
   }
};

export default Input;
