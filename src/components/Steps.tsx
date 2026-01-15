
import styled from "styled-components";
import stepsIllustrationSrc from "../assets/steps_illustration_red.png";

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
    flex-direction: row-reverse; /* Image on right? Actually screenshot shows "Easy to Get Started" usually has image on Right? Let's check logic. MainFeature was Image Left. This should alternate. So Image Right. */
    justify-content: space-between;
  }
`;

const ImageColumn = styled.div`
  width: 100%;
  margin-bottom: 48px;
  
  @media (min-width: 1024px) {
    width: 50%;
    margin-bottom: 0;
    margin-left: 48px;
  }
  
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
  }
`;

const TextColumn = styled.div`
  width: 100%;
  text-align: left;
  
  @media (min-width: 1024px) {
    width: 50%;
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
  margin-bottom: 32px;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  span {
    color: #17A1DA;
  }
`;

const StepList = styled.div`
  margin-top: 32px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 32px;
  &:last-child { margin-bottom: 0; }
`;

const StepNumber = styled.div`
  font-weight: 900;
  font-size: 1.5rem;
  color: #CBD5E0;
  line-height: 1;
  margin-right: 24px;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.h5`
  font-weight: 700;
  font-size: 1.25rem;
  color: #1A202C;
  margin-bottom: 8px;
`;

const StepText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: #718096;
`;

export default function Steps() {
  const steps = [
    {
      title: "Register",
      description: "Create an account with us using Google or Facebook."
    },
    {
      title: "Download",
      description: "Browse and Download the template that you like from the marketplace."
    },
    {
      title: "Run",
      description: "Follow the instructions to setup and customize the template to your needs."
    }
  ];

  return (
    <Container>
      <Content>
        <ImageColumn>
          {/* Imported Image */}
          <img src={stepsIllustrationSrc} alt="Steps to get started" />
        </ImageColumn>
        <TextColumn>
          <Subheading>STEPS</Subheading>
          <Heading>Easy to <span className="text-primary-500">Get Started.</span></Heading>
          <StepList>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepNumber>{(index + 1).toString().padStart(2, '0')}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepText>{step.description}</StepText>
                </StepContent>
              </Step>
            ))}
          </StepList>
        </TextColumn>
      </Content>
    </Container>
  );
}
