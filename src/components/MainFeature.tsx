
import styled from "styled-components";
import teamIllustrationSrc from "../assets/team_illustration_blue.png";
import { colors, breakpoints } from "../styles/tokens";
import { Container, SplitContent } from "./ui/Section";
import { Subheading, Heading } from "./ui/SectionHeading";
import { Button } from "./ui/Button";

const ImageColumn = styled.div`
  width: 100%;
  margin-bottom: 48px;
  
  @media (min-width: ${breakpoints.lg}) {
    width: 50%;
    margin-bottom: 0;
    margin-right: 48px;
  }
  
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
`;

const TextColumn = styled.div`
  width: 100%;
  text-align: center;
  
  @media (min-width: ${breakpoints.lg}) {
    width: 50%;
    text-align: left;
  }
`;

const Description = styled.p`
  margin-top: 24px;
  font-size: 1rem;
  line-height: 1.625;
  color: ${colors.bodyMuted};
  
  @media (min-width: ${breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

const PrimaryButton = styled(Button)`
  margin-top: 32px;
`;

const StatGrid = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: center;
  
  @media (min-width: ${breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const Stat = styled.div`
  margin-right: 32px;
  &:last-child { margin-right: 0; }
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.headingDark};
  }
  .key {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${colors.bodyMuted};
    margin-top: 4px;
  }
`;

export default function MainFeature() {
  return (
    <Container>
      <SplitContent>
        <ImageColumn>
          {/* Using imported image */}
          <img src={teamIllustrationSrc} alt="Team and Quality Work" />
        </ImageColumn>
        <TextColumn>
          <Subheading>QUALITY WORK</Subheading>
          <Heading $lineHeight="1.25">Designed & Developed by <span className="text-primary-500">Professionals.</span></Heading>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Description>
          <StatGrid>
            <Stat>
              <div className="value">2282+</div>
              <div className="key">Happy Customers</div>
            </Stat>
            <Stat>
              <div className="value">3550+</div>
              <div className="key">Code Splice</div>
            </Stat>
            <Stat>
              <div className="value">100+</div>
              <div className="key">Awards</div>
            </Stat>
          </StatGrid>
          <PrimaryButton
            $shadow="0 4px 6px -1px rgba(23, 161, 218, 0.1)"
            $hoverShadow="0 10px 15px -3px rgba(23, 161, 218, 0.2)"
          >
            Learn More
          </PrimaryButton>
        </TextColumn>
      </SplitContent>
    </Container>
  );
}
