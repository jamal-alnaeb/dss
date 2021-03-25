import styled from "styled-components";
import Text from "../../StyledComponents/Text";
import colors from "../../StylingData/colors";
import icons from "../../StylingData/icons";
import backgroundImage from "./background-image.jpg";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import Button from "../../StyledComponents/Button";
import { useAppDispatch, userActions, useSelector } from "../..";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const SignInPageWrapper = styled.div`
   display: flex;
   background: ${colors.offWhite};
   height: 100%;
`;

const LeftColumn = styled.div`
   width: 40%;
   flex-basis: 40%;
   display: flex;
   flex-direction: column;
   @media (max-width: 700px) {
      width: 100%;
      flex-basis: 100%;
   }
`;

const TopContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: 50px 60px;
   background: white;
`;

const KeyIconWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 50px;
   width: 50px;
   border-radius: 10px;
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
   transform: rotate(45deg);
   background-color: ${colors.primary};
   margin-left: 10px;
`;
const KeyImage = styled.img`
   transform: rotate(-45deg);
`;

const Form = styled.div`
   height: 100%;
   padding: 50px 60px;
`;

const RightColumn = styled.img`
   flex-basis: 60%;
   width: 60%;
   @media (max-width: 700px) {
      width: 0%;
      flex-basis: 0%;
      display: none;
   }
   object-fit: cover;
`;

const SignInPage: React.FC = () => {
   const userData = useSelector((state) => state.userData);
   const formData = useSelector((state) => state.formData);
   const dispatch = useAppDispatch();
   const history = useHistory();
   const login = () => {
      if (userData.email !== formData.loginEmail) {
         alert("The email doesn't match");
         return;
      }
      if (userData.password !== formData.loginPassword) {
         alert("Wrong password");
         return;
      }
      dispatch(userActions.login());
      localStorage.setItem("loggedIn", "true");
   };
   useEffect(() => {
      if (userData.loggedIn) {
         history.push("/booking-view");
      }
   }, [userData.loggedIn]);
   return (
      <SignInPageWrapper>
         <LeftColumn>
            <TopContainer>
               <KeyIconWrapper>
                  <KeyImage src={icons.key} alt="" />
               </KeyIconWrapper>
               <Text
                  size="large"
                  margin="2rem 0"
                  fontFamily="OpenSans-SemiBold"
               >
                  Hi there!
               </Text>

               <Text size="medium" color={colors.lightGray}>
                  Sign in to manage your listings and booking requests on Nomad
                  Rental
               </Text>
               <Link to="#">
                  <Text margin="2rem 0" color={colors.linkBlue}>
                     Learn more about our premium subscription
                  </Text>
               </Link>
            </TopContainer>
            <Form>
               <Input
                  name="loginEmail"
                  label="Email Address"
                  placeholder="Email"
               ></Input>
               <Input
                  name="loginPassword"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  link="Forgot your password?"
               ></Input>
               <Button onClick={() => login()}>Sign in</Button>
            </Form>
         </LeftColumn>
         <RightColumn src={backgroundImage}></RightColumn>
      </SignInPageWrapper>
   );
};

export default SignInPage;
