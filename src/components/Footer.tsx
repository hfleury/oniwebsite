
import styled from "styled-components";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "../i18n";
import { colors, breakpoints } from "../styles/tokens";
import { Container as BaseContainer } from "./ui/Section";

const Container = styled(BaseContainer).attrs({
  $padding: '80px 32px 32px 32px',
  $paddingLg: '100px 48px 32px 48px',
  $background: colors.brandGreen,
  $color: '#EDF2F7',
})``;

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
  
  @media (min-width: ${breakpoints.sm}) {
    width: calc(50% - 24px);
  }
  
  @media (min-width: ${breakpoints.lg}) {
    width: calc(20% - 24px);
    margin-bottom: 0;
  }
`;

const WideColumn = styled(Column)`
  @media (min-width: ${breakpoints.lg}) {
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
  
  @media (min-width: ${breakpoints.md}) {
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
  
  @media (min-width: ${breakpoints.md}) {
    margin-top: 0;
  }
`;

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <Container>
      <Content>
        <FiveColumns>
          <WideColumn>
            <LogoContainer>
              <LogoText>Oni Web Officer</LogoText>
            </LogoContainer>
            <Description>{t("footer_description")}</Description>
          </WideColumn>
          <Column>
            <ColumnHeading>{t("footer_legal_heading")}</ColumnHeading>
            <LinkList>
              <LinkListItem><Link href="/privacy#gdpr">{t("footer_legal_gdpr")}</Link></LinkListItem>
              <LinkListItem><Link href="/privacy">{t("footer_legal_privacy_policy")}</Link></LinkListItem>
            </LinkList>
          </Column>
        </FiveColumns>
        <Divider />
        <ThreeColBottom>
          <LogoBottom>
            <h5 className="font-bold text-xl tracking-wider text-gray-100">Oni Web Officer</h5>
          </LogoBottom>
          <Copyright>
            &copy; {year} Oni Web Officer. {t("footer_copyright")}
          </Copyright>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 mt-4 md:mt-0">
            <LanguageDropdown direction="up" className="text-gray-900 bg-gray-100 rounded-full border-none" />
          </div>
        </ThreeColBottom>
      </Content>
    </Container>
  );
}
