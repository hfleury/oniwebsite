import { useState } from "react";
import styled from "styled-components";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import testimonialImageSrc from "../assets/testimonial_image_green.png";

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

const TestimonialBox = styled.div`
  margin-top: 24px;
`;

const Stars = styled.div`
  display: flex;
  color: #ECC94B; /* Yellow-400 */
  margin-bottom: 16px;
`;

const Quote = styled.h4`
  font-weight: 700;
  font-size: 1.125rem;
  color: #1A202C;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const QuoteText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #718096;
  margin-bottom: 24px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomerName = styled.span`
  font-weight: 700;
  font-size: 1.125rem;
  color: #1A202C;
`;

const CustomerTitle = styled.span`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
`;

const Controls = styled.div`
  display: flex;
  
  button {
    background-color: #EDF2F7;
    padding: 12px;
    border-radius: 9999px;
    margin-left: 12px;
    transition: all 0.3s;
    color: #4A5568;
    
    &:hover {
      background-color: #CBD5E0;
      color: #2D3748;
    }
  }
`;

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Dummy data
  const testimonials = [
    {
      stars: 5,
      quote: "Amazing User Experience",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      name: "Charlotte Hale",
      title: "Director, Delos Inc."
    },
    {
      stars: 5,
      quote: "Love the Developer Experience",
      text: "Sinor Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      name: "Adam Cuppy",
      title: "Founder, EventsNYC"
    }
  ];

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);
  const current = testimonials[index];

  return (
    <Container>
      <Content>
        <ImageColumn>
          {/* Imported Image */}
          <img src={testimonialImageSrc} alt="Happy Customer" />
        </ImageColumn>
        <TextColumn>
          <Subheading>TESTIMONIALS</Subheading>
          <Heading>Our Clients <span className="text-primary-500">Love Us.</span></Heading>
          <TestimonialBox>
            <Stars>
              {[...Array(current.stars)].map((_, i) => <Star key={i} size={20} fill="currentColor" stroke="none" />)}
            </Stars>
            <Quote>{current.quote}</Quote>
            <QuoteText>{current.text}</QuoteText>
            <Profile>
              <CustomerInfo>
                <CustomerName>{current.name}</CustomerName>
                <CustomerTitle>{current.title}</CustomerTitle>
              </CustomerInfo>
              <Controls>
                <button onClick={prev}><ArrowLeft size={20} strokeWidth={2} /></button>
                <button onClick={next}><ArrowRight size={20} strokeWidth={2} /></button>
              </Controls>
            </Profile>
          </TestimonialBox>
        </TextColumn>
      </Content>
    </Container>
  );
}
