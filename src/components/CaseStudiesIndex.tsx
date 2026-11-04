import styled from "styled-components";
import { useTranslation } from "../i18n";
import { colors } from "../styles/tokens";
import { Container as BaseContainer } from "./ui/Section";
import { Subheading, Heading } from "./ui/SectionHeading";
import { BackLink } from "./ui/BackLink";
import { caseStudies } from "../data/caseStudies";
import CaseStudyList from "./CaseStudyList";

const Container = styled(BaseContainer).attrs({})``;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Text = styled.p`
  line-height: 1.6;
  color: ${colors.bodyMuted};
  margin-top: 16px;
  max-width: 720px;
`;

export default function CaseStudiesIndex() {
  const { t } = useTranslation();

  return (
    <Container>
      <Content>
        <Subheading>{t("case_studies_subheading")}</Subheading>
        <Heading>{t("case_studies_heading")}</Heading>
        <Text>{t("case_studies_intro")}</Text>
        {caseStudies.length === 0 ? (
          <Text>{t("case_studies_empty")}</Text>
        ) : (
          <CaseStudyList caseStudies={caseStudies} />
        )}
        <BackLink to="/">{t("services_back_to_home")}</BackLink>
      </Content>
    </Container>
  );
}
