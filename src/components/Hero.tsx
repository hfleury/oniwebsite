
import styled from "styled-components";
import heroIllustrationSrc from "../assets/hero_illustration_dalmatian.png";


const Container = styled.div`
  position: relative;
  background-color: transparent;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column-reverse; /* Mobile first: text below image? No, usually image below text or hidden. Treact: Two columns. */
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;

const LeftColumn = styled.div`
  text-align: center;
  margin-top: 48px;
  
  @media (min-width: 1024px) {
    width: 50%;
    text-align: left;
    margin-top: 0;
  }
`;

const RightColumn = styled.div`
  width: 100%;
  position: relative;
  
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Heading = styled.h1`
  font-weight: 900;
  font-size: 2.5rem; /* 4xl */
  line-height: 1.25;
  color: #1A202C; /* Gray-900 */
  
  @media (min-width: 768px) {
    font-size: 3rem; /* 5xl */
  }
  
  @media (min-width: 1280px) {
    font-size: 3.75rem; /* 6xl */
  }

  span {
    color: #17A1DA; /* Primary-500 */
  }
`;

const Paragraph = styled.p`
  margin-top: 24px;
  font-size: 1rem;
  line-height: 1.625;
  color: #718096; /* Gray-600 */
  
  @media (min-width: 768px) {
    font-size: 1.125rem; /* lg */
  }
  
  @media (min-width: 1024px) {
    max-width: 500px;
  }
`;

const Actions = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
  
  @media (min-width: 1024px) {
    justify-content: flex-start;
  }

  input {
    border: 2px solid #E2E8F0;
    border-radius: 9999px;
    padding: 12px 24px;
    font-weight: 600;
    color: #4A5568;
    transition: all 0.3s;
    width: 100%;
    max-width: 300px;

    &:focus {
      outline: none;
      border-color: #17A1DA;
    }
    
    &:hover {
      border-color: #A0AEC0;
    }
  }

  button {
    margin-top: 16px;
    width: 100%;
    max-width: 300px;
    background-color: #17A1DA;
    color: white;
    font-weight: 700;
    padding: 12px 32px;
    border-radius: 9999px;
    transition: all 0.3s;
    box-shadow: 0 4px 6px -1px rgba(23, 161, 218, 0.1), 0 2px 4px -1px rgba(23, 161, 218, 0.06);

    &:hover {
      background-color: #0e81b3;
      transform: translateY(-1px);
      box-shadow: 0 10px 15px -3px rgba(23, 161, 218, 0.2), 0 4px 6px -2px rgba(23, 161, 218, 0.1);
    }

    @media (min-width: 640px) {
      margin-top: 0;
      margin-left: 16px;
      width: auto;
    }
  }
`;

const CustomersLogoStrip = styled.div`
  margin-top: 48px;
  
  p {
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #A0AEC0;
    text-align: center;
    
    @media (min-width: 1024px) {
      text-align: left;
    }
  }
  
  .logos {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0.5;
    
    @media (min-width: 1024px) {
      justify-content: flex-start;
    }

    img, svg {
      margin-right: 16px;
      height: 32px;
      &:last-child { margin-right: 0; }
    }
  }
`;

const IllustrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Hero() {
  return (
    <Container>
      <Content>
        <LeftColumn>
          <Heading>
            Beautiful React Templates <span className="text-primary-500">for you.</span>
          </Heading>
          <Paragraph>
            Our templates are easy to setup, understand and customize. Fully modular components with a variety of pages and components.
          </Paragraph>
          <Actions>
            <input type="email" placeholder="Your E-mail Address" />
            <button>Get Started</button>
          </Actions>
          <CustomersLogoStrip>
            <p>Our Trusted Customers</p>
            <div className="logos">
              {/* Placeholder for logos - implementing simple text/gray boxes for now or SVGs if time permits */}
              {/* Using text specific style for logos to simulate the look */}
              <span className="font-bold text-gray-500 text-lg mr-4">FORTUNE</span>
              <span className="font-bold text-gray-500 text-lg mr-4">TIME</span>
              <span className="font-bold text-gray-500 text-lg">Forbes</span>
            </div>
          </CustomersLogoStrip>
        </LeftColumn>
        <RightColumn>
          <IllustrationContainer>
            {/* Using the embedded generated artifact image */}
            <img
              src={heroIllustrationSrc}
              alt="Hero Illustration"
              className="w-full max-w-full h-auto"
            />
          </IllustrationContainer>
        </RightColumn>
      </Content>
    </Container>
  );
}
