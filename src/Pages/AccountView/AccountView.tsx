import styled, { css } from "styled-components";
import Sidebar from "../../Components/Sidebar";
import SidebarItem from "../../Components/SidebarItem";
import Text from "../../StyledComponents/Text";
import colors from "../../StylingData/colors";
import icons from "../../StylingData/icons";
import { Link } from "react-router-dom";
import { RightContentWrapper, ViewWrapper } from "../BookingView/BookingView";
import Input from "../../Components/Input";
import Button from "../../StyledComponents/Button";
import { useDispatch } from "react-redux";
import { formActions, userActions, useSelector } from "../..";
import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { count } from "node:console";
const MainCard = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 100%;
   margin: 3rem 0;
   border-radius: 0.5rem;
   overflow: hidden;
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;
const CardHeader = styled.div`
   display: flex;
   align-items: flex-start;
   width: 100%;
   background: white;
   img {
      margin-right: 2rem;
   }
   padding: 2.5rem;
   @media (max-width: 600px) {
      padding: 1rem;
   }
`;

const CardFormRow = styled.div`
   display: flex;
   width: 100%;
   & div:first-child {
      margin-right: 2rem;
   }
   @media (max-width: 600px) {
      flex-direction: column;
   }
`;

const CardBody = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   padding: 2rem;
`;

const CardFooter = styled.div`
   display: flex;
   width: 100%;
   justify-content: flex-end;
   align-items: center;
   @media (max-width: 600px) {
      flex-direction: column;
   }
`;

let allCountires: null | string[] = null;

const AccountView: React.FC = () => {
   const state = useSelector((state) => state);
   const [countires, setCountries] = useState(() => allCountires || []);
   const dispatch = useDispatch();
   useEffect(() => {
      const { country, email, password, name, phoneNumber } = state.userData;
      dispatch(formActions.setFields({ country, email, name, phoneNumber }));
   }, []);
   const history = useHistory();

   useEffect(() => {
      if (!countires.length) {
         fetch("https://restcountries.eu/rest/v2/all").then((res) => {
            res.json().then((arr: { name: string }[]) => {
               setCountries(arr.map((x) => x.name));
               allCountires = arr.map((x) => x.name);
            });
         });
      }
   }, [countires]);
   useEffect(() => {
      if (!state.userData.loggedIn) {
         history.push("/");
      }
   }, [state.userData.loggedIn]);
   const onUpdateButtonClick = () => {
      const {
         country,
         newPassword,
         email,
         name,
         phoneNumber,
         currentPassword,
      } = state.formData;
      const userData = state.userData;
      if (newPassword.trim()) {
         if (currentPassword !== userData.password) {
            alert("The current password you entered is wrong");
            return;
         }
      }
      dispatch(
         userActions.updateUserData({
            country: country.trim() || userData.country,
            password: newPassword.trim() || userData.password,
            email,
            name,
            phoneNumber,
         })
      );
      alert("The account settings are updated");
   };
   return (
      <ViewWrapper>
         <Sidebar></Sidebar>
         <RightContentWrapper>
            <Text margin="0 0 3rem 0" size="xl">
               Account
            </Text>
            <Text size="large">Review and update your account details</Text>

            <Text margin="1rem 0rem" style={{ lineHeight: 2 }}>
               Please make sure these details are up to date as they’ll be used
               for your bookings, and communications with the hotels.
            </Text>
            <Link to="/booking-view">
               <Text color={colors.linkBlue}>
                  Learn more about our premium subscription
               </Text>
            </Link>
            <MainCard>
               <CardHeader>
                  <img src={icons.userEdit} alt="" />
                  <div>
                     <Text
                        margin="0 0 1rem 0"
                        size="large"
                        fontFamily="OpenSans-SemiBold"
                     >
                        {state.userData.name}
                     </Text>
                     <Text>
                        Please make sure these details are up to date as they’ll
                        be used for your bookings, and communications with the
                        hotels.
                     </Text>
                  </div>
               </CardHeader>
               <CardBody>
                  <CardFormRow>
                     <Input
                        placeholder="Enter your name"
                        name="name"
                        label="Your Name"
                     ></Input>
                     <Input
                        name="email"
                        placeholder="Enter the email"
                        label="Your Name"
                     ></Input>
                  </CardFormRow>
                  <CardFormRow>
                     <Input
                        name="country"
                        placeholder="Select Country"
                        type="select"
                        label="Select Country"
                        options={
                           countires.length
                              ? countires
                              : ["Pakistan", "India", "Afghanistan"]
                        }
                     ></Input>
                     <Input
                        name="phoneNumber"
                        placeholder="Phone number"
                     ></Input>
                  </CardFormRow>
                  <CardFormRow
                     style={{
                        borderTop: "1px solid rgba(0,0,0,0.05)",
                        paddingTop: "2rem",
                     }}
                  >
                     <Input
                        name="currentPassword"
                        placeholder="John Doe"
                        label="Current Password"
                        type="password"
                        link="Forgot?"
                     ></Input>
                     <Input
                        name="newPassword"
                        placeholder="New Password"
                        label="New Password"
                     ></Input>
                  </CardFormRow>
                  <CardFooter>
                     <Text color={colors.mediumGray} margin="0 1rem">
                        Your data will be <Link to="/">handled with care</Link>
                     </Text>
                     <Button onClick={() => onUpdateButtonClick()}>
                        Update
                     </Button>
                  </CardFooter>
               </CardBody>
            </MainCard>
         </RightContentWrapper>
      </ViewWrapper>
   );
};

export default AccountView;
