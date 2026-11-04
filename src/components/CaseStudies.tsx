import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n";
import { colors } from "../styles/tokens";
import { Container as BaseContainer } from "./ui/Section";
import { Subheading, Heading } from "./ui/SectionHeading";
import { caseStudies } from "../data/caseStudies";
import CaseStudyList from "./CaseStudyList";

const Container = styled(BaseContainer).attrs({})``;

const HeaderRow = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

const Footer = styled.div`
  margin-top: 32px;
  text-align: center;
`;

const ViewAllLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Home-page teaser. Hidden entirely until the first case study is published.
export default function CaseStudies() {
  const { t } = useTranslation();

  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <Container>
      <HeaderRow>
        <Subheading>{t("case_studies_subheading")}</Subheading>
        <Heading>{t("case_studies_heading")}</Heading>
      </HeaderRow>
      <CaseStudyList caseStudies={caseStudies} />
      <Footer>
        <ViewAllLink to="/case-studies">{t("case_studies_view_all")}</ViewAllLink>
      </Footer>
    </Container>
  );
}
