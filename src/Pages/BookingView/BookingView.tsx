import styled, { css } from "styled-components";
import Sidebar from "../../Components/Sidebar";
import SidebarItem from "../../Components/SidebarItem";
import Text from "../../StyledComponents/Text";
import colors from "../../StylingData/colors";
import icons from "../../StylingData/icons";
import bookingViewImage from "./booking-view-image.jpg";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "../../index";
import { useEffect } from "react";
export const ViewWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  background: ${colors.offWhite};
`;

export const RightContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  /* min-height: 100%; */
  padding-top: 3rem;
  padding-right: 3rem;
  padding-left: 3rem;
  width: 100%;
`;

const MainCard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 3rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;
const MainCardImage = styled.img`
  width: 35%;
  flex-basis: 35%;
  object-fit: cover;
  @media (max-width: 800px) {
    display: none;
  }
`;

const MainCardRightSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem;
  background: white;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const TextWithLabel = styled.div<{ horizontal?: boolean }>`
  display: flex;
  img {
    margin-right: 0.75rem;
  }
  margin-right: 2rem;
  margin-bottom: 0.5rem;
  ${(p) =>
    p.horizontal
      ? css`
          align-items: flex-start;
          img {
            transform: translate(0px, 4px);
          }
        `
      : ""}
`;

const SecondRowWrapper = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
    & > div {
      margin-bottom: 2rem;
    }
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterListItem = styled(TextWithLabel)`
  padding: 1rem 2rem;
  background: ${colors.offWhite};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
`;

const BookingView: React.FC = () => {
  const state = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    if (!state.userData.loggedIn) {
      history.push("/");
    }
  }, [state.userData.loggedIn]);
  return (
    <ViewWrapper>
      <Sidebar></Sidebar>
      <RightContentWrapper>
        <Text margin="0 0 3rem 0" size="xl">
          Bookings
        </Text>
        <Text size="large">Your current upcoming stays</Text>
        <Text margin="1rem 0rem" style={{ lineHeight: 2 }}>
          Please update with the properity if your travel plans should change or
          if you wish to make any changes to your sta
        </Text>
        <Link to="/booking-view">
          <Text color={colors.linkBlue}>
            Learn more about our premium subscription
          </Text>
        </Link>
        <MainCard>
          <MainCardImage src={bookingViewImage}></MainCardImage>
          <MainCardRightSection>
            <RowWrapper>
              <Text margin="0 0 1rem 0" size="large">
                The Green View
              </Text>
              <TextWithLabel>
                <img src={icons.checkCircle}></img>
                <Text color={colors.mediumGray}>Booking request recieved</Text>
              </TextWithLabel>
              <TextWithLabel>
                <img src={icons.clock}></img>
                <Text color={colors.darkPrimary}>
                  Awaiting confirmation from Hotel
                </Text>
              </TextWithLabel>
            </RowWrapper>

            <RowWrapper>
              <Text margin="0 0 1rem 0" size="large">
                Superior Premium
              </Text>
              <SecondRowWrapper>
                <TextWithLabel horizontal>
                  <img src={icons.calender} alt="" />
                  <div>
                    <Text margin="0 0 0.25rem 0">Check-in:</Text>
                    <Text color={colors.lightBlack}>July 9th, 2018</Text>
                  </div>
                </TextWithLabel>
                <TextWithLabel horizontal>
                  <img src={icons.receipt} alt="" />
                  <div>
                    <Text margin="0 0 0.25rem 0">Check-in:</Text>
                    <Text color={colors.lightBlack}>#UC311K</Text>
                  </div>
                </TextWithLabel>
              </SecondRowWrapper>
            </RowWrapper>
            <FooterWrapper>
              <FooterListItem>
                <img src={icons.star}></img>
                <Text color={colors.green}>Rate your stay</Text>
              </FooterListItem>
              <FooterListItem>
                <img src={icons.paperPlane}></img>
                <Text color={colors.gray}>Email the property</Text>
              </FooterListItem>
            </FooterWrapper>
          </MainCardRightSection>
        </MainCard>
      </RightContentWrapper>
    </ViewWrapper>
  );
};

export default BookingView;
