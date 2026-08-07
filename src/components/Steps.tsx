
import styled from "styled-components";
import stepsIllustrationSrc from "../assets/steps_illustration_red.png";
import { colors, breakpoints } from "../styles/tokens";
import { Container, SplitContent } from "./ui/Section";
import { Subheading, Heading } from "./ui/SectionHeading";

const ImageColumn = styled.div`
  width: 100%;
  margin-bottom: 48px;
  
  @media (min-width: ${breakpoints.lg}) {
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
  
  @media (min-width: ${breakpoints.lg}) {
    width: 50%;
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
  color: ${colors.headingDark};
  margin-bottom: 8px;
`;

const StepText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${colors.bodyMuted};
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
      {/* $reverse: alternates the image to the right, since MainFeature (the section above) puts it on the left */}
      <SplitContent $reverse>
        <ImageColumn>
          {/* Imported Image */}
          <img src={stepsIllustrationSrc} alt="Steps to get started" />
        </ImageColumn>
        <TextColumn>
          <Subheading>STEPS</Subheading>
          <Heading $lineHeight="1.25" $marginBottom="32px">Easy to <span className="text-primary-500">Get Started.</span></Heading>
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
      </SplitContent>
    </Container>
  );
}
