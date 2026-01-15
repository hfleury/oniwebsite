
import styled from "styled-components";


const Container = styled.div`
  position: relative;
  padding: 80px 32px;
  background-color: #F7FAFC; /* Gray-100 */
  
  @media (min-width: 1024px) {
    padding: 100px 48px;
  }
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
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
  line-height: 1.25;
  margin-bottom: 24px;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  span {
    color: #17A1DA;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.625;
  color: #718096;
  max-width: 600px;
  margin: 0 auto 64px auto;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const PlanCard = styled.div<{ $featured?: boolean }>`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 32px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #E2E8F0;
  transition: transform 0.3s;

  ${props => props.$featured && `
    background: linear-gradient(135deg, rgb(23, 161, 218) 0%, rgb(15, 104, 145) 100%);
    color: white;
    border: none;
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  `}

  @media (min-width: 1024px) {
    ${props => !props.$featured && `
      margin-top: 24px;
      margin-bottom: 24px;
    `}
  }
`;

const PlanHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const PlanName = styled.span<{ $featured?: boolean }>`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${props => props.$featured ? 'white' : '#1A202C'};
  font-size: 1.25rem;
`;

const PlanPrice = styled.span<{ $featured?: boolean }>`
  font-weight: 700;
  font-size: 3rem;
  color: ${props => props.$featured ? 'white' : '#1A202C'};
  margin: 16px 0;
`;

const PlanDuration = styled.span<{ $featured?: boolean }>`
  font-weight: 600;
  color: ${props => props.$featured ? 'rgba(255,255,255,0.7)' : '#A0AEC0'};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const FeatureList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid #EDF2F7;
  border-color: rgba(0,0,0,0.1); 
  padding-top: 32px;
`;

const Feature = styled.div<{ $featured?: boolean }>`
  margin-bottom: 20px;
  font-weight: 500;
  color: ${props => props.$featured ? 'rgba(255,255,255,0.9)' : '#718096'};
  display: flex;
  align-items: center;
`;

const PlanAction = styled.button<{ $featured?: boolean }>`
  width: 100%;
  margin-top: 32px;
  padding: 16px;
  border-radius: 9999px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s;
  
  ${props => props.$featured ? `
    background-color: white;
    color: #063307;
    &:hover {
      background-color: #f7fafc;
    }
  ` : `
    background-color: linear-gradient(135deg, rgb(23, 161, 218) 0%, rgb(15, 104, 145) 100%);
    background: linear-gradient(135deg, rgb(23, 161, 218) 0%, rgb(15, 104, 145) 100%);
    color: white;
    &:hover {
      box-shadow: 0 10px 15px -3px rgba(23, 161, 218, 0.2);
    }
  `}
`;

export default function Pricing() {
  const plans = [
    {
      name: "Personal",
      price: "$17.99",
      features: ["Custom Domains", "24/7 Customer Support", "One-Click Deployment"],
      featured: false
    },
    {
      name: "Business",
      price: "$37.99",
      features: ["Custom Domains", "24/7 Customer Support", "One-Click Deployment", "5 Databases", "Server-Side Rendering"],
      featured: true
    },
    {
      name: "Enterprise",
      price: "$57.99",
      features: ["Custom Domains", "24/7 Customer Support", "One-Click Deployment", "Unlimited Databases", "Server-Side Rendering", "Dedicated Hardware"],
      featured: false
    }
  ];

  return (
    <Container>
      <Content>
        <Subheading>PRICING</Subheading>
        <Heading>Reasonable & Flexible <span className="text-primary-500">Plans.</span></Heading>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Description>
        <PlansContainer>
          {plans.map((plan, index) => (
            <PlanCard key={index} $featured={plan.featured}>
              <PlanHeader>
                <PlanName $featured={plan.featured}>{plan.name}</PlanName>
                <PlanPrice $featured={plan.featured}>{plan.price}</PlanPrice>
                <PlanDuration $featured={plan.featured}>Monthly</PlanDuration>
              </PlanHeader>
              <FeatureList>
                {plan.features.map((feature, i) => (
                  <Feature key={i} $featured={plan.featured}>
                    {/* Can add Icon here */}
                    <span className="mr-2">{plan.featured ? "✓" : "✓"}</span>
                    {feature}
                  </Feature>
                ))}
              </FeatureList>
              <PlanAction $featured={plan.featured}>
                Buy Now
              </PlanAction>
            </PlanCard>
          ))}
        </PlansContainer>
      </Content>
    </Container>
  );
}
