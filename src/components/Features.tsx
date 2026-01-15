
import styled from "styled-components";
import { Shield, Headphones, Sliders, Server, Zap, Smile } from "lucide-react";

const Container = styled.div`
  position: relative;
  padding: 64px 32px;
  background-color: #F7FAFC; /* Gray-100 ? No Treact often white or light gray. */
  border-radius: 12px;
  margin: 64px 32px;
  
  @media (min-width: 1024px) {
    padding: 80px 48px;
    margin: 80px 48px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
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
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  span {
    color: #17A1DA;
  }
`;

const Description = styled.p`
  margin-top: 16px;
  font-size: 1rem;
  color: #718096;
  max-width: 600px;
  line-height: 1.6;
`;

const TwoColumnGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 48px;
  gap: 32px;
  
  @media (min-width: 1024px) {
    justify-content: space-between;
  }
`;

const Column = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: calc(50% - 16px);
  }
  @media (min-width: 1280px) {
    width: calc(33.333% - 22px);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  background-color: transparent;
  width: 100%;
  
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const IconContainer = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  margin-bottom: 16px;
  background-color: rgba(6, 51, 7, 0.1); /* Light Brand Green */
  color: #063307; /* Brand Green */
  padding: 16px;
  border-radius: 9999px;
  
  @media (min-width: 640px) {
    margin-bottom: 0;
    margin-right: 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  font-weight: 700;
  font-size: 1.25rem;
  color: #1A202C;
  margin-bottom: 8px;
`;

const Text = styled.p`
  line-height: 1.6;
  color: #718096;
`;

export default function Features() {
  const cards = [
    {
      icon: <Shield size={24} strokeWidth={2.5} />,
      title: "Secure",
      description: "We strictly only deal with vendors that provide top notch security."
    },
    {
      icon: <Headphones size={24} strokeWidth={2.5} />,
      title: "24/7 Support",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    {
      icon: <Sliders size={24} strokeWidth={2.5} />,
      title: "Customizable",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    {
      icon: <Server size={24} strokeWidth={2.5} />,
      title: "Reliable",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    {
      icon: <Zap size={24} strokeWidth={2.5} />,
      title: "Fast",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    },
    {
      icon: <Smile size={24} strokeWidth={2.5} />,
      title: "Easy",
      description: "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."
    }
  ];

  return (
    <Container>
      <HeaderRow>
        <Subheading>FEATURES</Subheading>
        <Heading>We have Amazing <span className="text-primary-500">Service.</span></Heading>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Description>
      </HeaderRow>
      <TwoColumnGrid>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <IconContainer>{card.icon}</IconContainer>
              <Content>
                <Title>{card.title}</Title>
                <Text>{card.description}</Text>
              </Content>
            </Card>
          </Column>
        ))}
      </TwoColumnGrid>
    </Container>
  );
}
