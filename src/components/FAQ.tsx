import { useState } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  position: relative;
  padding: 64px 32px;
  background-color: transparent; /* Treact often uses curve background or plain */
  
  @media (min-width: 1024px) {
    padding: 80px 48px;
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subheading = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #17A1DA;
  font-size: 0.875rem;
  margin-bottom: 16px;
  text-align: center;
`;

const Heading = styled.h2`
  font-weight: 900;
  font-size: 2rem;
  color: #1A202C;
  line-height: 1.25;
  margin-bottom: 48px;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  
  span {
    color: #17A1DA;
  }
`;

const FAQList = styled.div`
  width: 100%;
`;

const Question = styled.div`
  cursor: pointer;
  padding: 24px;
  background-color: #EDF2F7;
  border-radius: 8px;
  margin-bottom: 24px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #E2E8F0;
  }
`;

const QuestionTrigger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionText = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
  color: #2D3748;
`;

const Answer = styled(motion.div)`
  color: #718096;
  margin-top: 16px;
  line-height: 1.6;
  font-size: 1rem;
`;

const QAItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Question onClick={() => setIsOpen(!isOpen)}>
      <QuestionTrigger>
        <QuestionText>{q}</QuestionText>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </QuestionTrigger>
      <AnimatePresence>
        {isOpen && (
          <Answer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pt-4 pb-2">
              {a}
            </div>
          </Answer>
        )}
      </AnimatePresence>
    </Question>
  );
};

export default function FAQ() {
  const faqs = [
    {
      q: "Is this template completely free to use?",
      a: "Yes, this template is completely free to use directly or even as a base for your commercial projects."
    },
    {
      q: "Can I use it for commercial projects?",
      a: "Yes, you can use it for personal, commercial, non-commercial, and open source projects."
    },
    {
      q: "What is the best way to contact you?",
      a: "Website chat or email is the best way to contact us."
    },
    {
      q: "Do you offer custom web development services?",
      a: "Yes, we do offer custom design and development services. Please contact us for a quote."
    }
  ];

  return (
    <Container>
      <Content>
        <Subheading>FAQS</Subheading>
        <Heading>You have <span className="text-primary-500">Questions?</span></Heading>
        <FAQList>
          {faqs.map((faq, i) => (
            <QAItem key={i} q={faq.q} a={faq.a} />
          ))}
        </FAQList>
      </Content>
    </Container>
  );
}
