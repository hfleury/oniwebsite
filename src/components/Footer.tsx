
import styled from "styled-components";
import { Facebook, Twitter, Instagram } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";

const Container = styled.div`
  position: relative;
  padding: 80px 32px 32px 32px;
  background-color: #063307;
  color: #EDF2F7;
  
  @media (min-width: 1024px) {
    padding: 100px 48px 32px 48px;
  }
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const FiveColumns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 64px;
`;

const Column = styled.div`
  width: 100%;
  margin-bottom: 48px;
  
  @media (min-width: 640px) {
    width: calc(50% - 24px);
  }
  
  @media (min-width: 1024px) {
    width: calc(20% - 24px);
    margin-bottom: 0;
  }
`;

const WideColumn = styled(Column)`
  @media (min-width: 1024px) {
    width: 30%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const LogoText = styled.h5`
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  color: #F7FAFC;
`;

const Description = styled.p`
  margin-top: 16px;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #CBD5E0;
`;

const ColumnHeading = styled.h5`
  font-weight: 700;
  font-size: 1rem;
  color: #F7FAFC;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkListItem = styled.li`
  margin-top: 16px;
  &:first-child { margin-top: 0; }
`;

const Link = styled.a`
  font-size: 0.875rem;
  color: #CBD5E0;
  text-decoration: none;
  transition: all 0.3s;
  border-bottom: 2px solid transparent;
  padding-bottom: 2px;
  
  &:hover {
    color: #F7FAFC;
    border-color: #F7FAFC;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #742CCB; /* Primary-800 roughly or darker */
  margin: 32px 0;
`;

const ThreeColBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const LogoBottom = styled.div`
  display: flex;
  align-items: center;
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: #CBD5E0;
  margin-top: 24px;
  text-align: center;
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 24px;
  
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const SocialLink = styled.a`
  cursor: pointer;
  background-color: #F7FAFC;
  color: #1A202C;
  border-radius: 9999px;
  padding: 8px;
  margin-right: 16px;
  transition: all 0.3s;
  
  &:last-child { margin-right: 0; }
  
  &:hover {
    background-color: #EDF2F7;
    color: #17A1DA;
  }
`;

export default function Footer() {
  return (
    <Container>
      <Content>
        <FiveColumns>
          <WideColumn>
            <LogoContainer>
              <LogoText>Treact Inc.</LogoText>
            </LogoContainer>
            <Description>
              Treact is an Inc. 5000 company, providing specific yet flexible React templates for building your next startup website.
            </Description>
          </WideColumn>
          <Column>
            <ColumnHeading>Main</ColumnHeading>
            <LinkList>
              <LinkListItem><Link href="#">Blog</Link></LinkListItem>
              <LinkListItem><Link href="#">FAQs</Link></LinkListItem>
              <LinkListItem><Link href="#">Support</Link></LinkListItem>
              <LinkListItem><Link href="#">About Us</Link></LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Product</ColumnHeading>
            <LinkList>
              <LinkListItem><Link href="#">Log In</Link></LinkListItem>
              <LinkListItem><Link href="#">Personal</Link></LinkListItem>
              <LinkListItem><Link href="#">Business</Link></LinkListItem>
              <LinkListItem><Link href="#">Team</Link></LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Press</ColumnHeading>
            <LinkList>
              <LinkListItem><Link href="#">Logos</Link></LinkListItem>
              <LinkListItem><Link href="#">Events</Link></LinkListItem>
              <LinkListItem><Link href="#">Stories</Link></LinkListItem>
              <LinkListItem><Link href="#">Office</Link></LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Legal</ColumnHeading>
            <LinkList>
              <LinkListItem><Link href="#">GDPR</Link></LinkListItem>
              <LinkListItem><Link href="#">Privacy Policy</Link></LinkListItem>
              <LinkListItem><Link href="#">Terms of Service</Link></LinkListItem>
              <LinkListItem><Link href="#">Disclaimer</Link></LinkListItem>
            </LinkList>
          </Column>
        </FiveColumns>
        <Divider />
        <ThreeColBottom>
          <LogoBottom>
            <h5 className="font-bold text-xl tracking-wider text-gray-100">Treact</h5>
          </LogoBottom>
          <Copyright>
            &copy; 2026 Treact Inc. All Rights Reserved.
          </Copyright>
          <div className="flex items-center mt-4 md:mt-0">
            <LanguageDropdown className="mr-6 text-gray-900 bg-gray-100 rounded-full border-none" />
            <SocialLinks style={{ marginTop: 0 }}>
              <SocialLink href="https://facebook.com"><Facebook size={20} /></SocialLink>
              <SocialLink href="https://twitter.com"><Twitter size={20} /></SocialLink>
              <SocialLink href="https://instagram.com"><Instagram size={20} /></SocialLink>
            </SocialLinks>
          </div>
        </ThreeColBottom>
      </Content>
    </Container>
  );
}
