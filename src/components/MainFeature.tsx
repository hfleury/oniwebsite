
import styled from "styled-components";
import teamIllustrationSrc from "../assets/team_illustration_blue.png";

const Container = styled.div`
  position: relative;
  padding: 80px 32px;
  
  @media (min-width: 1024px) {
    padding: 100px 48px;
  }
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ImageColumn = styled.div`
  width: 100%;
  margin-bottom: 48px;
  
  @media (min-width: 1024px) {
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
  
  @media (min-width: 1024px) {
    width: 50%;
    text-align: left;
  }
`;

const Subheading = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #17A1DA;
  font-size: 0.875rem;
  margin-bottom: 16px;
`;

const Heading = styled.h2`
  font-weight: 900;
  font-size: 2rem;
  color: #1A202C;
  line-height: 1.25;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  span {
    color: #17A1DA;
  }
`;

const Description = styled.p`
  margin-top: 24px;
  font-size: 1rem;
  line-height: 1.625;
  color: #718096;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const PrimaryButton = styled.button`
  margin-top: 32px;
  background-color: #17A1DA;
  color: white;
  font-weight: 700;
  padding: 12px 32px;
  border-radius: 9999px;
  transition: all 0.3s;
  box-shadow: 0 4px 6px -1px rgba(23, 161, 218, 0.1);

  &:hover {
    background-color: #0e81b3;
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(23, 161, 218, 0.2);
  }
`;

const StatGrid = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: center;
  
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const Stat = styled.div`
  margin-right: 32px;
  &:last-child { margin-right: 0; }
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1A202C;
  }
  .key {
    font-size: 0.875rem;
    font-weight: 600;
    color: #718096;
    margin-top: 4px;
  }
`;

export default function MainFeature() {
  return (
    <Container>
      <Content>
        <ImageColumn>
          {/* Using imported image */}
          <img src={teamIllustrationSrc} alt="Team and Quality Work" />
        </ImageColumn>
        <TextColumn>
          <Subheading>QUALITY WORK</Subheading>
          <Heading>Designed & Developed by <span className="text-primary-500">Professionals.</span></Heading>
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
          <PrimaryButton>Learn More</PrimaryButton>
        </TextColumn>
      </Content>
    </Container>
  );
}
